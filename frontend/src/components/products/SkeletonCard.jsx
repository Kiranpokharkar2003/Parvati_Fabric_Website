import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const Skeleton = styled.div`
  height: 300px;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e6e6e6 37%,
    #f0f0f0 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
  margin-bottom: 1rem;
`;

export default Skeleton;
