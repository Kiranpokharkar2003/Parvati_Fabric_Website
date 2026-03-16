import React, { useState, useEffect } from 'react';
import { FaWifi, FaWifiSlash, FaHistory } from 'react-icons/fa';
import './OfflineMode.css';

const OfflineMode = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineProducts, setOfflineProducts] = useState([]);
  const [showOfflineData, setShowOfflineData] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data from localStorage
    const savedProducts = localStorage.getItem('offlineProducts');
    if (savedProducts) {
      setOfflineProducts(JSON.parse(savedProducts));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveProductForOffline = (product) => {
    const existing = offlineProducts.find(p => p.id === product.id);
    if (!existing) {
      const updatedProducts = [...offlineProducts, { ...product, viewedAt: Date.now() }];
      setOfflineProducts(updatedProducts);
      localStorage.setItem('offlineProducts', JSON.stringify(updatedProducts));
    }
  };

  const clearOfflineData = () => {
    setOfflineProducts([]);
    localStorage.removeItem('offlineProducts');
  };

  const toggleOfflineView = () => {
    setShowOfflineData(!showOfflineData);
  };

  if (!isOnline) {
    return (
      <div className="offline-container">
        <div className="offline-header">
          <div className="offline-status">
            <FaWifiSlash className="offline-icon" />
            <div>
              <h3>You're offline</h3>
              <p>Browse your recently viewed products</p>
            </div>
          </div>
          
          {offlineProducts.length > 0 && (
            <button className="clear-offline-btn" onClick={clearOfflineData}>
              Clear History
            </button>
          )}
        </div>

        <div className="offline-content">
          {offlineProducts.length > 0 ? (
            <div className="offline-products">
              <h4>Recently Viewed Products ({offlineProducts.length})</h4>
              <div className="offline-grid">
                {offlineProducts.map((product) => (
                  <div key={product.id} className="offline-product-card">
                    <img 
                      src={product.images?.[0] || '/images/placeholder.jpg'} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="product-info">
                      <h5>{product.name}</h5>
                      <p className="category">{product.category}</p>
                      <p className="viewed-time">
                        Viewed {new Date(product.viewedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-offline-data">
              <FaHistory className="history-icon" />
              <h4>No offline data available</h4>
              <p>Products you view while online will be saved for offline browsing</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="online-container">
      <div className="connection-status online">
        <FaWifi className="online-icon" />
        <span>Online</span>
        
        {offlineProducts.length > 0 && (
          <button 
            className="offline-toggle-btn"
            onClick={toggleOfflineView}
            title="View offline products"
          >
            <FaHistory />
            <span>{offlineProducts.length}</span>
          </button>
        )}
      </div>

      {showOfflineData && (
        <div className="offline-overlay">
          <div className="offline-modal">
            <div className="modal-header">
              <h3>Recently Viewed Products</h3>
              <button onClick={toggleOfflineView}>×</button>
            </div>
            <div className="offline-products-list">
              {offlineProducts.map((product) => (
                <div key={product.id} className="offline-product-item">
                  <img src={product.images?.[0]} alt={product.name} />
                  <div>
                    <h5>{product.name}</h5>
                    <p>{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {React.cloneElement(children, { saveProductForOffline })}
    </div>
  );
};

export default OfflineMode;