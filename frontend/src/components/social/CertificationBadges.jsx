import React from 'react';
import styled from 'styled-components';
import { FiShield, FiAward, FiCheck, FiStar } from 'react-icons/fi';

const BadgesContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: ${({ $type }) => {
    switch($type) {
      case 'quality': return 'linear-gradient(135deg, #22c55e, #16a34a)';
      case 'authentic': return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
      case 'certified': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'premium': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
      default: return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  }};
  color: white;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const CertificationSection = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 16px;
  margin: 2rem 0;
  text-align: center;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const CertCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }
`;

const CertIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const CertTitle = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const CertDesc = styled.p`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const TrustScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #a47148;
`;

const CertificationBadges = ({ showFull = false }) => {
  const badges = [
    { type: 'quality', icon: FiCheck, text: 'Quality Assured' },
    { type: 'authentic', icon: FiShield, text: '100% Authentic' },
    { type: 'certified', icon: FiAward, text: 'ISO Certified' },
    { type: 'premium', icon: FiStar, text: 'Premium Grade' }
  ];

  const certifications = [
    {
      icon: FiShield,
      color: '#22c55e',
      title: 'Quality Certification',
      description: 'All our sarees undergo rigorous quality checks and meet international standards.'
    },
    {
      icon: FiAward,
      color: '#3b82f6',
      title: 'Authenticity Guarantee',
      description: 'We guarantee 100% authentic handloom and silk sarees with proper documentation.'
    },
    {
      icon: FiCheck,
      color: '#f59e0b',
      title: 'ISO 9001:2015',
      description: 'Our manufacturing processes are ISO certified for quality management systems.'
    },
    {
      icon: FiStar,
      color: '#8b5cf6',
      title: 'Premium Fabric',
      description: 'Only the finest fabrics sourced directly from certified weavers and mills.'
    }
  ];

  if (!showFull) {
    return (
      <BadgesContainer>
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <Badge key={index} $type={badge.type}>
              <IconComponent />
              {badge.text}
            </Badge>
          );
        })}
      </BadgesContainer>
    );
  }

  return (
    <CertificationSection>
      <SectionTitle>Quality Certifications & Trust Badges</SectionTitle>
      
      <TrustScore>
        <FiStar fill="currentColor" />
        4.8/5 Trust Score
        <span style={{ fontSize: '0.8rem', color: '#666' }}>(Based on 1000+ reviews)</span>
      </TrustScore>

      <BadgesContainer style={{ justifyContent: 'center' }}>
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <Badge key={index} $type={badge.type}>
              <IconComponent />
              {badge.text}
            </Badge>
          );
        })}
      </BadgesContainer>

      <CertGrid>
        {certifications.map((cert, index) => {
          const IconComponent = cert.icon;
          return (
            <CertCard key={index}>
              <CertIcon $color={cert.color}>
                <IconComponent />
              </CertIcon>
              <CertTitle>{cert.title}</CertTitle>
              <CertDesc>{cert.description}</CertDesc>
            </CertCard>
          );
        })}
      </CertGrid>
    </CertificationSection>
  );
};

export default CertificationBadges;