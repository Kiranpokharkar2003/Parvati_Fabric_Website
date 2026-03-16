import React from "react";
import styled from "styled-components";
import { FiShoppingBag } from "react-icons/fi";

const StickyMobileBar = ({ product, isAdded, onInquiry }) => {
  return (
    <Bar>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductCategory>{product.category}</ProductCategory>
      </ProductInfo>
      <InquiryBtn $added={isAdded} onClick={onInquiry}>
        <FiShoppingBag />
        {isAdded ? "Added" : "Add to Inquiry"}
      </InquiryBtn>
    </Bar>
  );
};

export default StickyMobileBar;

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  display: none;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductCategory = styled.div`
  font-size: 0.75rem;
  color: #999;
  text-transform: capitalize;
`;

const InquiryBtn = styled.button`
  background: ${({ $added }) => ($added ? "#25d366" : "#a47148")};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
`;
