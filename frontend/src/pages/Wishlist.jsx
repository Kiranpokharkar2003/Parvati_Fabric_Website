import React from 'react';
import styled from 'styled-components';
import { FiHeart, FiShare2, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import useWishlist from '../hooks/useWishlist';
import useInquiry from '../hooks/useInquiry';
import Container from '../components/common/Container';
import { HoverButton, AnimatedCard } from '../components/common/MicroAnimations';

const WishlistContainer = styled.div`
  min-height: 60vh;
  padding: 2rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .expiry-info {
    background: rgba(164, 113, 72, 0.1);
    color: #a47148;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    display: inline-block;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled(HoverButton)`
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.share {
    background: #3b82f6;
    color: white;
  }
  
  &.clear {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const WishlistCard = styled(AnimatedCard)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  color: #ff4757;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff4757;
    color: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1.2rem;
`;

const ProductName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProductCategory = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 1rem;
`;

const InquiryBtn = styled(HoverButton)`
  width: 100%;
  padding: 0.8rem;
  border-radius: 25px;
  border: none;
  background: #a47148;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  
  .icon {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const Wishlist = () => {
  const { items, removeItem, clearAll, getShareableLink, getDaysRemaining } = useWishlist();
  const { addItem: addToInquiry, isInInquiry } = useInquiry();

  const handleShare = async () => {
    const shareUrl = getShareableLink();
    if (navigator.share) {
      await navigator.share({
        title: 'My Saree Wishlist',
        text: 'Check out my favorite sarees!',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Wishlist link copied to clipboard!');
    }
  };

  const handleAddToInquiry = (product) => {
    if (!isInInquiry(product.id)) {
      addToInquiry(product);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (items.length === 0) {
    return (
      <Container>
        <WishlistContainer>
          <EmptyState>
            <div className="icon">
              <FiHeart />
            </div>
            <h3>Your wishlist is empty</h3>
            <p>Save your favorite sarees to view them here</p>
          </EmptyState>
        </WishlistContainer>
      </Container>
    );
  }

  return (
    <Container>
      <WishlistContainer>
        <Header>
          <h1>My Wishlist ({items.length})</h1>
          <div className="subtitle">Your favorite sarees saved for later</div>
          <div className="expiry-info">
            ⏰ Expires in {getDaysRemaining()} days
          </div>
        </Header>

        <Actions>
          <ActionBtn className="share" onClick={handleShare}>
            <FiShare2 />
            Share Wishlist
          </ActionBtn>
          <ActionBtn className="clear" onClick={clearAll}>
            <FiTrash2 />
            Clear All
          </ActionBtn>
        </Actions>

        <WishlistGrid>
          {items.map((product, index) => (
            <WishlistCard key={product.id} delay={`${index * 0.1}s`}>
              <ProductImage>
                <img src={product.images?.[0] || product.image} alt={product.name} />
                <RemoveBtn onClick={() => removeItem(product.id)}>
                  <FiTrash2 />
                </RemoveBtn>
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductCategory>{product.category}</ProductCategory>
                
                <ProductMeta>
                  <span>Added {formatDate(product.addedAt)}</span>
                  <span>{product.stockStatus}</span>
                </ProductMeta>
                
                <InquiryBtn 
                  onClick={() => handleAddToInquiry(product)}
                  disabled={isInInquiry(product.id)}
                >
                  <FiShoppingBag />
                  {isInInquiry(product.id) ? 'Added to Inquiry' : 'Add to Inquiry'}
                </InquiryBtn>
              </ProductInfo>
            </WishlistCard>
          ))}
        </WishlistGrid>
      </WishlistContainer>
    </Container>
  );
};

export default Wishlist;