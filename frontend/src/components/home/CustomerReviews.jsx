import React from 'react';
import styled, { keyframes } from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';
import { FiStar } from 'react-icons/fi';

const goldShimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "Absolutely stunning sarees! The quality is exceptional and the designs are breathtaking. Perfect for my wedding functions.",
    image: "/images/customers/customer1.jpg",
    product: "Banarasi Silk Saree"
  },
  {
    id: 2,
    name: "Anita Patel",
    location: "Ahmedabad", 
    rating: 5,
    review: "Amazing collection and excellent service. The fabric quality exceeded my expectations. Highly recommended!",
    image: "/images/customers/customer2.jpg",
    product: "Designer Lehenga"
  },
  {
    id: 3,
    name: "Meera Reddy",
    location: "Hyderabad",
    rating: 5,
    review: "Beautiful traditional sarees with modern touch. Fast delivery and great customer support. Will definitely order again!",
    image: "/images/customers/customer3.jpg",
    product: "Cotton Saree Collection"
  }
];

const CustomerReviews = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} fill={i < rating ? "#d4af37" : "none"} color="#d4af37" />
    ));
  };

  return (
    <Section>
      <Container>
        <Header>
          <SubHeading>CUSTOMER TESTIMONIALS</SubHeading>
          <Heading>What Our Customers Say</Heading>
          <AccentLine />
        </Header>

        <ReviewsGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewContent>
                <Stars>{renderStars(review.rating)}</Stars>
                <ReviewText>"{review.review}"</ReviewText>
                <ProductTag>{review.product}</ProductTag>
              </ReviewContent>
              
              <CustomerInfo>
                <CustomerImage src={review.image} alt={review.name} />
                <CustomerDetails>
                  <CustomerName>{review.name}</CustomerName>
                  <CustomerLocation>{review.location}</CustomerLocation>
                </CustomerDetails>
              </CustomerInfo>
            </ReviewCard>
          ))}
        </ReviewsGrid>

        <TrustStats>
          <StatItem>
            <StatNumber>10,000+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>4.9/5</StatNumber>
            <StatLabel>Average Rating</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>98%</StatNumber>
            <StatLabel>Satisfaction Rate</StatLabel>
          </StatItem>
        </TrustStats>
      </Container>
    </Section>
  );
};

export default CustomerReviews;

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #fdf8f3, #fff);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SubHeading = styled.div`
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #a47148;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(164, 113, 72, 0.3), transparent);
    animation: ${goldShimmer} 3s infinite;
  }
`;

const Heading = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.7rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #a47148;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AccentLine = styled.div`
  width: 70px;
  height: 2px;
  background: linear-gradient(90deg, #a47148, #d4af37, #a47148);
  margin: 0 auto;
  transition: all 0.4s ease;
  
  ${Header}:hover & {
    width: 120px;
    background: linear-gradient(90deg, #d4af37, #a47148, #d4af37);
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(164, 113, 72, 0.05), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(164, 113, 72, 0.15);
    
    &::before {
      left: 100%;
    }
  }
`;

const ReviewContent = styled.div`
  margin-bottom: 1.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ReviewText = styled.p`
  font-family: 'Lora', serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
  font-style: italic;
`;

const ProductTag = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #a47148;
  font-weight: 500;
  background: rgba(164, 113, 72, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  display: inline-block;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CustomerImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(164, 113, 72, 0.2);
`;

const CustomerDetails = styled.div``;

const CustomerName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.2rem;
`;

const CustomerLocation = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
`;

const TrustStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(164, 113, 72, 0.1);
  }
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #a47148;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;