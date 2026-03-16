import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const Count = styled.div`
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #555;
`;

const Select = styled.select`
  font-size: 0.7rem;
  letter-spacing: 1px;
  border: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.3rem;
  background: transparent;
`;

const SortBar = ({ count }) => {
  return (
    <Bar>
      <Count>{count} PRODUCTS</Count>
    </Bar>
  );
};

export default SortBar;
