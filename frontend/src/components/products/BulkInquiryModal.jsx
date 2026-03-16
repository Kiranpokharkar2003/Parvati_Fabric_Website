// BulkInquiryModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import useInquiry from "../../hooks/useInquiry";

const BulkInquiryModal = ({ open, setOpen }) => {
  const { inquiryItems, clearInquiry } = useInquiry();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = () => {
    if (inquiryItems.length === 0) return alert("No products selected!");

    let text = "Hello, I would like to inquire about the following sarees:\n\n";
    inquiryItems.forEach((p, index) => {
      text += `${index + 1}. ${p.name} (ID: ${p.id}) - Qty: ${p.qty}\n`;
    });

    text += `\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nMessage: ${form.message}`;

    const url = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setOpen(false);
    clearInquiry();
    setForm({ name: "", phone: "", city: "", message: "" });
  };

  return (
    <Overlay>
      <Modal>
        <h2>Bulk Inquiry</h2>

        <ProductList>
          {inquiryItems.map((item) => (
            <li key={item.id}>
              {item.name} (Qty: {item.qty})
            </li>
          ))}
        </ProductList>

        <Form>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Any notes or requirement?"
            value={form.message}
            onChange={handleChange}
          />
        </Form>

        <Actions>
          <Cancel onClick={() => setOpen(false)}>Cancel</Cancel>
          <Submit onClick={sendWhatsApp}>Send on WhatsApp</Submit>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default BulkInquiryModal;

/* ---------------- STYLES ---------------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
`;

const Modal = styled.div`
  background: #fff;
  width: 90%;
  max-width: 450px;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const ProductList = styled.ul`
  max-height: 150px;
  overflow-y: auto;
  padding-left: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #eee;
  border-radius: 12px;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.95rem;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  input, textarea {
    padding: 0.7rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    width: 100%;
  }

  textarea {
    resize: none;
    min-height: 80px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Cancel = styled.button`
  flex: 1;
  padding: 0.8rem;
  border-radius: 999px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
`;

const Submit = styled.button`
  flex: 1;
  padding: 0.8rem;
  border-radius: 999px;
  border: none;
  background: #25d366;
  color: #fff;
  cursor: pointer;
`;