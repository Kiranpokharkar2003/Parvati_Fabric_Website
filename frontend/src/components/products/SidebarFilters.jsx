// src/pages/Products.jsx
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../data/products";
import ProductGrid from "../../components/products/ProductGrid";
import styled from "styled-components";

const Products = () => {
  const { category, subcategory } = useParams();

  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      const matchCategory = category ? p.category === category : true;
      const matchSub = subcategory ? p.subcategory === subcategory : true;
      return matchCategory && matchSub;
    });
  }, [category, subcategory]);

  const subcategories = useMemo(() => {
    if (!category) return [];
    return [...new Set(productsData
      .filter((p) => p.category === category)
      .map((p) => p.subcategory))];
  }, [category]);

  return (
    <Layout>
      <Sidebar>
        <SidebarFilters
          category={category}
          subcategories={subcategories}
          activeSub={subcategory}
        />
      </Sidebar>

      <Content>
        <h2>{subcategory ? subcategory : category}</h2>
        <ProductGrid products={filteredProducts} />
      </Content>
    </Layout>
  );
};

export default Products;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div``;
const Content = styled.div``;
