import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import Container from "../common/Container";
import { respond } from "../../styles/mixins";
import { useInquiry } from "../../contexts/InquiryContext";
import BulkInquiryCart from "../products/BulkInquiryCart";
import allProductsData from "../../data/products";
import categories from "../../data/categories";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { items, getTotalQuantity } = useInquiry();
  const cartRef = useRef(null);
  const searchRef = useRef(null);
  const totalQuantity = items.length;

  // Handle scroll to show/hide MenuBar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowMenuBar(false);
      } else {
        // Scrolling up
        setShowMenuBar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = allProductsData.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6);
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (product) => {
    navigate(`/products/${product.category}/${product.subcategory}`);
    setSearchQuery("");
    setShowSearchDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      const firstResult = searchResults[0];
      navigate(`/products/${firstResult.category}/${firstResult.subcategory}`);
      setSearchQuery("");
      setShowSearchDropdown(false);
    }
  };

  const toggleCategory = (slug) => {
    setExpandedCategory(expandedCategory === slug ? null : slug);
  };

  const handleMobileCartClick = () => {
    setMobileCartOpen(!mobileCartOpen);
  };

  // Click outside to close mobile cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileCartOpen && cartRef.current && !cartRef.current.contains(event.target)) {
        setMobileCartOpen(false);
      }
    };

    if (mobileCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileCartOpen]);

  // Listen for real-time updates
  useEffect(() => {
    const handleInquiryUpdate = () => {
      setForceUpdate(prev => prev + 1);
    };

    const handleItemAdded = () => {
      setAnimateBadge(true);
      setTimeout(() => setAnimateBadge(false), 600);
    };

    window.addEventListener('inquiryUpdate', handleInquiryUpdate);
    window.addEventListener('inquiryItemAdded', handleItemAdded);
    return () => {
      window.removeEventListener('inquiryUpdate', handleInquiryUpdate);
      window.removeEventListener('inquiryItemAdded', handleItemAdded);
    };
  }, []);

  return (
    <>
      <TopBar data-navbar>
        <Container>
          <TopRow>
            <Hamburger onClick={() => setMobileOpen(true)}>
              <FiMenu />
            </Hamburger>

            <Logo>
              <Link to="/">
                <img src="/images/banners/logo.png" alt="Parvati Fabrics" />
              </Link>
            </Logo>

            <SearchBox ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <FiSearch />
                <input 
                  placeholder="Search for products" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSearchDropdown(true)}
                />
              </form>
              {showSearchDropdown && searchResults.length > 0 && (
                <SearchDropdown>
                  {searchResults.map((product) => (
                    <SearchItem key={product.id} onClick={() => handleSearchSelect(product)}>
                      <SearchItemImage>
                        <img src={product.images[0]} alt={product.name} />
                      </SearchItemImage>
                      <SearchItemInfo>
                        <SearchItemName>{product.name}</SearchItemName>
                        <SearchItemCategory>
                          {product.category} › {product.subcategory}
                        </SearchItemCategory>
                      </SearchItemInfo>
                    </SearchItem>
                  ))}
                  {searchQuery.trim() && (
                    <ViewAllResults onClick={() => {
                      if (searchResults.length > 0) {
                        const firstResult = searchResults[0];
                        navigate(`/products/${firstResult.category}`);
                        setSearchQuery("");
                        setShowSearchDropdown(false);
                      }
                    }}>
                      View all results for "{searchQuery}"
                    </ViewAllResults>
                  )}
                </SearchDropdown>
              )}
            </SearchBox>

            <Icons>
              <PageLinks>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </PageLinks>
            </Icons>

            <MobileIcons>
              <MobileCartIcon onClick={handleMobileCartClick}>
                <FiShoppingBag />
                {totalQuantity > 0 && <CartBadge $animate={animateBadge}>{totalQuantity}</CartBadge>}
              </MobileCartIcon>
            </MobileIcons>
          </TopRow>
        </Container>
      </TopBar>

      {/* DESKTOP MENU */}
      <MenuBar $show={showMenuBar}>
        <Container>
          <Menu>
            {categories.map((item) => {
              const isActive = location.pathname.includes(`/products/${item.slug}`);
              return (
                <MenuItem
                  key={item.slug}
                  onMouseEnter={() => setActiveMenu(item.slug)}
                  onMouseLeave={() => setActiveMenu(null)}
                  $isActive={isActive}
                >
                  <Link to={`/products/${item.slug}`}>{item.label}</Link>

                {activeMenu === item.slug && (
                  <Dropdown $hasSub={item.slug === 'sarees'}>
                    {item.slug === 'sarees' ? (
                      <MegaMenu>
                        {item.subcategories.map((sub) => (
                          <MegaColumn key={sub.slug}>
                            <MegaTitle>
                              <Link 
                                to={`/products/${item.slug}/${sub.slug}`}
                                className={location.pathname.includes(`/${sub.slug}`) ? 'active' : ''}
                              >
                                {sub.label}
                              </Link>
                            </MegaTitle>
                            {sub.items && sub.items.map((subItem) => (
                              <Link 
                                key={subItem.slug} 
                                to={`/products/${item.slug}/${subItem.slug}`}
                                className={location.pathname.includes(`/${subItem.slug}`) ? 'active' : ''}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </MegaColumn>
                        ))}
                      </MegaMenu>
                    ) : (
                      item.subcategories.map((sub) => (
                        <Link 
                          key={sub.slug || sub} 
                          to={`/products/${item.slug}/${sub.slug || sub.toLowerCase()}`}
                          className={location.pathname.includes(`/${sub.slug || sub.toLowerCase()}`) ? 'active' : ''}
                        >
                          {sub.label || sub}
                        </Link>
                      ))
                    )}
                  </Dropdown>
                )}
              </MenuItem>
            );
            })}
          </Menu>
        </Container>
      </MenuBar>

      {/* MOBILE MENU */}
      {mobileOpen && <Overlay onClick={() => setMobileOpen(false)} />}
      <MobileMenu open={mobileOpen}>
        <MobileHeader>
          <img src="/images/banners/logo.png" alt="logo" />
          <FiX onClick={() => setMobileOpen(false)} />
        </MobileHeader>

        <MobileLinks>
          <div>
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          </div>
          <div>
            <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
          </div>
          <div>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
          {categories.map((item) => (
            <div key={item.slug}>
              <Link to={`/products/${item.slug}`} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
              <CategoryLink onClick={() => toggleCategory(item.slug)}>
                View {item.label} Subcategories
              </CategoryLink>
              {expandedCategory === item.slug && (
                <SubcategoryList>
                  {item.slug === 'sarees' ? (
                    item.subcategories.map((sub) => (
                      <div key={sub.slug}>
                        <SubLink
                          to={`/products/${item.slug}/${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          style={{ fontWeight: '600', background: '#e9ecef' }}
                        >
                          {sub.label}
                        </SubLink>
                        {sub.items && sub.items.map((subItem) => (
                          <SubLink
                            key={subItem.slug}
                            to={`/products/${item.slug}/${subItem.slug}`}
                            onClick={() => setMobileOpen(false)}
                            style={{ marginLeft: '1rem', fontSize: '0.85rem' }}
                          >
                            {subItem.label}
                          </SubLink>
                        ))}
                      </div>
                    ))
                  ) : (
                    item.subcategories.map((sub) => (
                      <SubLink
                        key={sub.slug || sub}
                        to={`/products/${item.slug}/${sub.slug || sub.toLowerCase()}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label || sub}
                      </SubLink>
                    ))
                  )}
                </SubcategoryList>
              )}
            </div>
          ))}
        </MobileLinks>
      </MobileMenu>
      {/* MOBILE CART */}
      {mobileCartOpen && (
        <>
          <MobileCartOverlay onClick={() => setMobileCartOpen(false)} />
          <div ref={cartRef}>
            <BulkInquiryCart 
              isOpen={mobileCartOpen} 
              onClose={() => setMobileCartOpen(false)} 
            />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

/* ================= STYLES ================= */

const TopBar = styled.header`
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: var(--banner-height, 0px);
  z-index: 3500;
  transition: all 0.3s ease;

  ${respond("tablet")} {
    position: fixed;
    width: 100vw;
    left: 0;
    right: 0;
    z-index: 3400;
  }
`;

const TopRow = styled.div`
  height: 78px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  
  ${respond("tablet")} {
    grid-template-columns: 1fr auto 1fr;
    padding: 0 0.75rem;
  }
`;

const Logo = styled.div`
  img {
    height: 60px;
  }
  
  ${respond("tablet")} {
    grid-column: 2;
    text-align: center;
    
    img {
      height: 60px;
    }
  }
`;

const SearchBox = styled.div`
  position: relative;
  
  form {
    display: flex;
    align-items: center;
    background: #f6f1ec;
    border-radius: 30px;
    padding: 0.6rem 1rem;
    gap: 0.6rem;
  }

  input {
    border: none;
    background: transparent;
    width: 100%;
    outline: none;
    font-size: 0.9rem;
  }

  svg {
    color: #999;
    flex-shrink: 0;
  }

  ${respond("tablet")} {
    display: none;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 4000;
  border: 1px solid #e5e5e5;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SearchItemImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f5f2ed;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SearchItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SearchItemName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchItemCategory = styled.div`
  font-size: 0.75rem;
  color: #999;
  text-transform: capitalize;
`;

const ViewAllResults = styled.div`
  padding: 0.8rem 1rem;
  text-align: center;
  color: #a47148;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-top: 1px solid #f5f5f5;
  transition: all 0.2s ease;
  
  &:hover {
    background: #faf8f5;
    color: #8b5d3c;
  }
`;

const PageLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-right: 1.5rem;
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ee9343;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 1.6rem;
  font-size: 1.2rem;

  ${respond("tablet")} {
    display: none;
  }
`;

const MobileIcons = styled.div`
  display: none;

  ${respond("tablet")} {
    display: flex;
    gap: 1.2rem;
    font-size: 1.3rem;
    grid-column: 3;
    justify-self: end;
    align-items: center;
  }
`;

const MobileCartIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(164, 113, 72, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const CartBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $animate }) => ($animate ? 'notificationPulse 0.6s ease' : 'pulse 2s infinite')};
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes notificationPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); background: #10b981; }
    100% { transform: scale(1); }
  }
`;

const MobileCartOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2400;
  
  ${respond("desktop")} {
    display: none;
  }
`;

const IconBadge = styled.div`
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    top: -6px;
    right: -8px;
    background: #ee9343;
    color: #fff;
    font-size: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
`;

const Hamburger = styled.div`
  display: none;

  ${respond("tablet")} {
    display: block;
    font-size: 1.6rem;
    cursor: pointer;
    grid-column: 1;
    justify-self: start;
  }
`;

const MenuBar = styled.nav`
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: calc(69px + var(--banner-height, 0px));
  z-index: 3400;
  transition: transform 0.3s ease, top 0.3s ease;
  transform: translateY(${({ $show }) => ($show ? '0' : '-100%')});

  ${respond("tablet")} {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  height: 50px;
  align-items: center;
`;

const MenuItem = styled.div`
  position: relative;

  > a {
    display: block;
    padding: 1rem 1.2rem;
    font-weight: 500;
    color: ${({ $isActive }) => ($isActive ? '#ee9343' : '#333')};
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      color: #ee9343;
    }
    
    ${({ $isActive }) => $isActive && `
      font-weight: 600;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 1.2rem;
        right: 1.2rem;
        height: 3px;
        background: linear-gradient(90deg, #ee9343, #d4af37);
        border-radius: 2px 2px 0 0;
      }
    `}
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: ${({ $hasSub }) => ($hasSub ? '-50%' : '0')};
  background: #fff;
  padding: ${({ $hasSub }) => ($hasSub ? '1.5rem' : '1rem 0')};
  border: 1px solid #e5e5e5;
  min-width: ${({ $hasSub }) => ($hasSub ? '600px' : '180px')};
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  > a {
    display: block;
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    color: #666;
    text-decoration: none;
    text-transform: capitalize;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background: #f8f9fa;
      color: #ee9343;
    }
    
    &.active {
      background: #fff5ed;
      color: #ee9343;
      font-weight: 600;
      border-left: 3px solid #ee9343;
      padding-left: calc(1.2rem - 3px);
    }
  }
`;

const MegaMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const MegaColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  a {
    display: block;
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
    color: #666;
    text-decoration: none;
    text-transform: capitalize;
    transition: all 0.2s ease;
    border-radius: 4px;
    position: relative;

    &:hover {
      background: #f8f9fa;
      color: #ee9343;
    }
    
    &.active {
      background: #fff5ed;
      color: #ee9343;
      font-weight: 600;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 60%;
        background: #ee9343;
        border-radius: 0 2px 2px 0;
      }
    }
  }
