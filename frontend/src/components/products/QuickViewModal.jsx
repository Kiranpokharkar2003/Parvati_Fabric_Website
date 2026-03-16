import React, { useState } from 'react';
import styled from 'styled-components';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { SlideUpContainer, HoverButton } from '../common/MicroAnimations';
import useInquiry from '../../hooks/useInquiry';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(SlideUpContainer)`
  background: white;
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const InfoSection = styled.div`
  h2 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .category {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  
  div {
    font-size: 0.9rem;
    
    strong {
      display: block;
      color: #333;
      margin-bottom: 0.2rem;
    }
    
    span {
      color: #666;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.5rem;
`;

const ActionBtn = styled(HoverButton)`
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 25px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &.primary {
    background: #a47148;
    color: white;
  }
  
  &.secondary {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
  
  &.wishlist {
    background: ${({ $inWishlist }) => ($inWishlist ? '#ff4757' : '#f0f0f0')};
    color: ${({ $inWishlist }) => ($inWishlist ? 'white' : '#333')};
  }
`;

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addItem, removeItem, isInInquiry } = useInquiry();
  
  if (!isOpen || !product) return null;

  const isAdded = isInInquiry(product.id);

  const handleInquiryToggle = () => {
    if (isAdded) {
      removeItem(product.id);
    } else {
      addItem(product);
      window.dispatchEvent(new CustomEvent('inquiryItemAdded'));
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <FiX />
        </CloseBtn>
        
        <ProductLayout>
          <ImageSection>
            <img src={product.images?.[0] || product.image} alt={product.name} />
          </ImageSection>
          
          <InfoSection>
            <h2>{product.name}</h2>
            <div className="category">{product.category}</div>
            <div className="description">{product.description}</div>
            
            <MetaInfo>
              <div>
                <strong>Length</strong>
                <span>{product.length || '5.5m'}</span>
              </div>
              <div>
                <strong>Fabric</strong>
                <span>{product.fabricWeight || '350 GSM'}</span>
              </div>
              <div>
                <strong>Care</strong>
                <span>{product.careInstructions || 'Dry Clean'}</span>
              </div>
              <div>
                <strong>Stock</strong>
                <span>{product.stockStatus}</span>
              </div>
            </MetaInfo>
            
            <ActionButtons>
              <ActionBtn 
                className="primary" 
                onClick={handleInquiryToggle}
              >
                <FiShoppingBag />
                {isAdded ? 'Remove from Inquiry' : 'Add to Inquiry'}
              </ActionBtn>
            </ActionButtons>
          </InfoSection>
        </ProductLayout>
      </ModalContent>
    </ModalOverlay>
  );
};

export default QuickViewModal;