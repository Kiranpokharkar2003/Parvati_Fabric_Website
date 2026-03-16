import React from "react";
import styled from "styled-components";
import { useCart } from "../../contexts/CartContext";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 9999;
`;

const Drawer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 360px;
  background: #fff;
  padding: 1.5rem;
  z-index: 10000;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CartDrawer = ({ onClose }) => {
  const { cart, removeFromCart, updateQty } = useCart();

  return (
    <>
      <Overlay onClick={onClose} />
      <Drawer>
        <h2>Your Cart</h2>

        {cart.map((item) => (
          <Item key={item.id}>
            <div>
              <p>{item.name}</p>
              <input
                type="number"
                value={item.qty}
                min="1"
                onChange={(e) =>
                  updateQty(item.id, parseInt(e.target.value))
                }
              />
            </div>
            <button onClick={() => removeFromCart(item.id)}>❌</button>
          </Item>
        ))}
      </Drawer>
    </>
  );
};

export default CartDrawer;
