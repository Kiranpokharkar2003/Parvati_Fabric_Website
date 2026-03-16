import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { respond } from '../../styles/mixins';
import Container from '../common/Container';
import { FiMail, FiGift } from 'react-icons/fi';

const goldShimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Section>
      <Container>
        <NewsletterCard>
          <Content>
            <IconWrapper>
              <FiGift />
            </IconWrapper>
            <Title>Get 10% Off Your First Order!</Title>
            <Description>
              Subscribe to our newsletter for exclusive offers, new arrivals, and styling tips
            </Description>
            
            {!isSubscribed ? (
              <Form onSubmit={handleSubmit}>
                <InputWrapper>
                  <FiMail />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputWrapper>
                <SubmitButton type="submit">
                  Get My Discount
                </SubmitButton>
              </Form>
            ) : (
              <SuccessMessage>
                ✨ Thank you! Check your email for the discount code.
              </SuccessMessage>
            )}
            
            <Disclaimer>
              *Valid for first-time customers. Terms & conditions apply.
            </Disclaimer>
          </Content>
        </NewsletterCard>
      </Container>
    </Section>
  );
};

export default NewsletterSignup;

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #a47148, #d4af37);
`;

const NewsletterCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
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
    animation: ${goldShimmer} 3s infinite;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #a47148, #d4af37);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-family: 'Lora', serif;
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto 1.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 50px;
  padding: 0 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #a47148;
    background: white;
  }
  
  svg {
    color: #999;
    margin-right: 0.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 1rem 0;
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(164, 113, 72, 0.3);
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Disclaimer = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #999;
`;