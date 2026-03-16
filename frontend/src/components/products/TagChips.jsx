import styled from "styled-components";

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Chip = styled.div`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #f4f4f4;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #e8e8e8;
  }
`;

const TagChips = ({ tags, onSelect }) => {
  return (
    <Chips>
      {tags.map((tag, i) => (
        <Chip key={i} onClick={() => onSelect(tag)}>
          #{tag}
        </Chip>
      ))}
    </Chips>
  );
};

export default TagChips;
