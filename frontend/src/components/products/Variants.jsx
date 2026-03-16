import styled from "styled-components";
import { HoverButton } from "../common/MicroAnimations";

const Wrap = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Variant = styled(HoverButton)`
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  border: 2px solid ${({ active }) => (active ? "#a47148" : "#e0e0e0")};
  background: ${({ active }) => (active ? "#a47148" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(164, 113, 72, 0.3);
  }
`;

const Variants = ({ variants, selected, onChange }) => {
  return (
    <Wrap>
      {variants.map((v) => (
        <Variant
          key={v}
          active={selected === v}
          onClick={() => onChange(v)}
        >
          {v}
        </Variant>
      ))}
    </Wrap>
  );
};

export default Variants;
