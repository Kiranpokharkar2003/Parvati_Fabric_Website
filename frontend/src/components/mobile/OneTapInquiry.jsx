import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import './OneTapInquiry.css';

const OneTapInquiry = ({ product, className = '' }) => {
  const businessPhone = '+919876543210';
  const businessEmail = 'info@parcatifabric.com';

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${product.name} (ID: ${product.id}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${businessPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${businessPhone}`;
  };

  const handleEmail = () => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in the following product:\n\nProduct: ${product.name}\nID: ${product.id}\nCategory: ${product.category}\n\nPlease provide more details including pricing and availability.\n\nThank you!`;
    const emailUrl = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  return (
    <div className={`one-tap-inquiry ${className}`}>
      <button 
        className="inquiry-btn whatsapp-btn"
        onClick={handleWhatsApp}
        title="WhatsApp Inquiry"
      >
        <FaWhatsapp />
        <span>WhatsApp</span>
      </button>
      
      <button 
        className="inquiry-btn call-btn"
        onClick={handleCall}
        title="Call Now"
      >
        <FaPhone />
        <span>Call</span>
      </button>
      
      <button 
        className="inquiry-btn email-btn"
        onClick={handleEmail}
        title="Email Inquiry"
      >
        <FaEnvelope />
        <span>Email</span>
      </button>
    </div>
  );
};

export default OneTapInquiry;