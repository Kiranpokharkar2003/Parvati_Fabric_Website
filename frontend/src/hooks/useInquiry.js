import { useEffect, useState } from "react";

const STORAGE_KEY = "inquiry_items";
const EXPIRY_KEY = "inquiry_expiry";
const EXPIRY_HOURS = 36;
const INQUIRY_UPDATE_EVENT = 'inquiryUpdate';

const triggerInquiryUpdate = () => {
  window.dispatchEvent(new CustomEvent(INQUIRY_UPDATE_EVENT));
};

const getStoredItems = () => {
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
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const useInquiry = () => {
  const [items, setItems] = useState(() => getStoredItems());

  useEffect(() => {
    if (items.length > 0) {
      const expiryTime = Date.now() + (EXPIRY_HOURS * 60 * 60 * 1000);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    }
    triggerInquiryUpdate();
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, qty: 10 }];
    });
    window.dispatchEvent(new CustomEvent('inquiryItemAdded'));
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

  return {
    items,
    addItem,
    removeItem,
    updateQty,
    clearAll,
    isInInquiry,
    getTotalQuantity,
  };
};

export default useInquiry;
