import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import ProductCard from "../products/ProductCard";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Get recently viewed products from localStorage
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentProducts(recent.slice(0, 4)); // Show only last 4 products
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <Section>
      <Header>
        <FiClock />
        <h3>Recently Viewed</h3>
      </Header>
      
      <ProductGrid>
        {recentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </Section>
  );
};

// Hook to manage recently viewed products
export const useRecentlyViewed = () => {
  const addToRecentlyViewed = (product) => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    // Remove if already exists
    const filtered = recent.filter(item => item.id !== product.id);
    
    // Add to beginning
    const updated = [product, ...filtered].slice(0, 10); // Keep only 10 recent items
    
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const getRecentlyViewed = () => {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  };

  const clearRecentlyViewed = () => {
    localStorage.removeItem('recentlyViewed');
  };

  return {
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed
  };
};

export default RecentlyViewed;

const Section = styled.section`
  padding: 2rem 0;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: #666;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;