import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/common/Container';

const Seasonal = () => {
  const { season } = useParams();
  
  const seasonalProducts = [
    {
      id: 1,
      name: 'Royal Banarasi Silk Saree',
      price: 8999,
      originalPrice: 15999,
      discount: 44,
      image: '/images/products/banarasi-1.jpg',
      rating: 4.8,
      reviews: 156,
      features: ['Pure Silk', 'Gold Zari', 'Handwoven']
    },
    {
      id: 2,
      name: 'Designer Diwali Special',
      price: 12999,
      originalPrice: 19999,
      discount: 35,
      image: '/images/products/designer-1.jpg',
      rating: 4.9,
      reviews: 203,
      features: ['Premium Silk', '24K Gold Thread', 'Designer Blouse']
    },
    {
      id: 3,
      name: 'Traditional Kanjivaram',
      price: 15999,
      originalPrice: 24999,
      discount: 36,
      image: '/images/products/kanjivaram-1.jpg',
      rating: 4.7,
      reviews: 89,
      features: ['Pure Kanjivaram', 'Temple Border', 'Rich Pallu']
    },
    {
      id: 4,
      name: 'Festive Gold Collection',
      price: 18999,
      originalPrice: 28999,
      discount: 34,
      image: '/images/products/gold-1.jpg',
      rating: 4.9,
      reviews: 267,
      features: ['Heavy Work', 'Bridal Wear', 'Premium Quality']
    },
    {
      id: 5,
      name: 'Elegant Silk Saree',
      price: 6999,
      originalPrice: 11999,
      discount: 42,
      image: '/images/products/silk-1.jpg',
      rating: 4.6,
      reviews: 134,
      features: ['Soft Silk', 'Light Weight', 'Daily Wear']
    },
    {
      id: 6,
      name: 'Luxury Wedding Saree',
      price: 25999,
      originalPrice: 39999,
      discount: 35,
      image: '/images/products/wedding-1.jpg',
      rating: 5.0,
      reviews: 78,
      features: ['Bridal Collection', 'Heavy Embroidery', 'Designer Piece']
    }
  ];

  const getSeasonTitle = (season) => {
    switch(season) {
      case 'diwali': return 'Diwali Collection';
      case 'wedding': return 'Wedding Collection';
      case 'festive': return 'Festive Collection';
      default: return 'Seasonal Collection';
    }
  };

  return (
    <Page>
      <Container>
        <Header>
          <Title>{getSeasonTitle(season)}</Title>
          <Subtitle>Handpicked sarees for special occasions</Subtitle>
          <FilterBar>
            <FilterButton $active>All Products</FilterButton>
            <FilterButton>Under ₹10,000</FilterButton>
            <FilterButton>₹10,000 - ₹20,000</FilterButton>
            <FilterButton>Above ₹20,000</FilterButton>
          </FilterBar>
        </Header>
        
        <ProductGrid>
          {seasonalProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                <img src={product.image} alt={product.name} />
                <DiscountBadge>{product.discount}% OFF</DiscountBadge>
                <WishlistButton>♡</WishlistButton>
              </ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <Rating>
                  <Stars>★★★★★</Stars>
                  <RatingText>({product.reviews})</RatingText>
                </Rating>
                <Features>
                  {product.features.map((feature, index) => (
                    <Feature key={index}>{feature}</Feature>
                  ))}
                </Features>
                <PriceSection>
                  <CurrentPrice>₹{product.price.toLocaleString()}</CurrentPrice>
                  <OriginalPrice>₹{product.originalPrice.toLocaleString()}</OriginalPrice>
                </PriceSection>
                <ButtonGroup>
                  <AddToCartButton>Add to Inquiry</AddToCartButton>
                  <QuickViewButton>Quick View</QuickViewButton>
                </ButtonGroup>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Container>
    </Page>
  );
};

export default Seasonal;

const Page = styled.div`
  padding: 8rem 0 4rem;
  background: #fafafa;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: #2b2b2b;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.$active ? '#a47148' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border: 1px solid #a47148;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #a47148;
    color: white;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e74c3c;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #2b2b2b;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  color: #ffd700;
  font-size: 0.9rem;
`;

const RatingText = styled.div`
  color: #666;
  font-size: 0.8rem;
`;

const Features = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Feature = styled.span`
  background: #f8f6f3;
  color: #a47148;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CurrentPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #a47148;
`;

const OriginalPrice = styled.div`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddToCartButton = styled.button`
  flex: 1;
  background: #a47148;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #8b5d3c;
  }
`;

const QuickViewButton = styled.button`
  background: transparent;
  color: #a47148;
  border: 1px solid #a47148;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #a47148;
    color: white;
  }
`;