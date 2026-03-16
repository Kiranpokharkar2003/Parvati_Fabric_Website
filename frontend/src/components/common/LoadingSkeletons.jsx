import React from "react";
import styled, { keyframes } from "styled-components";

export const ProductCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonTitle />
      <SkeletonText width="60%" />
      <SkeletonText width="40%" />
      <SkeletonButton />
    </SkeletonContent>
  </SkeletonCard>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <SkeletonGrid>
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </SkeletonGrid>
);

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

const SkeletonCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  height: 250px;
  aspect-ratio: 3/4;
`;

const SkeletonContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.5rem;
  width: 100%;
`;

const SkeletonText = styled(SkeletonBase)`
  height: 1rem;
  width: ${props => props.width || '100%'};
`;

const SkeletonButton = styled(SkeletonBase)`
  height: 2.5rem;
  width: 100%;
  border-radius: 20px;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;