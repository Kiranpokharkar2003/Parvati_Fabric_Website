import styled from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

const ProductWhatsApp = ({ productName }) => {
  return (
    <Button
      href={`https://wa.me/919000000000?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(
        productName
      )}`}
      target="_blank"
    >
      <FaWhatsapp /> Enquire on WhatsApp
    </Button>
  );
};

export default ProductWhatsApp;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #25d366, #1ebc59);
  color: white;
  padding: 0.9rem 1.6rem;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;
