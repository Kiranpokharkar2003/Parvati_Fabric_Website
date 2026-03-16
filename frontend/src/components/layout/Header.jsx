import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import Container from "../common/Container";
import useInquiry from "../../hooks/useInquiry";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const inquiry = useInquiry();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const inquiryCount = inquiry?.inquiryItems?.length || 0;

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Logo to="/">
            <img src="/images/banners/logo.png" alt="Parvati Fabrics" />
            <span>Parvati Fabrics</span>
          </Logo>

          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search sarees, fabrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <FiSearch />
            </SearchButton>
          </SearchForm>

          <Nav className={mobileMenuOpen ? "open" : ""}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </Nav>

          <Actions>
            <InquiryButton onClick={() => navigate("/inquiry")}>
              <FiShoppingBag />
              {inquiryCount > 0 && <Badge>{inquiryCount}</Badge>}
              <span>Inquiry</span>
            </InquiryButton>

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </MobileMenuButton>
          </Actions>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2b2b2b;
  font-weight: 600;
  font-size: 1.1rem;

  img {
    height: 40px;
    width: auto;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex: 1;
  max-width: 400px;
  position: relative;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.7rem 1rem;
  border: 2px solid #e5e5e5;
  border-radius: 25px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #a47148;
  }

  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #a47148;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #8b5a3c;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #2b2b2b;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #a47148;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #a47148;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InquiryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #a47148;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background: #8b5a3c;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
    padding: 0.6rem;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e63946;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2b2b2b;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;