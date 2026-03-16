import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "./Container";
import { FiHome, FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <BreadcrumbWrapper>
      <Container>
        <BreadcrumbContent>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.link ? (
                <Link to={item.link}>
                  {index === 0 && <FiHome />}
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < items.length - 1 && <FiChevronRight />}
            </React.Fragment>
          ))}
        </BreadcrumbContent>
      </Container>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;

const BreadcrumbWrapper = styled.div`
  background: #f8f9fa;
  padding: 0.7rem 0;
  border-bottom: 1px solid #e9ecef;
  position: relative;
  margin-top: calc(0px + var(--banner-height, 0px));
  
  @media (max-width: 768px) {
    margin-top: 0;
    padding: 0.6rem 0;
  }
`;

const BreadcrumbContent = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  a {
    color: #333;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: #a47148;
    }
    
    svg {
      font-size: 1rem;
    }
  }
  
  span {
    color: #999;
  }
  
  > svg {
    color: #ccc;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 0.4rem;
  }
`;