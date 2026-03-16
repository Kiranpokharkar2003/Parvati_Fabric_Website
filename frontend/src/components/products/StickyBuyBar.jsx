import styled from "styled-components";

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  inset-inline: 0;
  background: white;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
  z-index: 3000;
`;

const StickyBuyBar = ({ onAdd, onWishlist }) => {
  return (
    <Bar>
      <button onClick={onWishlist}>♡ Wishlist</button>
      <button onClick={onAdd}>Add to Cart</button>
    </Bar>
  );
};

export default StickyBuyBar;
