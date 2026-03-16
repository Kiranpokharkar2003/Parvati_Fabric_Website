import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { useInquiry } from "../../contexts/InquiryContext";
import { AnimatedCard, HoverButton } from "../common/MicroAnimations";

const Card = styled(AnimatedCard)`
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: 0.25s ease;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }

  h4 {
    padding: 0.8rem 0.8rem 0.4rem;
    font-size: 0.95rem;
    font-weight: 500;
    margin: 0;
  }
`;

const ProductInfo = styled.div`
  padding: 0 0.8rem;
  flex: 1;
`;

const StockBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  background: ${props => {
    switch(props.status) {
      case 'In Stock': return '#22c55e';
      case 'Limited': return '#f59e0b';
      case 'Made to Order': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
`;

const SareeDetails = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
  
  span {
    display: inline-block;
    margin-right: 0.8rem;
  }
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: #666;
`;

const Stars = styled.div`
  display: flex;
  color: #fbbf24;
`;

const InquiryButton = styled(HoverButton)`
  margin: 0.5rem 0.8rem 1rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: none;
  background: ${({ $added }) => ($added ? "#25d366" : "#a47148")};
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: ${({ $added }) => ($added ? "#1da851" : "#8b5a3c")};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(164, 113, 72, 0.3);
  }
`;

const SimpleProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem, removeItem, isInInquiry } = useInquiry();

  const isAdded = isInInquiry(product.id);

  const handleInquiryClick = (e) => {
    e.stopPropagation();
    if (isAdded) {
      removeItem(product.id);
    } else {
      addItem(product);
      window.dispatchEvent(new CustomEvent('inquiryItemAdded'));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} fill={i < Math.floor(rating) ? "#fbbf24" : "none"} />
    ));
  };

  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.images?.[0] || product.image} alt={product.name} />
      
      <StockBadge status={product.stockStatus}>
        {product.stockStatus}
      </StockBadge>
      
      <ProductInfo>
        <h4>{product.name}</h4>
        
        {product.length && (
          <SareeDetails>
            <span>{product.length}</span>
            {product.fabricWeight && <span>{product.fabricWeight}</span>}
            {product.regionalStyle && <span>{product.regionalStyle}</span>}
          </SareeDetails>
        )}
        
        {product.avgRating > 0 && (
          <RatingSection>
            <Stars>{renderStars(product.avgRating)}</Stars>
            <span>{product.avgRating}</span>
            <span>({product.totalReviews})</span>
          </RatingSection>
        )}
      </ProductInfo>

      <InquiryButton $added={isAdded} onClick={handleInquiryClick}>
        {isAdded ? "Added to Inquiry" : "Add to Inquiry"}
      </InquiryButton>
    </Card>
  );
};

export default SimpleProductCard;