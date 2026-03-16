import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const stats = [
  { value: 500, suffix: "+", label: "Premium Products" },
  { value: 42, suffix: "+", label: "Years Experience" },
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 100, suffix: "%", label: "Quality Assured" }
];

const AnimatedStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            let start = 0;
            const duration = 2000;
            const increment = stat.value / (duration / 16);
            const timer = setInterval(() => {
              start += increment;
              if (start >= stat.value) {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = stat.value;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.ceil(start);
                  return newCounts;
                });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <Section ref={ref}>
      <Grid>
        {stats.map((stat, i) => (
          <StatCard key={i}>
            <Value>
              {counts[i].toLocaleString()}{stat.suffix}
            </Value>
            <Label>{stat.label}</Label>
          </StatCard>
        ))}
      </Grid>
    </Section>
  );
};

export default AnimatedStats;

const Section = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa, #fff);
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Value = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #a47148, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;
