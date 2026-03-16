import React from "react";
import styled, { keyframes } from "styled-components";

const isNewProduct = (dateAdded) => {
  if (!dateAdded) return false;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(dateAdded) > thirtyDaysAgo;
};

const NewBadge = ({ dateAdded }) => {
  if (!isNewProduct(dateAdded)) return null;
  
  return <Badge>NEW</Badge>;
};

export default NewBadge;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Badge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 2;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
`;
