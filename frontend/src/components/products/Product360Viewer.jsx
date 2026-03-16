import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiRotateCw, FiMaximize2 } from 'react-icons/fi';

const ViewerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 14px;
  overflow: hidden;
  background: #fafafa;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease;
  transform: ${({ $zoom }) => `scale(${$zoom})`};
  transform-origin: ${({ $origin }) => $origin};
`;

const Controls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
`;

const ControlBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0,0,0,0.9);
    transform: scale(1.1);
  }
`;

const AngleIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const Product360Viewer = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState('center');
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const sensitivity = 3;
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const next = prev + direction;
        return next < 0 ? images.length - 1 : next >= images.length ? 0 : next;
      });
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomOrigin(`${x}% ${y}%`);
    setZoom(zoom === 1 ? 2 : 1);
  };

  const rotateProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX]);

  return (
    <ViewerContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleZoom}
    >
      <ProductImage
        src={images[currentIndex]}
        alt={`${productName} - View ${currentIndex + 1}`}
        $zoom={zoom}
        $origin={zoomOrigin}
        draggable={false}
      />
      
      <Controls>
        <ControlBtn onClick={rotateProduct} title="Rotate">
          <FiRotateCw />
        </ControlBtn>
        <ControlBtn onClick={handleZoom} title="Zoom">
          <FiMaximize2 />
        </ControlBtn>
      </Controls>
      
      <AngleIndicator>
        {currentIndex + 1} / {images.length}
      </AngleIndicator>
    </ViewerContainer>
  );
};

export default Product360Viewer;