`;

const MegaTitle = styled.div`
  margin-bottom: 0.5rem;
  
  a {
    font-weight: 600;
    font-size: 0.95rem;
    color: #333;
    padding: 0.5rem 0.8rem;
    
    &:hover {
      background: #e9ecef;
      color: #ee9343;
    }
    
    &.active {
      background: #fff5ed;
      color: #ee9343;
      font-weight: 700;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 70%;
        background: linear-gradient(180deg, #ee9343, #d4af37);
        border-radius: 0 2px 2px 0;
      }
    }
  }
`;

/* ================= MOBILE ================= */

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  height: 100vh;
  background: #fff;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 3500;
  padding: 2rem;
  padding-top: calc(var(--banner-height, 0px) + 2rem);
  box-shadow: ${({ open }) => (open ? "-5px 0 15px rgba(0,0,0,0.1)" : "none")};
  overflow-y: auto;
`;const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3450;
`;


const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2rem;

  img {
    height: 90px;
  }

  svg {
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f0f0f0;
      color: #333;
    }
  }
`;

const MobileLinks = styled.div`
  margin-top: 1rem;
  
  > div {
    margin-bottom: 1rem;
    
    > a {
      display: block;
      padding: 1rem;
      font-size: 1rem;
      font-weight: 500;
      color: #333;
      background: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      transition: all 0.2s ease;
      text-decoration: none;
      
      &:hover {
        background: #e9ecef;
        color: #ee9343;
      }
    }
  }
`;

const CategoryLink = styled.div`
  display: block;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: #e9ecef;
    color: #ee9343;
  }
`;

const SubcategoryList = styled.div`
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const SubLink = styled(Link)`
  display: block;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  color: #666;
  background: #fff;
  border-radius: 4px;
  margin: 0.2rem 0;
  transition: all 0.2s ease;
  text-decoration: none;
  text-transform: capitalize;
  
  &:hover {
    background: #f8f9fa;
    color: #ee9343;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2500;
`;
