import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiRotateCw, FiZoomIn, FiZoomOut } from "react-icons/fi";

const ProductViewer360 = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const sensitivity = 5;
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      const newIndex = (currentIndex + direction + images.length) % images.length;
      setCurrentIndex(newIndex);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 10;
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      const newIndex = (currentIndex + direction + images.length) % images.length;
      setCurrentIndex(newIndex);
      setStartX(e.touches[0].clientX);
    }
  };

  const autoRotate = () => {
    setIsRotating(true);
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 200);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsRotating(false);
    }, 3000);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isDragging, startX, currentIndex]);

  return (
    <ViewerContainer ref={containerRef}>
      <ImageContainer
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <ProductImage
          src={images[currentIndex]}
          alt={`${productName} - View ${currentIndex + 1}`}
          style={{ transform: `scale(${zoomLevel})` }}
          draggable={false}
        />
        
        <ViewIndicator>
          {currentIndex + 1} / {images.length}
        </ViewIndicator>
      </ImageContainer>

      <Controls>
        <ControlButton onClick={autoRotate} disabled={isRotating}>
          <FiRotateCw />
          <span>{isRotating ? 'Rotating...' : '360° View'}</span>
        </ControlButton>
        
        <ZoomControls>
          <ZoomButton onClick={zoomOut} disabled={zoomLevel <= 1}>
            <FiZoomOut />
          </ZoomButton>
          <ZoomLevel>{Math.round(zoomLevel * 100)}%</ZoomLevel>
          <ZoomButton onClick={zoomIn} disabled={zoomLevel >= 3}>
            <FiZoomIn />
          </ZoomButton>
        </ZoomControls>
      </Controls>

      <Instructions>
        <p>Drag to rotate • Click 360° for auto rotation • Use zoom controls</p>
      </Instructions>
    </ViewerContainer>
  );
};

export default ProductViewer360;

const ViewerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  pointer-events: none;
`;

const ViewIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e5e5e5;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background: #a47148;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #8b5a3c;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
    padding: 0.7rem;
  }
`;

const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ZoomButton = styled.button`
  width: 35px;
  height: 35px;
  border: 2px solid #a47148;
  background: white;
  color: #a47148;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #a47148;
    color: white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const ZoomLevel = styled.span`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const Instructions = styled.div`
  padding: 0.8rem 1rem;
  background: #f8f9fa;
  text-align: center;

  p {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
  }
`;