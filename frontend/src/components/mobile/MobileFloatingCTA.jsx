import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPhone, FiMessageCircle, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { respond } from '../../styles/mixins';

const MobileFloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Listen for filter events to hide CTA
  useEffect(() => {
    const handleFilterToggle = (event) => {
      setIsFilterOpen(event.detail?.isOpen || false);
    };

    window.addEventListener('filterToggle', handleFilterToggle);
    return () => window.removeEventListener('filterToggle', handleFilterToggle);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919265282488';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I am interested in your saree collection. Please share more details.');
    window.open(`https://wa.me/919265282488?text=${message}`, '_blank');
  };

  // Hide when filters are open
  if (isFilterOpen) return null;

  return (
    <Container>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <FiChevronDown /> : <FiChevronUp />}
      </ToggleButton>
      
      <CTAButtons $expanded={isExpanded}>
        <CTAButton onClick={handleCall} $type="call">
          <FiPhone />
          <span>Call Now</span>
        </CTAButton>
        
        <CTAButton onClick={handleWhatsApp} $type="whatsapp">
          <FiMessageCircle />
          <span>WhatsApp</span>
        </CTAButton>
      </CTAButtons>
    </Container>
  );
};

export default MobileFloatingCTA;

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1500;
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const ToggleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a47148, #d4af37);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(164, 113, 72, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(164, 113, 72, 0.4);
  }
`;

const CTAButtons = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transform: ${({ $expanded }) => ($expanded ? 'translateY(0)' : 'translateY(10px)')};
  transition: all 0.3s ease;
  pointer-events: ${({ $expanded }) => ($expanded ? 'auto' : 'none')};
`;

const CTAButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  background: ${({ $type }) => 
    $type === 'call' ? '#007bff' : '#25d366'};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ $type }) => 
      $type === 'call' ? 'rgba(0, 123, 255, 0.3)' : 'rgba(37, 211, 102, 0.3)'};
  }
  
  svg {
    font-size: 1.1rem;
  }
`;