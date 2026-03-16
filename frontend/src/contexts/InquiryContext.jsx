import React, { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext();

const STORAGE_KEY = "inquiry_items";
const EXPIRY_KEY = "inquiry_expiry";
const EXPIRY_HOURS = 36;

export const InquiryProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const expiry = localStorage.getItem(EXPIRY_KEY);
      
      if (stored && expiry) {
        const expiryTime = parseInt(expiry, 10);
        const now = Date.now();
        
        if (now < expiryTime) {
          return JSON.parse(stored);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(EXPIRY_KEY);
          return [];
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (items.length > 0) {
      const expiryTime = Date.now() + (EXPIRY_HOURS * 60 * 60 * 1000);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    }
    window.dispatchEvent(new CustomEvent('inquiryUpdate'));
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      const newItems = [...prev, { ...product, qty: 10 }];
      window.dispatchEvent(new CustomEvent('inquiryItemAdded'));
      return newItems;
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    const setQty = Math.max(10, Math.ceil(qty / 10) * 10);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: setQty } : item
      )
    );
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  };

  const isInInquiry = (id) => {
    return items.some((item) => item.id === id);
  };

  const getTotalQuantity = () => {
    return items.reduce((sum, item) => sum + (item.qty || 10), 0);
  };

  return (
    <InquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearAll,
        isInInquiry,
        getTotalQuantity,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within InquiryProvider');
  }
  return context;
};
