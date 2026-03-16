import React from "react";
import styled from "styled-components";

const LuxurySectionHeader = ({ title }) => {
  return (
    <Wrapper>
      <OrnamentTop />
      <Title>{title}</Title>
      <OrnamentBottom />
    </Wrapper>
  );
};

export default LuxurySectionHeader;

const Wrapper = styled.div`
  text-align: center;
  padding: 4rem 1rem 3rem;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 1rem 0;
  color: #7b1e1e; /* deep luxury maroon — change to brand color */
`;

const OrnamentTop = styled.div`
  width: 160px;
  height: 20px;
  margin: 0 auto 1rem;
  background: url("/ornaments/top.svg") center/contain no-repeat;
`;

const OrnamentBottom = styled.div`
  width: 160px;
  height: 20px;
  margin: 1rem auto 0;
  background: url("/ornaments/bottom.svg") center/contain no-repeat;
`;
