import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiShoppingBag } from "react-icons/fi";

const activities = [
  "Someone from Mumbai just inquired about Banarasi Silk",
  "A customer from Delhi added Kanjivaram to inquiry",
  "Someone from Bangalore is viewing Wedding Collection",
  "A buyer from Surat just inquired about Cotton Sarees",
  "Someone from Pune added Designer Lehenga to inquiry"
];

const RecentActivityFeed = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showActivity = () => {
      setVisible(true);
      setCurrent(Math.floor(Math.random() * activities.length));
      setTimeout(() => setVisible(false), 4000);
    };

    const interval = setInterval(showActivity, 12000);
    setTimeout(showActivity, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Notification $visible={visible}>
      <Icon>
        <FiShoppingBag />
      </Icon>
      <Text>{activities[current]}</Text>
    </Notification>
  );
};

export default RecentActivityFeed;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 10rem;
  left: 1.5rem;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 350px;
  z-index: 997;
  transform: translateX(${({ $visible }) => ($visible ? "0" : "-120%")});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: all 0.5s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a47148, #d4af37);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const Text = styled.div`
  font-size: 0.85rem;
  color: #333;
  line-height: 1.4;
`;
