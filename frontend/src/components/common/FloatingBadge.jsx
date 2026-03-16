import React from "react";
import styled, { keyframes } from "styled-components";
import { FiTrendingUp, FiAward } from "react-icons/fi";

const FloatingBadge = ({ type }) => {
  if (type === "trending") {
    return (
      <Badge $color="#ff6b6b">
        <FiTrendingUp />
        Trending
      </Badge>
    );
  }
  
  if (type === "bestseller") {
    return (
      <Badge $color="#ffd700">
        <FiAward />
        Best Seller
      </Badge>
    );
  }
  
  return null;
};

export default FloatingBadge;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const Badge = styled.div`
  position: absolute;
  top: 45px;
  right: 8px;
  background: ${({ $color }) => $color};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 3;
  animation: ${float} 2s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: 0.9rem;
  }
`;
