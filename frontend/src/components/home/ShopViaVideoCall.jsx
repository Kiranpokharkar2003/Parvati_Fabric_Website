import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { respond } from "../../styles/mixins";
import Container from "../common/Container";
import { toast } from 'react-toastify';
import productsData from "../../data/products";

const ShopViaVideoCall = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const consultationImages = [
    "/images/showcase_products/3d1.png",
    "/images/showcase_products/video-consultation-2.png"
  ];

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    language: "English",
    otherLanguage: "",
    products: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = () => {
    if (!form.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (!form.city.trim()) {
      toast.error('Please enter your city');
      return;
    }
    if (!form.products.trim()) {
      toast.error('Please select products');
      return;
    }
    if (!form.amount) {
      toast.error('Please select budget range');
      return;
    }

    const selectedLanguage = form.language === "Other" ? form.otherLanguage : form.language;
    const text = `
Video Consultation Request:

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏙 City: ${form.city}
🗣 Language: ${selectedLanguage}
🧵 Products: ${form.products}
💰 Budget: ${form.amount}
    `;
    const url = `https://wa.me/919265282488?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setShowModal(false);
    setImageIndex((prev) => (prev + 1) % consultationImages.length);
    setForm({ name: "", phone: "", city: "", language: "English", otherLanguage: "", products: "", amount: "" });
    toast.success('Consultation request sent!');
  };

  return (
    <>
      <Section>
        <Container>
          <Layout>
            <Content>
              {/* <ImageSection>
                <TrustImage src={consultationImages[imageIndex]} alt="Video Consultation" />
                <TrustBadge>
                  <BadgeIcon>✓</BadgeIcon>
                  <BadgeText>Verified Consultants</BadgeText>
                </TrustBadge>
              </ImageSection> */}
              <HeaderWrapper>
                <DecorativeLine />
                <Subtitle>Virtual Shopping</Subtitle>
                <Title>Shop via Video Call</Title>
                <Description>
                  Select fabrics and designs confidently through a live video call.
                  Our team showcases textures, colors, and drapes in real time.
                </Description>
              </HeaderWrapper>
              <CTA onClick={() => setShowModal(true)}>Start Video Consultation</CTA>
            </Content>

            <Mockups>
              <Laptop>
                <img src="/images/showcase_products/3d1.png" alt="Video Shopping on Laptop" />
              </Laptop>
              <Mobile>
                <img src="/images/showcase_products/mobile.jpg" alt="Video Shopping on Mobile" />
              </Mobile>
            </Mockups>
          </Layout>
        </Container>
      </Section>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalImage>
              <img src="/images/showcase_products/video-consultation-1.png" alt="Video Consultation" />
            </ModalImage>
            <ModalFormWrapper>
              <ModalFormHeader>
                <h2>Video Consultation</h2>
                <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
              </ModalFormHeader>
              <ModalFormContent>
              <input
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                maxLength="10"
                required
              />
              <input
                name="city"
                placeholder="City *"
                value={form.city}
                onChange={handleChange}
                required
              />
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">Tamil</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Urdu">Urdu</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Odia">Odia</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Assamese">Assamese</option>
                <option value="Maithili">Maithili</option>
                <option value="Santali">Santali</option>
                <option value="Kashmiri">Kashmiri</option>
                <option value="Nepali">Nepali</option>
                <option value="Konkani">Konkani</option>
                <option value="Manipuri">Manipuri</option>
                <option value="Sindhi">Sindhi</option>
                <option value="Bodo">Bodo</option>
                <option value="Other">Other (Please specify)</option>
              </select>
              {form.language === "Other" && (
                <input
                  name="otherLanguage"
                  placeholder="Please specify your language *"
                  value={form.otherLanguage}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                name="products"
                placeholder="Products Interested In *"
                value={form.products}
                onChange={handleChange}
                required
              />
              <select
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
              >
                <option value="">Select Budget Range *</option>
                <option value="20k-50k">₹20,000 - ₹50,000</option>
                <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                <option value="1L-2L">₹1,00,000 - ₹2,00,000</option>
                <option value="2L-3L">₹2,00,000 - ₹3,00,000</option>
                <option value="3L-5L">₹3,00,000 - ₹5,00,000</option>
                <option value="5L+">Above ₹5,00,000</option>
              </select>
              </ModalFormContent>
              <ModalFormActions>
                <CancelBtn onClick={() => setShowModal(false)}>Cancel</CancelBtn>
                <SubmitBtn onClick={sendWhatsApp}>Send on WhatsApp</SubmitBtn>
              </ModalFormActions>
            </ModalFormWrapper>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default ShopViaVideoCall;

/* ===================== STYLES ===================== */

const Section = styled.section`
  padding: 2rem 0;
  background: radial-gradient(circle at top, #faf8f5, #f5f2ed);
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 3rem;
  align-items: center;

  ${respond("tablet")} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

/* ===================== CONTENT ===================== */

const Content = styled.div`
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
  }
`;

const ImageSection = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const TrustImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(164, 113, 72, 0.2);
  
  @media (max-width: 768px) {
    height: 280px;
  }
`;

const TrustBadge = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: white;
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const BadgeIcon = styled.span`
  background: #25d366;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;

const BadgeText = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const HeaderWrapper = styled.div`
  margin-bottom: 1rem;
`;

const DecorativeLine = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4af37, transparent);
  margin-bottom: 0.6rem;
  
  @media (max-width: 768px) {
    margin: 0 auto 0.6rem;
  }
`;

const Subtitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  color: #a47148;
  font-size: 0.95rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.8rem;
  line-height: 1.2;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
    text-align: center;
  }
`;

const Description = styled.p`
  font-family: 'Lora', serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    text-align: center;
  }
`;

const CTA = styled.button`
  background: linear-gradient(135deg, #a47148, #d4af37);
  color: white;
  border: none;
  padding: 0.85rem 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(164, 113, 72, 0.3);
  border-radius: 0;

  &:hover {
    background: linear-gradient(135deg, #8b5d3c, #a47148);
    box-shadow: 0 8px 20px rgba(164, 113, 72, 0.4);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 2rem;
    font-size: 0.95rem;
    display: block;
    margin: 0 auto;
  }
`;


/* ===================== MOCKUPS ===================== */

const Mockups = styled.div`
  position: relative;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const Laptop = styled.div`
  background: #000000;
  padding: 12px;
  border-radius: 0;
  box-shadow: 0 15px 40px rgba(164, 113, 72, 0.15);
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(164, 113, 72, 0.2);
  }

  img {
    width: 100%;
    display: block;
  }
  
  @media (max-width: 768px) {
    padding: 8px;
    max-width: 280px;
  }
`;

const Mobile = styled.div`
  position: absolute;
  right: -30px;
  bottom: -25px;
  width: 150px;
  background: #000000;
  padding: 8px;
  border-radius: 0;
  box-shadow: 0 12px 30px rgba(164, 113, 72, 0.2);
  border: 1px solid rgba(164, 113, 72, 0.1);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(164, 113, 72, 0.25);
  }

  img {
    width: 100%;
    display: block;
  }

  ${respond("tablet")} {
    display: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3600;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #fff;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  max-height: 90vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 95vw;
    max-height: 95vh;
  }
`;

const ModalImage = styled.div`
  background: linear-gradient(135deg, #a47148, #d4af37);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    min-height: 20px;
  }
`;

const ModalFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  
  @media (max-width: 768px) {
    max-height: 95vh;
  }
`;

const ModalFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;

  h2 {
    margin: 0;
    color: #8B4513;
    font-size: 1.3rem;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const ModalFormContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  touch-action: manipulation;
  
  @media (max-width: 768px) {
    padding: 1rem;
    max-height: calc(95vh - 180px);
  }

  input,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 0.9rem;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #8B4513;
      box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
    }
  }

  select {
    background: white;
    cursor: pointer;
  }
`;

const ModalFormActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.8rem;
  }
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 0.9rem;
  border-radius: 10px;
  border: 2px solid #ddd;
  background: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: #f5f5f5;
    border-color: #999;
  }
`;

const SubmitBtn = styled.button`
  flex: 1;
  padding: 0.9rem;
  border-radius: 10px;
  border: none;
  background: #25d366;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: #1da851;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }
`;
