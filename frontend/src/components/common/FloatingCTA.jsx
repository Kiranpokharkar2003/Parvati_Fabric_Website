import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const WHATSAPP_NUMBER = "919265282488";
const PHONE_NUMBER = "+919265282488";
const EMAIL = "info@parvatifabrics.com";

const FloatingCTA = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Listen for filter events to hide CTA
  useEffect(() => {
    const handleFilterToggle = (event) => {
      setIsFilterOpen(event.detail?.isOpen || false);
    };

    window.addEventListener('filterToggle', handleFilterToggle);
    return () => window.removeEventListener('filterToggle', handleFilterToggle);
  }, []);

  // Hide when filters are open
  if (isFilterOpen) return null;
  return (
    <Wrapper>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Parvati%20Fabrics,%20I%20am%20interested%20in%20your%20collection`}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsApp>
          <FaWhatsapp />
        </WhatsApp>
      </a>

      <a href={`tel:${PHONE_NUMBER}`}>
        <Call>
          <FaPhoneAlt />
        </Call>
      </a>

      <a href={`mailto:${EMAIL}`}>
        <Email>
          <FaEnvelope />
        </Email>
      </a>
    </Wrapper>
  );
};

export default FloatingCTA;

/* ================= STYLES ================= */

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

const Wrapper = styled.div`
  position: fixed;
  left: 18px;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 9999;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ButtonBase = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  border-radius: 50px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  backdrop-filter: blur(8px);
  background-size: 200% auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  animation: ${float} 3s ease-in-out infinite;
  transition: all 0.35s ease;

  svg {
    font-size: 1.4rem;
  }

  &:hover {
    transform: translateX(6px) scale(1.05);
    animation: ${shimmer} 1.5s linear infinite;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 1rem;
  }
`;

const Label = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

const WhatsApp = styled(ButtonBase)`
  background-image: linear-gradient(120deg, #25d366, #1aa34a, #25d366);
`;

const Call = styled(ButtonBase)`
  background-image: linear-gradient(120deg, #111, #333, #111);
`;

const Email = styled(ButtonBase)`
  background-image: linear-gradient(120deg, #8b5e34, #b58b5a, #8b5e34);
`;
