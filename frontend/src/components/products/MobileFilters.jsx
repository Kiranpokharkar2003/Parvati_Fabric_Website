import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $open }) => ($open ? "block" : "none")};
  z-index: 4000;
`;

const Drawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 1.5rem;
  transform: ${({ $open }) =>
    $open ? "translateY(0)" : "translateY(100%)"};
  transition: 0.35s ease;
  z-index: 5000;
  max-height: 85vh;
  overflow-y: auto;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const SectionLabel = styled.h4`
  margin-bottom: 0.8rem;
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Pill = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ $category }) => $category ? '#8B4513' : '#ddd'};
  background: ${({ $active, $category }) => 
    $active ? ($category ? '#8B4513' : '#111') : '#fff'};
  color: ${({ $active, $category }) => 
    $active ? '#fff' : ($category ? '#8B4513' : '#111')};
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Btn = styled.button`
  flex: 1;
  padding: 0.8rem;
  border-radius: 999px;
  border: none;
  background: ${({ $primary }) => ($primary ? "#111" : "#eee")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#111")};
  cursor: pointer;
`;

const MobileFilters = ({
  open,
  setOpen,
  tags,
  activeTag,
  setActiveTag,
  sort,
  setSort,
  clearFilters,
}) => {
  const navigate = useNavigate();
  const categories = ['sarees', 'lehengas', 'kurtis'];
  const allFilters = [...categories, ...tags, 'newest', 'popular'];
  
  // Dispatch filter toggle events
  useEffect(() => {
    const event = new CustomEvent('filterToggle', {
      detail: { isOpen: open }
    });
    window.dispatchEvent(event);
  }, [open]);
  
  const handleFilterClick = (filter) => {
    if (categories.includes(filter)) {
      navigate(`/products/${filter}`);
      setOpen(false);
    } else if (filter === 'newest') {
      setSort('new');
      setActiveTag('');
    } else if (filter === 'popular') {
      setSort('popular');
      setActiveTag('');
    } else {
      setActiveTag(filter === activeTag ? '' : filter);
    }
  };
  
  const isActive = (filter) => {
    if (filter === 'newest') return sort === 'new';
    if (filter === 'popular') return sort === 'popular';
    if (categories.includes(filter)) return window.location.pathname.includes(filter);
    return filter === activeTag;
  };

  const handleClear = () => {
    setActiveTag('');
    setSort('new');
    clearFilters();
  };

  return (
    <>
      <Overlay $open={open} onClick={() => setOpen(false)} />

      <Drawer $open={open}>
        <Title>Filters & Categories</Title>

        <Section>
          <SectionLabel>Categories</SectionLabel>
          <Pills>
            {categories.map((category) => (
              <Pill
                key={category}
                $active={isActive(category)}
                $category
                onClick={() => handleFilterClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Pill>
            ))}
          </Pills>
        </Section>

        <Section>
          <SectionLabel>Filters</SectionLabel>
          <Pills>
            {[...tags, 'newest', 'popular'].map((filter) => (
              <Pill
                key={filter}
                $active={isActive(filter)}
                onClick={() => handleFilterClick(filter)}
              >
                {filter === 'newest' ? 'Newest' : filter === 'popular' ? 'Popular' : filter}
              </Pill>
            ))}
          </Pills>
        </Section>

        <Actions>
          <Btn onClick={handleClear}>Reset</Btn>
          <Btn $primary onClick={() => setOpen(false)}>
            Apply
          </Btn>
        </Actions>
      </Drawer>
    </>
  );
};

export default MobileFilters;