import { useEffect, useState } from "react";
import styled from "styled-components";

const Btn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 0.6rem 0.9rem;
  border-radius: 50%;
  border: none;
  background: black;
  color: white;
  cursor: pointer;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  transition: 0.3s;
`;

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Btn show={show} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      ↑
    </Btn>
  );
};

export default ScrollTop;
