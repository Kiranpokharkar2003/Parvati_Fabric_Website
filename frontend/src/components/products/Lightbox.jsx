import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: grid;
  place-items: center;
  z-index: 9999;
`;

const Box = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
`;

const Lightbox = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <img src={product.image} width="100%" />
        <h3>{product.name}</h3>
        <p>{product.category}</p>
      </Box>
    </Overlay>
  );
};

export default Lightbox;
