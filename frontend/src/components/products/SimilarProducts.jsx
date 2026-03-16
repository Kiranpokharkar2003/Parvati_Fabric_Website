import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import productsData from "../../data/products";

const SimilarProducts = ({ category, subcategory }) => {
  const { id } = useParams();

  const similar = productsData
    .filter((p) => {
      if (String(p.id) === String(id)) return false;

      // Priority: same category + same subcategory
      if (subcategory) {
        return (
          p.category === category &&
          p.subcategory === subcategory
        );
      }

      // Fallback: same category
      return p.category === category;
    })
    .slice(0, 10);

  if (!similar.length) return null;

  return (
    <Wrapper>
      <Track>
        {similar.map((product) => {
          // ✅ SAFE IMAGE HANDLING
          const imageSrc = Array.isArray(product.image)
            ? product.image[0]
            : product.image;

          return (
            <Card key={product.id} to={`/product/${product.id}`}>
              <ImgWrap>
                <img
                  src={imageSrc}
                  alt={product.name}
                  loading="lazy"
                />
              </ImgWrap>

              <Info>
                <h4>{product.name}</h4>
                <Category>{product.subcategory}</Category>
              </Info>
            </Card>
          );
        })}
      </Track>
    </Wrapper>
  );
};

export default SimilarProducts;

/* -------------------- STYLES -------------------- */

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    overflow-x: visible;
  }
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 769px) {
    display: flex;
    overflow-x: auto;
  }
`;

const Card = styled(Link)`
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: #111;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-6px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  @media (min-width: 769px) {
    min-width: 210px;
    max-width: 210px;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  height: 200px;
  background: #f4f4f4;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.4s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
  
  @media (min-width: 769px) {
    height: 280px;
  }
`;

const Info = styled.div`
  padding: 0.8rem 0.9rem 1rem;

  h4 {
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 0.2rem;
  }
`;

const Category = styled.div`
  font-size: 0.75rem;
  color: #777;
`;
