import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 110px;
  height: fit-content;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Content = styled.main`
  flex: 1;
  min-width: 0;
  padding-bottom: 4rem;
`;
