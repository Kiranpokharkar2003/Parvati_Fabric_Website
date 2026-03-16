import React from "react";
import styled, { keyframes } from "styled-components";

const PageTransition = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageTransition;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
`;
