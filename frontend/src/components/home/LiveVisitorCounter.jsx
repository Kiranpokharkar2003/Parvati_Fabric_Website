import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiEye } from "react-icons/fi";

const LiveVisitorCounter = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * 16) + 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 16) + 5);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Counter>
      <Dot />
      <FiEye />
      <span>{count} people viewing now</span>
    </Counter>
  );
};

export default LiveVisitorCounter;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Counter = styled.div`
  position: fixed;
  bottom: 6rem;
  left: 1.5rem;
  background: white;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #333;
  z-index: 998;
  
  svg {
    color: #a47148;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: ${pulse} 2s infinite;
`;
