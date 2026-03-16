import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  font-size: 14px;
  margin-bottom: 1rem;
  a {
    color: #555;
  }
`;

const Breadcrumbs = ({ category, subcategory, name }) => {
  return (
    <Wrap>
      <Link to="/">Home</Link> /{" "}
      <Link to={`/products/${category}`}>{category}</Link>
      {subcategory && <> / <Link to={`/products/${category}/${subcategory}`}>{subcategory}</Link></>}
      {" / "} {name}
    </Wrap>
  );
};

export default Breadcrumbs;
