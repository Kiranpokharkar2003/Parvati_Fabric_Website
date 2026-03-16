import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const Btn = styled.button`
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
`;

const ShareButtons = ({ product }) => {
  const url = window.location.href;

  return (
    <Wrap>
      <Btn onClick={() => navigator.clipboard.writeText(url)}>Copy</Btn>
      <Btn
        onClick={() =>
          window.open(`https://wa.me/?text=${encodeURIComponent(url)}`)
        }
      >
        WhatsApp
      </Btn>
    </Wrap>
  );
};

export default ShareButtons;
