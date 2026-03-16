import React, { useState } from "react";
import styled from "styled-components";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import Container from "../components/common/Container";
import Breadcrumb from "../components/common/Breadcrumb";

const Contact = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" }
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <>
      <ContactPoster>
        <PosterImage src="/images/showcase_products/contact-poster.png" alt="Contact Us" />
      </ContactPoster>
      
      <Breadcrumb items={breadcrumbItems} />
      <MobileSpacer />

      <MainSection>
        <Container>
          <HeaderWrapper>
            <Subtitle>We're Here to Help</Subtitle>
            <MainTitle>Get In Touch With Us</MainTitle>
            <Description>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</Description>
          </HeaderWrapper>

          <ContentWrapper>
            <InfoSection>
              <InfoCard>
                <IconWrapper>
                  <FiMapPin />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Visit Our Showroom</InfoLabel>
                  <InfoText>Ring Road, Surat</InfoText>
                  <InfoText>Gujarat, India - 395002</InfoText>
                </InfoContent>
              </InfoCard>

              <InfoCard>
                <IconWrapper>
                  <FiPhone />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Call Us</InfoLabel>
                  <InfoText>+91 92652 82488</InfoText>
                  <InfoText>Wholesale Inquiries</InfoText>
                </InfoContent>
              </InfoCard>

              <InfoCard>
                <IconWrapper>
                  <FiMail />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Email Us</InfoLabel>
                  <InfoText>info@parvatifabrics.com</InfoText>
                  <InfoText>sales@parvatifabrics.com</InfoText>
                </InfoContent>
              </InfoCard>

              <InfoCard>
                <IconWrapper>
                  <FiClock />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Working Hours</InfoLabel>
                  <InfoText>Monday - Friday: 9:00 AM - 7:00 PM</InfoText>
                  <InfoText>Saturday: 10:00 AM - 6:00 PM</InfoText>
                  <InfoText>Sunday: Closed</InfoText>
                </InfoContent>
              </InfoCard>
            </InfoSection>

            <FormSection>
              <FormCard>
                <FormHeader>
                  <FormTitle>Send Us a Message</FormTitle>
                  <FormSubtitle>Fill out the form below and we'll get back to you shortly</FormSubtitle>
                </FormHeader>

                <ContactForm onSubmit={handleSubmit}>
                  <FormRow>
                    <FormGroup>
                      <Label>Full Name *</Label>
                      <Input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Phone Number *</Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Subject *</Label>
                      <Input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Inquiry about products"
                        required
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormGroup>
                    <Label>Your Message *</Label>
                    <TextArea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="6"
                      required
                    />
                  </FormGroup>
                  
                  <SubmitButton type="submit">
                    Send Message
                    <ButtonIcon>→</ButtonIcon>
                  </SubmitButton>
                </ContactForm>
              </FormCard>
            </FormSection>
          </ContentWrapper>

          <MapSection>
            <MapHeader>
              <MapTitle>Locate Us</MapTitle>
              <MapDescription>Visit our showroom to explore our exclusive collection</MapDescription>
            </MapHeader>
            <MapContainer>
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.807354988732!2d72.83704520997527!3d21.19981048180197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ef141edb227%3A0xf0fcd27767dd6067!2sParvati%20Fabrics%20Ltd.!5e0!3m2!1sen!2sin!4v1770976355493!5m2!1sen!2sin"
                loading="lazy"
              />
            </MapContainer>
          </MapSection>
        </Container>
      </MainSection>
    </>
  );
};

export default Contact;

const ContactPoster = styled.section`
  width: 100%;
  height: 0;
  padding-bottom: 23.44%; /* LinkedIn banner ratio: 1280x300 = 23.44% */
  overflow: hidden;
  position: relative;
  margin-top: calc(0px + var(--banner-height, 0px));
  
  @media (max-width: 1200px) {
    padding-bottom: 28%;
  }
  
  @media (max-width: 768px) {
    padding-bottom: 40%;
    margin-top: calc(69px + var(--banner-height, 0px));
  }
  
  @media (max-width: 480px) {
    padding-bottom: 50%;
  }
`;

const PosterImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const MobileSpacer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    height: 60px;
  }
`;

const MainSection = styled.section`
  padding: 4rem 0;
  background: #ffffff;
  
  @media (max-width: 768px) {
    padding: 2.5rem 0;
  }
`;

const HeaderWrapper = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.primary.maroon};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MainTitle = styled.h1`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.neutral.medium};
  font-size: 1rem;
  line-height: 1.7;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  gap: 1.5rem;
  transition: ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.gradients.gold};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral.dark};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.neutral.medium};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const FormSection = styled.div``;

const FormCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.neutral.dark};
  margin-bottom: 0.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral.medium};
  font-size: 0.95rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.neutral.dark};
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.9rem 1.2rem;
  border: 2px solid #e5e5e5;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.95rem;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.gold};
    box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

const TextArea = styled.textarea`
  padding: 0.9rem 1.2rem;
  border: 2px solid #e5e5e5;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.95rem;
  resize: vertical;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.gold};
    box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.light};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: ${({ theme }) => theme.transitions.smooth};
  box-shadow: ${({ theme }) => theme.shadows.button};
  
  &:hover {
    background: ${({ theme }) => theme.gradients.luxury};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const ButtonIcon = styled.span`
  transition: transform 0.3s ease;
  
  ${SubmitButton}:hover & {
    transform: translateX(5px);
  }
`;

const MapSection = styled.div``;

const MapHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const MapTitle = styled.h2`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.neutral.dark};
  margin-bottom: 0.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const MapDescription = styled.p`
  color: ${({ theme }) => theme.colors.neutral.medium};
  font-size: 1rem;
`;

const MapContainer = styled.div`
  height: 450px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  
  @media (max-width: 768px) {
    height: 350px;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
