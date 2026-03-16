import { useEffect, useState } from "react";

const STORAGE_KEY = "wishlist_items";
const EXPIRY_KEY = "wishlist_expiry";
const EXPIRY_DAYS = 7;

// Custom event for real-time updates
const WISHLIST_UPDATE_EVENT = 'wishlistUpdate';

const triggerWishlistUpdate = () => {
  window.dispatchEvent(new CustomEvent(WISHLIST_UPDATE_EVENT));
};

const getStoredItems = () => {
  try {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    const now = new Date().getTime();
    
    // Check if wishlist has expired
    if (expiry && now > parseInt(expiry)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
      return [];
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setExpiryDate = () => {
  const now = new Date().getTime();
  const expiry = now + (EXPIRY_DAYS * 24 * 60 * 60 * 1000); // 7 days
  localStorage.setItem(EXPIRY_KEY, expiry.toString());
};

const useWishlist = () => {
  const [items, setItems] = useState(getStoredItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    if (items.length > 0) {
      setExpiryDate();
    }
    triggerWishlistUpdate();
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem(EXPIRY_KEY);
  };

  const isInWishlist = (id) => {
    return items.some((item) => item.id === id);
  };

  const getShareableLink = () => {
    const itemIds = items.map(item => item.id).join(',');
    return `${window.location.origin}/wishlist/shared?items=${itemIds}`;
  };

  const getDaysRemaining = () => {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) return 0;
    
    const now = new Date().getTime();
    const expiryTime = parseInt(expiry);
    const daysLeft = Math.ceil((expiryTime - now) / (24 * 60 * 60 * 1000));
    
    return Math.max(0, daysLeft);
  };

  return {
    items,
    addItem,
    removeItem,
    clearAll,
    isInWishlist,
    getShareableLink,
    getDaysRemaining,
    count: items.length
  };
};

export default useWishlist;