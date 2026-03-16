import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const ImageWithSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton />}
      <Image
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        $loaded={loaded}
      />
    </>
  );
};

export default ImageWithSkeleton;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  z-index: 0;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;
