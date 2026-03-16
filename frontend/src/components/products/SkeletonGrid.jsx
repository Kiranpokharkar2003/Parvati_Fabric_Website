import React from "react";
import Skeleton from "./SkeletonCard";
import styled from "styled-components";

const Grid = styled.div`
  column-count: 4;
  column-gap: 1rem;
  padding: 2rem;

  @media (max-width: 1024px) { column-count: 3; }
  @media (max-width: 768px) { column-count: 2; }
  @media (max-width: 480px) { column-count: 1; }
`;

const SkeletonGrid = ({ count = 12 }) => {
  return (
    <Grid>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </Grid>
  );
};

export default SkeletonGrid;
