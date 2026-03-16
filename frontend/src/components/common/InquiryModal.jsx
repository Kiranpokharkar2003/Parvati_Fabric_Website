import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const InquiryModal = ({ open, setOpen }) => {
  if (!open) return null;

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Inquiry sent successfully!");
    setOpen(false);
  };

  return (
    <Overlay>
      <Modal>
        <h3>Send Inquiry</h3>

        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone" required />
          <textarea placeholder="Message" rows="4" required />

          <button type="submit">Send</button>
        </form>

        <Close onClick={() => setOpen(false)}>×</Close>
      </Modal>
    </Overlay>
  );
};

export default InquiryModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  position: relative;

  h3 {
    margin-bottom: 1rem;
  }

  form {
    display: grid;
    gap: 0.8rem;
  }

  input, textarea {
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0.7rem;
    cursor: pointer;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
