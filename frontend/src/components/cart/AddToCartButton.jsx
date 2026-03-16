import React from "react";
import styled from "styled-components";
import { useCart } from "../../contexts/CartContext";

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #9c6b2f;
  }
`;

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  return <Button onClick={() => addToCart(product)}>Add to Cart</Button>;
};

export default AddToCartButton;
