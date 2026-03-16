import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../common/Container';

const categories = [
  {
    title: 'Sarees',
    slug: 'sarees',
    image: '/images/categories/sarees.jpg',
    description: 'Elegant traditional wear'
  },
  {
    title: 'Lehengas',
    slug: 'lehengas',
    image: '/images/categories/lehengas.jpg',
    description: 'Perfect for celebrations'
  },
  {
    title: 'Kurtis',
    slug: 'kurtis',
    image: '/images/categories/kurtis.jpg',
    description: 'Comfortable daily wear'
  },
  {
    title: 'Fabrics',
    slug: 'fabrics',
    image: '/images/categories/fabrics.jpg',
    description: 'Premium quality materials'
  }
];

const CategoryGrid = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Shop by Category</Title>
          <Subtitle>Explore our exclusive collections</Subtitle>
        </Header>
        <Grid>
          {categories.map((category) => (
            <CategoryCard key={category.slug} to={`/products/${category.slug}`}>
              <ImageWrapper>
                <img src={category.image} alt={category.title} />
                <Overlay />
              </ImageWrapper>
              <Content>
                <CategoryTitle>{category.title}</CategoryTitle>
                <Description>{category.description}</Description>
                <ShopButton>Shop Now →</ShopButton>
              </Content>
            </CategoryCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default CategoryGrid;

const Section = styled.section`
  padding: 4rem 0;
  background: #fafafa;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.1);
    }
    
    ${() => Overlay} {
      opacity: 0.3;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.6));
  opacity: 0.5;
  transition: opacity 0.3s ease;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1rem;
`;

const ShopButton = styled.span`
  display: inline-block;
  color: #ee9343;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.3s ease;
  
  ${CategoryCard}:hover & {
    transform: translateX(5px);
  }
`;
