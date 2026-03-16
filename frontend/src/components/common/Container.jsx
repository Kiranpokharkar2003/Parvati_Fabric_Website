import styled from "styled-components";
import { respond } from "../../styles/mixins";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
  
  ${respond("tablet")} {
    padding: 0 0.75rem;
  }
  
  ${respond("mobile")} {
    padding: 0 0.5rem;
  }
`;

export default Container;
