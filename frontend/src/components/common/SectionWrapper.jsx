import styled from "styled-components";

const SectionWrapper = styled.section`
  padding: 5rem 1.5rem;

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.2rem;
  }
`;

export default SectionWrapper;
