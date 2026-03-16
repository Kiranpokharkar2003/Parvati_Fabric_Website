import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiStar, FiEye } from "react-icons/fi";
import { useInquiry } from "../../contexts/InquiryContext";
import { AnimatedCard, HoverButton } from "../common/MicroAnimations";
import QuickViewModal from "./QuickViewModal";
import NewBadge from "../common/NewBadge";
import QuickActions from "../common/QuickActions";
import FloatingBadge from "../common/FloatingBadge";

const QuickViewBtn = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

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
  
  &:hover ${QuickViewBtn} {
    opacity: 1;
  }
  
  &:hover .quick-actions {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f0f0f0;
  
  img {
    transition: opacity 0.5s ease;
    
    &.primary {
      z-index: 1;
    }
    
    &.secondary {
      opacity: 0;
      z-index: 2;
    }
  }
  
  &:hover img.secondary {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  padding: 0 0.8rem;
  flex: 1;
  
  h4 {
    padding: 0.8rem 0 0.4rem;
    font-size: 0.95rem;
    font-weight: 500;
    margin: 0;
  }
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

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { items, addItem, removeItem, isInInquiry } = useInquiry();
  const [showQuickView, setShowQuickView] = useState(false);
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);

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

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    console.log("Added to wishlist:", product.id);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    console.log("Added to compare:", product.id);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} fill={i < Math.floor(rating) ? "#fbbf24" : "none"} />
    ));
  };

  return (
    <>
      <Card onClick={() => navigate(`/product/${product.id}`)}>
        <ImageWrapper>
          {!img1Loaded && <Skeleton />}
          <ProductImage 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="primary"
            onLoad={() => setImg1Loaded(true)}
            $loaded={img1Loaded}
          />
          {product.images?.[1] && (
            <>
              {!img2Loaded && <Skeleton className="secondary-skeleton" />}
              <ProductImage 
                src={product.images[1]} 
                alt={`${product.name} - alternate view`}
                className="secondary"
                onLoad={() => setImg2Loaded(true)}
                $loaded={img2Loaded}
              />
            </>
          )}
        </ImageWrapper>
        
        <NewBadge dateAdded={product.dateAdded} />
        
        <QuickViewBtn onClick={handleQuickView} title="Quick View">
          <FiEye />
        </QuickViewBtn>
        
        <div className="quick-actions">
          <QuickActions onWishlist={handleWishlist} onCompare={handleCompare} />
        </div>
        
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
      
      <QuickViewModal 
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  z-index: 0;
  
  &.secondary-skeleton {
    z-index: 1;
  }
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease;
  
  &.primary {
    z-index: 1;
  }
  
  &.secondary {
    z-index: 2;
  }
`;