import React from 'react';
import styled from 'styled-components';
import { SkeletonCard, SkeletonText } from '../common/MicroAnimations';

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkeletonProductCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

const SkeletonImage = styled(SkeletonCard)`
  height: 300px;
  border-radius: 0;
`;

const SkeletonContent = styled.div`
  padding: 0.8rem;
`;

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <SkeletonGrid>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonProductCard key={index}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonText height="20px" width="80%" />
            <SkeletonText height="14px" width="60%" />
            <SkeletonText height="14px" width="40%" />
            <SkeletonText height="36px" width="100%" margin="1rem 0 0.5rem" />
          </SkeletonContent>
        </SkeletonProductCard>
      ))}
    </SkeletonGrid>
  );
};

export default ProductGridSkeleton;