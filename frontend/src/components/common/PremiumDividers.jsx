import styled, { keyframes } from "styled-components";

/* ---------------- GOLD FOIL SHIMMER ---------------- */

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const GoldFoilDivider = styled.div`
  height: 3.5px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    #d4af37,
    #fff1b8,
    #d4af37,
    transparent
  );
  background-size: 200% 100%;
  animation: ${shimmer} 10s linear infinite;
  margin: 0rem 0;
`;

/* ---------------- SILK WAVE ---------------- */

export const SilkWaveDivider = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  margin: 5rem 0;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    left: -50%;
    top: -80%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.primary} 1px,
      transparent 2px
    );
    opacity: 0.15;
    transform: rotate(2deg);
  }
`;

/* ---------------- LUXURY FADE ---------------- */

export const LuxuryFadeDivider = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.04),
    transparent
  );
  margin: 5rem 0;
`;

/* ---------------- GLASSMORPHISM ---------------- */

export const GlassDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 5rem 0;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
`;

/* ---------------- ZARI MOTION BORDER ---------------- */

const zariMove = keyframes`
  from { background-position: 0 0; }
  to { background-position: 200px 0; }
`;

export const ZariDivider = styled.div`
  width: 100%;
  height: 18px;
  margin: 5rem 0;
  background: repeating-linear-gradient(
    90deg,
    #d4af37,
    #d4af37 8px,
    transparent 8px,
    transparent 16px
  );
  opacity: 0.3;
  animation: ${zariMove} 8s linear infinite;
`;

/* ---------------- LOGO-INSPIRED HALO ---------------- */

export const HaloDivider = styled.div`
  width: 100%;
  height: 90px;
  margin: 5rem 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 240px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: translate(-50%, -50%);
  }

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80px;
    height: 80px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.2;
  }
`;

/* ---------------- DARK / LIGHT AUTO ---------------- */

export const AdaptiveDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 5rem 0;
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)"
      : "linear-gradient(to right, transparent, rgba(0,0,0,0.2), transparent)"};
`;
