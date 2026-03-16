import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiShoppingBag, FiX } from 'react-icons/fi';
import { useInquiry } from '../../contexts/InquiryContext';
import BulkInquiryCart from '../products/BulkInquiryCart';

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #a47148, #d4a574);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px rgba(164, 113, 72, 0.4);
  transition: all 0.3s ease;
  z-index: 2500;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 35px rgba(164, 113, 72, 0.5);
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ItemCount = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ff4757;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $animate }) => ($animate ? 'notificationPulse 0.6s ease' : 'pulse 2s infinite')};
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes notificationPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); background: #10b981; }
    100% { transform: scale(1); }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: var(--banner-height, 0px);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2400;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  transition: top 0.3s ease;
`;

const FloatingInquiryCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { items, getTotalQuantity } = useInquiry();
  const cartRef = useRef(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  const productCount = items.length;
  const totalSets = Math.ceil(getTotalQuantity() / 10);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ignore clicks on the banner
      if (event.target.closest('[data-seasonal-banner]')) {
        return;
      }
      
      if (isOpen && cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Listen for item added event
  useEffect(() => {
    const handleItemAdded = () => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    };

    window.addEventListener('inquiryItemAdded', handleItemAdded);
    return () => window.removeEventListener('inquiryItemAdded', handleItemAdded);
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    const handleInquiryUpdate = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('inquiryUpdate', handleInquiryUpdate);
    return () => window.removeEventListener('inquiryUpdate', handleInquiryUpdate);
  }, []);

  // Hide navbar on desktop when cart is open
  useEffect(() => {
    const navbar = document.querySelector('[data-navbar]');
    if (navbar) {
      if (isOpen && window.innerWidth >= 1025) {
        navbar.style.display = 'none';
      } else {
        navbar.style.display = 'block';
      }
    }
  }, [isOpen]);

  if (items.length === 0) return null;

  return (
    <>
      <Overlay $show={isOpen} onClick={() => setIsOpen(false)} />
      
      <FloatingButton onClick={() => setIsOpen(prev => !prev)}>
        <FiShoppingBag />
        <ItemCount $animate={animate}>{productCount}</ItemCount>
      </FloatingButton>
      
      <div ref={cartRef}>
        <BulkInquiryCart 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      </div>
    </>
  );
};

export default FloatingInquiryCart;