import React, { useState } from 'react';
import styled from 'styled-components';

const WholesalePortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    businessName: '',
    gstNumber: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    setIsLoggedIn(true);
  };

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <LoginSection>
          <LoginCard>
            <h2>Wholesale Portal Login</h2>
            <p>Access exclusive B2B pricing and bulk order features</p>
            
            <LoginForm onSubmit={handleLogin}>
              <InputGroup>
                <label>Business Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={loginForm.businessName}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <label>GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={loginForm.gstNumber}
                  onChange={handleInputChange}
                  placeholder="22AAAAA0000A1Z5"
                />
              </InputGroup>
              
              <LoginButton type="submit">Access Wholesale Portal</LoginButton>
            </LoginForm>
            
            <RegisterLink>
              <p>New to wholesale? <a href="#register">Register your business</a></p>
            </RegisterLink>
          </LoginCard>
          
          <BenefitsSection>
            <h3>Wholesale Benefits</h3>
            <BenefitsList>
              <BenefitItem>
                <Icon>💰</Icon>
                <div>
                  <h4>Bulk Pricing</h4>
                  <p>Up to 40% discount on bulk orders</p>
                </div>
              </BenefitItem>
              
              <BenefitItem>
                <Icon>📦</Icon>
                <div>
                  <h4>MOQ Calculator</h4>
                  <p>Minimum order quantity calculator</p>
                </div>
              </BenefitItem>
              
              <BenefitItem>
                <Icon>💳</Icon>
                <div>
                  <h4>Credit Terms</h4>
                  <p>Flexible payment options</p>
                </div>
              </BenefitItem>
              
              <BenefitItem>
                <Icon>📋</Icon>
                <div>
                  <h4>Catalog Access</h4>
                  <p>Download PDF catalogs</p>
                </div>
              </BenefitItem>
            </BenefitsList>
          </BenefitsSection>
        </LoginSection>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <WelcomeSection>
          <h1>Welcome to Wholesale Portal</h1>
          <BusinessInfo>
            <span>{loginForm.businessName}</span>
            <span>GST: {loginForm.gstNumber}</span>
          </BusinessInfo>
        </WelcomeSection>
        
        <LogoutButton onClick={() => setIsLoggedIn(false)}>
          Logout
        </LogoutButton>
      </Header>

      <Dashboard>
        <QuickActions>
          <ActionCard>
            <h3>Quick Order</h3>
            <p>Place bulk orders instantly</p>
            <ActionButton>Start Order</ActionButton>
          </ActionCard>
          
          <ActionCard>
            <h3>MOQ Calculator</h3>
            <p>Calculate minimum quantities</p>
            <ActionButton>Calculate</ActionButton>
          </ActionCard>
          
          <ActionCard>
            <h3>Price List</h3>
            <p>View wholesale pricing</p>
            <ActionButton>View Prices</ActionButton>
          </ActionCard>
          
          <ActionCard>
            <h3>Order History</h3>
            <p>Track previous orders</p>
            <ActionButton>View Orders</ActionButton>
          </ActionCard>
        </QuickActions>

        <MainContent>
          <Section>
            <SectionHeader>
              <h3>Bulk Pricing Tiers</h3>
            </SectionHeader>
            <PricingTable>
              <PricingRow>
                <span>Quantity</span>
                <span>Discount</span>
                <span>Price Range</span>
              </PricingRow>
              <PricingRow>
                <span>50-99 pieces</span>
                <span>15%</span>
                <span>₹850-₹1,200</span>
              </PricingRow>
              <PricingRow>
                <span>100-199 pieces</span>
                <span>25%</span>
                <span>₹750-₹1,050</span>
              </PricingRow>
              <PricingRow>
                <span>200+ pieces</span>
                <span>40%</span>
                <span>₹600-₹900</span>
              </PricingRow>
            </PricingTable>
          </Section>

          <Section>
            <SectionHeader>
              <h3>Credit Terms</h3>
            </SectionHeader>
            <CreditTerms>
              <TermItem>
                <strong>Payment Terms:</strong>
                <span>Net 30 days for approved buyers</span>
              </TermItem>
              <TermItem>
                <strong>Credit Limit:</strong>
                <span>₹5,00,000 (subject to approval)</span>
              </TermItem>
              <TermItem>
                <strong>Early Payment:</strong>
                <span>2% discount for payment within 10 days</span>
              </TermItem>
            </CreditTerms>
          </Section>
        </MainContent>
      </Dashboard>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const LoginSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  
  h2 {
    color: #8B4513;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    color: #333;
    font-weight: 500;
  }
  
  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #8B4513;
    }
  }
`;

const LoginButton = styled.button`
  background: #8B4513;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #A0522D;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: #8B4513;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BenefitsSection = styled.div`
  h3 {
    color: #8B4513;
    margin-bottom: 1.5rem;
  }
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  min-width: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const WelcomeSection = styled.div`
  h1 {
    color: #8B4513;
    margin-bottom: 0.5rem;
  }
`;

const BusinessInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #c82333;
  }
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const ActionButton = styled.button`
  background: #8B4513;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background: #A0522D;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    color: #8B4513;
    margin: 0;
  }
`;

const PricingTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PricingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  
  &:first-child {
    background: #8B4513;
    color: white;
    font-weight: 600;
  }
`;

const CreditTerms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TermItem = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  
  strong {
    color: #8B4513;
  }
  
  span {
    color: #555;
  }
`;

export default WholesalePortal;