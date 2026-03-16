import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../common/Container';
import allProductsData from '../../data/products';
import categories from '../../data/categories';
import GradientText from '../common/GradientText';

const FeaturedProducts = () => {
  // Get one product from each category
  const featuredProducts = categories.map(cat => ({
    category: cat.label,
    slug: cat.slug,
    product: allProductsData.find(p => p.category === cat.slug)
  })).filter(item => item.product);

  return (
    <Section>
      <Container>
        <Header>
          <DecorativeLine />
          <Subtitle>Curated Collections</Subtitle>
          <Title><GradientText>Featured Products</GradientText></Title>
          <Description>Discover our handpicked selection of timeless elegance</Description>
          <DecorativeLine />
        </Header>

        <ProductGrid>
          {featuredProducts.map(({ category, slug, product }) => (
            <ProductCard key={product.id} to={`/products/${product.category}/${product.subcategory}`}>
              <CategoryBadge>{category}</CategoryBadge>
              <ImageWrapper>
                <img src={product.images[0]} alt={product.name} />
              </ImageWrapper>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <GoldDivider>
                  <DividerDot />
                  <DividerLine />
                  <DividerDot />
                </GoldDivider>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>

        <ViewAllButton to="/products/sarees">
          Explore All Collections →
        </ViewAllButton>
      </Container>
    </Section>
  );
};

export default FeaturedProducts;

const Section = styled.section`
  padding: 1.5rem 0;
  background: radial-gradient(circle at top, #faf8f5, #f5f2ed);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 30px;
    background: linear-gradient(to bottom, transparent, #d4af37, transparent);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const DecorativeLine = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  margin: 0 auto 0.5rem;
  
  @media (max-width: 768px) {
    width: 80px;
    margin: 0 auto 0.4rem;
  }
`;

const Subtitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  color: #a47148;
  font-size: 0.85rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 2px;
  margin-bottom: 0.3rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    letter-spacing: 1.5px;
  }
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  color: #2b2b2b;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  font-family: 'Lora', serif;
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    & > *:nth-child(n+5) {
      display: none;
    }
  }
`;

const ProductCard = styled(Link)`
  background: white;
  overflow: visible;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid #d4af37;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-8px);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  padding: 0.4rem 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(164, 113, 72, 0.4);
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
    top: 12px;
    right: 12px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 260px;
  overflow: hidden;
  background: #f5f2ed;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    border-top: 2px solid #d4af37;
    border-left: 2px solid #d4af37;
    z-index: 2;
    
    @media (max-width: 768px) {
      width: 25px;
      height: 25px;
      top: 8px;
      left: 8px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.08);
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem 1rem;
  background: white;
  
  @media (max-width: 768px) {
    padding: 1.2rem 0.8rem;
  }
`;

const ProductName = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: #2b2b2b;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 0.8rem;
  min-height: 2.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
    min-height: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const GoldDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DividerLine = styled.div`
  width: 50px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  
  @media (max-width: 768px) {
    width: 40px;
  }
`;

const DividerDot = styled.div`
  width: 3px;
  height: 3px;
  background: #d4af37;
  border-radius: 50%`;

const ViewAllButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 2.5rem auto 0;
  padding: 0.7rem 2rem;
  background: transparent;
  color: #a47148;
  text-decoration: none;
  border: 2px solid #d4af37;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #a47148, #d4af37);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(164, 113, 72, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
    margin: 2rem auto 0;
  }
`;
