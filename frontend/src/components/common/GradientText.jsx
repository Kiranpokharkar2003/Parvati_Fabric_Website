import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #a47148, #d4af37, #a47148, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
  font-weight: 700;
`;

export default GradientText;
