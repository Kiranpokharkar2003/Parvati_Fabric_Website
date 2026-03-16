import React from 'react';
import styled from 'styled-components';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-image: url('/public/images/footer-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f5f5f5;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    // background: linear-gradient(135deg, rgba(44, 24, 16, 0.85), rgba(26, 15, 8, 0.85));
    z-index: 0;
  }
  
  @media (max-width: 1024px) {
    padding: 1.5rem 0 0.6rem;
    margin-top: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0 0.5rem;
    margin-top: 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.8fr 0.8fr 1.4fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
    margin-bottom: 0;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
    margin-bottom: 0;
    text-align: center;
  }
`;

const CompanySection = styled.div`
  position: relative;
  
  @media (max-width: 1024px) {
    margin-bottom: 1.5rem;
  }
  
  img {
    height: 60px;
    margin-bottom: 1rem;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    
    @media (max-width: 1024px) {
      height: 50px;
      margin-bottom: 0.8rem;
    }
    
    @media (max-width: 768px) {
      height: 45px;
      margin-bottom: 0.6rem;
    }
  }
  
  h3 {
    font-family: var(--font-primary);
    font-size: 1.8rem;
    color: #d4a574;
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 1024px) {
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 0.6rem;
    }
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #f5f5f5;
    font-size: 0.95rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 1024px) {
      display: none;
    }
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    @media (max-width: 1024px) {
      align-items: center;
      gap: 0.6rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: #f5f5f5;
      font-size: 0.95rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      
      @media (max-width: 1024px) {
        font-size: 0.9rem;
        gap: 0.6rem;
      }
      
      @media (max-width: 768px) {
        font-size: 0.85rem;
      }
      
      svg {
        color: #d4a574;
        flex-shrink: 0;
        font-size: 1.1rem;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
        
        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }
  }
`;

const FooterSection = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
  
  h4 {
    font-family: var(--font-primary);
    font-size: 1.2rem;
    color: #d4a574;
    margin-bottom: 1rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.8rem;
      
      a {
        color: #f5f5f5;
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: 0.95rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        
        &:hover {
          color: #d4a574;
        }
      }
    }
  }
`;

const SocialSection = styled.div`
  @media (max-width: 1024px) {
    margin-bottom: 1.5rem;
  }
  
  h4 {
    font-family: var(--font-primary);
    font-size: 1.2rem;
    color: #d4a574;
    margin-bottom: 1rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 1024px) {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: 1024px) {
      justify-content: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }
    
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(212, 165, 116, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 165, 116, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d4a574;
      transition: all 0.3s ease;
      
      @media (max-width: 1024px) {
        width: 36px;
        height: 36px;
      }
      
      &:hover {
        background: #d4a574;
        color: #1a0f08;
        transform: translateY(-2px);
      }
    }
  }
  
  .map-container {
    @media (max-width: 1024px) {
      display: none;
    }
    
    h5 {
      color: #f5f5f5;
      margin-bottom: 0.8rem;
      font-size: 1rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    iframe {
      filter: grayscale(20%) brightness(0.9);
      transition: filter 0.3s ease;
      
      &:hover {
        filter: grayscale(0%) brightness(1);
      }
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(212, 165, 116, 0.2);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ccc;
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '✦ ✿ ✦';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    backdrop-filter: blur(2px);
    padding: 0 1rem;
    color: rgba(212, 165, 116, 0.5);
    font-size: 0.7rem;
    letter-spacing: 0.5rem;
  }
  
  @media (max-width: 1024px) {
    padding-top: 1rem;
    font-size: 0.75rem;
  }
  
  @media (max-width: 768px) {
    padding-top: 0.8rem;
    font-size: 0.7rem;
  }
  
  .payment-methods {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    @media (max-width: 1024px) {
      display: none;
    }
    
    span {
      font-size: 0.8rem;
      margin-right: 0.5rem;
      
      @media (max-width: 1024px) {
        font-size: 0.75rem;
      }
      
      @media (max-width: 768px) {
        margin-right: 0;
        font-size: 0.7rem;
      }
    }
    
    .payment-icons {
      display: flex;
      gap: 0.5rem;
      
      span {
        font-size: 0.8rem;
        opacity: 0.8;
        
        @media (max-width: 1024px) {
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          font-size: 0.7rem;
        }
      }
      
      img {
        height: 24px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
        
        @media (max-width: 1024px) {
          height: 20px;
        }
        
        @media (max-width: 768px) {
          height: 18px;
        }
        
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;

const PremiumFooter = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <CompanySection>
            <img src="/images/banners/logo.png" alt="Parvati Fabrics Limited" />
            <p>
              Leading manufacturer and exporter of premium ethnic wear. Specializing in sarees, dress materials, and traditional Indian textiles with a commitment to quality and craftsmanship.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <FiPhone />
                <span>+91 92652 82488</span>
              </div>
              <div className="contact-item">
                <FiMail />
                <span>parvatifabrics@gmail.com</span>
              </div>
              <div className="contact-item">
                <FiMapPin />
                <span>F- Tower, Shree Kuberji Textile Park, Delhi Gate, Japan Market, Begampura, Surat, Gujarat 395003</span>
              </div>
            </div>
          </CompanySection>

          <FooterSection>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Categories</h4>
            <ul>
              <li><a href="/products/sarees/silk">Silk Sarees</a></li>
              <li><a href="/products/sarees/cotton">Cotton Sarees</a></li>
              <li><a href="/products/sarees/work">Work Sarees</a></li>
              <li><a href="/products/sarees/organza">Organza Sarees</a></li>
              <li><a href="/products/lehengas">Lehengas</a></li>
              <li><a href="/products/kurtis">Kurtis</a></li>
            </ul>
          </FooterSection>

          <SocialSection>
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/parvatiethnics/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://www.instagram.com/parvatiethnics/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://x.com/parvatiethnics" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://www.youtube.com/channel/UC8v3z-s1naiQSBhD8VN-MdQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FiYoutube />
              </a>
            </div>
            
            <div className="map-container">
              <h4>Find Us</h4>
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.807354988732!2d72.83704520997527!3d21.19981048180197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ef141edb227%3A0xf0fcd27767dd6067!2sParvati%20Fabrics%20Ltd.!5e0!3m2!1sen!2sin!4v1770976355493!5m2!1sen!2sin"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '150px',
                  border: '1px solid rgba(212, 165, 116, 0.4)',
                  borderRadius: '6px'
                }}
              />
            </div>
          </SocialSection>
        </FooterContent>

        <FooterBottom>
          <div>
            © {new Date().getFullYear()} Parvati Fabrics Limited. All rights reserved.
          </div>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default PremiumFooter;