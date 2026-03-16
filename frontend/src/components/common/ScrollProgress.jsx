import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.pageYOffset;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return <Bar $progress={progress} />;
};

export default ScrollProgress;

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, #a47148, #d4af37);
  z-index: 9999;
  transition: width 0.1s ease;
`;
