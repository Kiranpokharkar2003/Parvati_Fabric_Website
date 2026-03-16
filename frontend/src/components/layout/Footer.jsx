import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { respond } from "../../styles/mixins";
import Container from "../common/Container";
import InquiryModal from "../common/InquiryModal"; // adjust path if needed

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Foot>
        <Container>
          <Grid>
            <Col>
              <h3>Parvati Fabrics Ltd</h3>
              <p>Premium Saree Manufacturer</p>
            </Col>

            <Col>
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/products">Products</Link>
              <Link to="/contact">Contact</Link>
            </Col>

            <Col>
              <h4>Contact</h4>
              <p>Surat, Gujarat</p>
              <p>+91 XXXXX XXXXX</p>

              <InquiryButton onClick={() => setOpen(true)}>
                Send Inquiry
              </InquiryButton>
            </Col>
          </Grid>

          <Bottom>
            © {new Date().getFullYear()} Parvati Fabrics. All rights reserved.
          </Bottom>
        </Container>
      </Foot>

      <InquiryModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Footer;

const Foot = styled.footer`
  background: #111;
  color: white;
  padding: 3rem 0 1.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '✦';
    position: absolute;
    bottom: 20px;
    left: 5%;
    font-size: 3rem;
    color: rgba(212, 175, 55, 0.1);
    transform: rotate(15deg);
  }
  
  ${respond("tablet")} {
    padding: 2rem 0 1rem;
  }
  
  ${respond("mobile")} {
    padding: 1.5rem 0 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;

  ${respond("tablet")} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  ${respond("mobile")} {
    gap: 1.2rem;
  }
`;

const Col = styled.div`
  position: relative;
  
  &:first-child::before {
    content: '❀';
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: 2rem;
    color: rgba(212, 175, 55, 0.15);
    
    ${respond("tablet")} {
      display: none;
    }
  }
  
  h3,
  h4 {
    margin-bottom: 1rem;
    font-family: 'Cormorant Garamond', serif;
    color: #d4af37;
    
    ${respond("tablet")} {
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
    }
    
    ${respond("mobile")} {
      margin-bottom: 0.6rem;
      font-size: 1rem;
    }
  }
  
  h3 {
    font-size: 1.4rem;
    
    ${respond("tablet")} {
      font-size: 1.2rem;
    }
    
    ${respond("mobile")} {
      font-size: 1.1rem;
    }
  }

  p,
  a {
    display: block;
    color: #ccc;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    
    ${respond("tablet")} {
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
    }
    
    ${respond("mobile")} {
      font-size: 0.85rem;
      margin-bottom: 0.35rem;
    }
  }
  
  a {
    transition: color 0.3s ease;
    
    &:hover {
      color: #d4af37;
    }
  }
`;

const InquiryButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(164, 113, 72, 0.3);

  &:hover {
    background: linear-gradient(135deg, #d4af37, #a47148);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(164, 113, 72, 0.5);
  }
  
  ${respond("tablet")} {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    margin-top: 0.8rem;
  }
  
  ${respond("mobile")} {
    padding: 0.45rem 0.9rem;
    font-size: 0.8rem;
    margin-top: 0.6rem;
  }
`;

const Bottom = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #333;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
  position: relative;
  
  &::before {
    content: '✦ ❀ ✦';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #111;
    padding: 0 1rem;
    color: rgba(212, 175, 55, 0.3);
    font-size: 0.8rem;
    letter-spacing: 0.5rem;
  }
  
  ${respond("tablet")} {
    margin-top: 1.5rem;
    padding-top: 0.8rem;
    font-size: 0.85rem;
  }
  
  ${respond("mobile")} {
    margin-top: 1.2rem;
    padding-top: 0.7rem;
    font-size: 0.8rem;
  }
`;
