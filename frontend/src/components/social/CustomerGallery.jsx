import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHeart, FiMessageCircle, FiInstagram } from 'react-icons/fi';
import { AnimatedCard } from '../common/MicroAnimations';

const GalleryContainer = styled.div`
  margin: 3rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CustomerCard = styled(AnimatedCard)`
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

const CustomerImage = styled.div`
  position: relative;
  height: 300px;
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

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 60%, rgba(0,0,0,0.7));
  display: flex;
  align-items: flex-end;
  padding: 1rem;
`;

const ProductTag = styled.div`
  background: rgba(164, 113, 72, 0.9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CustomerInfo = styled.div`
  padding: 1rem;
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .verified {
    color: #1da1f2;
    font-size: 0.8rem;
  }
`;

const CustomerReview = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const SocialStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.8rem;
  border-top: 1px solid #f0f0f0;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #666;
  font-size: 0.8rem;
  
  svg {
    color: #a47148;
  }
`;

const InstagramLink = styled.a`
  color: #e4405f;
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    color: #c13584;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  border: 2px solid ${({ $active }) => ($active ? '#a47148' : '#e0e0e0')};
  background: ${({ $active }) => ($active ? '#a47148' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#666')};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    border-color: #a47148;
    color: ${({ $active }) => ($active ? 'white' : '#a47148')};
  }
`;

const CustomerGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const customerPosts = [
    {
      id: 1,
      customerName: 'Priya Sharma',
      verified: true,
      image: '/images/customers/customer-1.jpg',
      productWorn: 'Banarasi Silk Saree',
      review: 'Absolutely stunning quality! Got so many compliments at my sister\'s wedding.',
      likes: 124,
      comments: 18,
      instagramHandle: '@priya_styles',
      category: 'wedding'
    },
    {
      id: 2,
      customerName: 'Meera Patel',
      verified: true,
      image: '/images/customers/customer-2.jpg',
      productWorn: 'Cotton Handloom Saree',
      review: 'Perfect for daily wear! Comfortable and elegant.',
      likes: 89,
      comments: 12,
      instagramHandle: '@meera_everyday',
      category: 'daily'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Posts' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'daily', label: 'Daily Wear' }
  ];

  const filteredPosts = activeFilter === 'all' 
    ? customerPosts 
    : customerPosts.filter(post => post.category === activeFilter);

  return (
    <GalleryContainer>
      <SectionHeader>
        <h2>Our Happy Customers</h2>
        <p>See how our beautiful sarees look on real customers</p>
      </SectionHeader>

      <FilterTabs>
        {filters.map(filter => (
          <FilterTab
            key={filter.key}
            $active={activeFilter === filter.key}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>

      <GalleryGrid>
        {filteredPosts.map((post, index) => (
          <CustomerCard key={post.id} delay={`${index * 0.1}s`}>
            <CustomerImage>
              <img src={post.image} alt={`${post.customerName} wearing ${post.productWorn}`} />
              <ImageOverlay>
                <ProductTag>{post.productWorn}</ProductTag>
              </ImageOverlay>
            </CustomerImage>
            
            <CustomerInfo>
              <CustomerName>
                {post.customerName}
                {post.verified && <span className="verified">✓</span>}
              </CustomerName>
              
              <CustomerReview>"{post.review}"</CustomerReview>
              
              <SocialStats>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <StatItem>
                    <FiHeart />
                    {post.likes}
                  </StatItem>
                  <StatItem>
                    <FiMessageCircle />
                    {post.comments}
                  </StatItem>
                </div>
                
                <InstagramLink href={`https://instagram.com/${post.instagramHandle.slice(1)}`} target="_blank">
                  <FiInstagram />
                  {post.instagramHandle}
                </InstagramLink>
              </SocialStats>
            </CustomerInfo>
          </CustomerCard>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default CustomerGallery;