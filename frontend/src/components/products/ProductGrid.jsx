import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  width: 100%;
  transition: 0.25s ease;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductGrid = ({ products = [] }) => {
  return (
    <Grid>
      {products.map((product, index) => (
        <div key={`${product.id}-${index}`} data-product-subcategory={product.subcategory}>
          <ProductCard product={product} />
        </div>
      ))}
    </Grid>
  );
};

export default ProductGrid;

