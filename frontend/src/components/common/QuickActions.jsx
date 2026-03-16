import React from "react";
import styled from "styled-components";
import { FiHeart, FiBarChart2 } from "react-icons/fi";

const QuickActions = ({ onWishlist, onCompare }) => {
  return (
    <Actions>
      <ActionBtn onClick={onWishlist} title="Add to Wishlist">
        <FiHeart />
      </ActionBtn>
      <ActionBtn onClick={onCompare} title="Compare">
        <FiBarChart2 />
      </ActionBtn>
    </Actions>
  );
};

export default QuickActions;

const Actions = styled.div`
  position: absolute;
  top: 50px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  z-index: 3;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #a47148;
    transform: scale(1.1);
  }
`;
