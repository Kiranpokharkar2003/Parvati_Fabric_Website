import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import productsData from "../data/products";
import categories from "../data/categories";
import Container from "../components/common/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductGrid from "../components/products/ProductGrid";
import FiltersBar from "../components/products/FiltersBar";
import InfiniteLoader from "../components/products/InfiniteLoader";
import MobileFilters from "../components/products/MobileFilters";
import { Helmet } from "react-helmet-async";
import SortBar from "../components/products/SortBar";
import { Layout, Sidebar, Content } from "../components/products/ProductsLayout";
import styled from "styled-components";
import AnimatedCount from "../components/common/AnimatedCount";
import PageTransition from "../components/common/PageTransition";

const PER_PAGE = 12;

const Products = () => {
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filtered, setFiltered] = useState([]);
  const [visible, setVisible] = useState(PER_PAGE);
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("new");
  const [search, setSearch] = useState(
    () => localStorage.getItem("lastSearch") || ""
  );
  const [expandedGroups, setExpandedGroups] = useState({});
  const [visibleSubcategory, setVisibleSubcategory] = useState(null);

  const toggleGroup = (groupKey) => {
    setExpandedGroups(prev => {
      const isCurrentlyExpanded = prev[groupKey];
      if (isCurrentlyExpanded) {
        return { ...prev, [groupKey]: false };
      }
      return { [groupKey]: true };
    });
  };

  const allTags = Array.from(new Set(productsData.flatMap(p => p.tags)));

  // Get current category data
  const currentCategory = categories.find(cat => 
    cat.slug.toLowerCase() === category?.toLowerCase()
  );

  // Auto-expand the group containing current subcategory
  useEffect(() => {
    if (category && subcategory && currentCategory?.subcategories) {
      // Find which group contains the current subcategory
      const parentGroup = currentCategory.subcategories.find(sub => {
        if (sub.items) {
          return sub.items.some(item => {
            const itemSlug = typeof item === 'object' ? item.slug : item.toLowerCase().replace(/\s+/g, '-');
            return itemSlug === subcategory;
          });
        }
        return false;
      });
      
      if (parentGroup) {
        setExpandedGroups({ [`${category}-${parentGroup.slug}`]: true });
      }
    } else if (category && !subcategory && currentCategory?.subcategories) {
      // When viewing all products in category, expand group based on visible products
      if (visibleSubcategory) {
        const parentGroup = currentCategory.subcategories.find(sub => {
          if (sub.items) {
            return sub.items.some(item => {
              const itemSlug = typeof item === 'object' ? item.slug : item.toLowerCase().replace(/\s+/g, '-');
              return itemSlug === visibleSubcategory;
            });
          }
          return false;
        });
        
        if (parentGroup) {
          setExpandedGroups({ [`${category}-${parentGroup.slug}`]: true });
        }
      } else {
        // Default to first group
        const firstGroup = currentCategory.subcategories.find(sub => sub.items);
        if (firstGroup) {
          setExpandedGroups({ [`${category}-${firstGroup.slug}`]: true });
        }
      }
    }
  }, [category, subcategory, currentCategory, visibleSubcategory]);

  // Detect visible subcategory while scrolling (only when no specific subcategory is selected)
  useEffect(() => {
    if (!subcategory && category && filtered.length > 0) {
      const handleScroll = () => {
        const productCards = document.querySelectorAll('[data-product-subcategory]');
        let mostVisibleSubcat = null;
        let maxVisibility = 0;

        productCards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const visibility = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisibleSubcat = card.getAttribute('data-product-subcategory');
          }
        });

        if (mostVisibleSubcat && mostVisibleSubcat !== visibleSubcategory) {
          setVisibleSubcategory(mostVisibleSubcat);
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [subcategory, category, filtered, visibleSubcategory]);

  // Get subcategories for current category
  const subcategories = useMemo(() => {
    if (!category) return [];
    return [...new Set(productsData
      .filter(p => p.category.toLowerCase() === category.toLowerCase())
      .map(p => p.subcategory)
      .filter(Boolean))];
  }, [category]);

  useEffect(() => {
    let result = [...productsData];

    if (category) {
      result = result.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (subcategory) {
      result = result.filter(
        p => p.subcategory.toLowerCase() === subcategory.toLowerCase()
      );
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s) ||
          p.tags?.some(tag => tag.toLowerCase().includes(s)) ||
          p.category?.toLowerCase().includes(s) ||
          p.subcategory?.toLowerCase().includes(s) ||
          p.regionalStyle?.toLowerCase().includes(s) ||
          p.occasion?.some(occ => occ.toLowerCase().includes(s))
      );
    }

    if (activeTag) {
      result = result.filter(p => p.tags.includes(activeTag));
      setSearchParams({ tag: activeTag });
    } else {
      setSearchParams({});
    }

    if (sort === "popular") {
      result.sort((a, b) => b.popularity - a.popularity);
    }

    setFiltered(result);
    setVisible(PER_PAGE);
  }, [category, subcategory, search, activeTag, sort]);

  const pageTitle = subcategory 
    ? `${subcategory} - ${currentCategory?.label || category}` 
    : currentCategory?.label || "All Products";

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" }
  ];
  
  if (category) {
    breadcrumbItems.push({ 
      label: currentCategory?.label || category, 
      link: `/products/${category}` 
    });
  }
  
  if (subcategory) {
    breadcrumbItems.push({ label: subcategory });
  }

  return (
    <PageTransition>
      <Breadcrumb items={breadcrumbItems} />

      <Helmet>
        <title>{pageTitle} | Parvati Fabrics</title>
        <meta name="description" content={`Browse ${pageTitle.toLowerCase()} collection`} />
      </Helmet>

      <Container>
        <PageHeader>
          <h1>{pageTitle}</h1>
          <p><AnimatedCount value={filtered.length} /> products found</p>
        </PageHeader>
        {/* <FiltersBar
          onSearch={setSearch}
          tags={allTags.slice(0, 6)}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          sort={sort}
          setSort={setSort}
          openMobileFilters={() => setMobileOpen(true)}
        /> */}

        {/* <SortBar count={filtered.length} /> */}

        <Layout>
          <Sidebar>
            <CategorySidebar>
              <h3>Categories</h3>
              {categories.map(cat => (
                <CategoryItem key={cat.slug}>
                  <CategoryLink 
                    to={`/products/${cat.slug}`}
                    className={category === cat.slug ? 'active' : ''}
                  >
                    {cat.label}
                  </CategoryLink>
                  
                  {category === cat.slug && cat.subcategories && (
                    <SubcategoryList>
                      {cat.subcategories.map(sub => {
                        // Check if it's a nested object (like Silk, Cotton) or simple string
                        if (typeof sub === 'object' && sub.items) {
                          const groupKey = `${cat.slug}-${sub.slug}`;
                          return (
                            <div key={sub.slug}>
                              <GroupHeader onClick={() => toggleGroup(groupKey)}>
                                {sub.label}
                              </GroupHeader>
                              {expandedGroups[groupKey] && (
                                <GroupItems>
                                  {sub.items.map(item => {
                                    const itemSlug = typeof item === 'object' ? item.slug : item.toLowerCase().replace(/\s+/g, '-');
                                    const itemLabel = typeof item === 'object' ? item.label : item;
                                    const isActive = subcategory === itemSlug || (!subcategory && visibleSubcategory === itemSlug);
                                    return (
                                      <SubcategoryLink
                                        key={itemSlug}
                                        to={`/products/${cat.slug}/${itemSlug}`}
                                        className={isActive ? 'active' : ''}
                                      >
                                        {itemLabel}
                                      </SubcategoryLink>
                                    );
                                  })}
                                </GroupItems>
                              )}
                            </div>
                          );
                        } else {
                          // Simple subcategory (Lehengas, Kurtis)
                          const subSlug = (sub.slug || sub).toLowerCase().replace(/\s+/g, '-');
                          const isActive = subcategory === subSlug || (!subcategory && visibleSubcategory === subSlug);
                          return (
                            <SubcategoryLink
                              key={sub.slug || sub}
                              to={`/products/${cat.slug}/${subSlug}`}
                              className={isActive ? 'active' : ''}
                            >
                              {sub.label || sub}
                            </SubcategoryLink>
                          );
                        }
                      })}
                    </SubcategoryList>
                  )}
                </CategoryItem>
              ))}
            </CategorySidebar>
          </Sidebar>

          <Content>
            {filtered.length === 0 ? (
              <ComingSoonContainer>
                <ComingSoonIcon>🏪</ComingSoonIcon>
                <ComingSoonTitle>Curating Excellence</ComingSoonTitle>
                <ComingSoonText>
                  Our artisans are carefully selecting premium {subcategory || category} pieces to add to this exclusive collection.
                  <br />
                  Each product is handpicked to meet our standards of quality and elegance.
                </ComingSoonText>
                <ComingSoonNote>New arrivals coming soon</ComingSoonNote>
              </ComingSoonContainer>
            ) : (
              <>
                <ProductGrid products={filtered.slice(0, visible)} />
                {visible < filtered.length && (
                  <InfiniteLoader loadMore={() => setVisible(v => v + PER_PAGE)} />
                )}
              </>
            )}
          </Content>
        </Layout>
      </Container>

      <MobileFilters
        open={mobileOpen}
        setOpen={setMobileOpen}
        tags={allTags.slice(0, 6)}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        sort={sort}
        setSort={setSort}
        clearFilters={() => {
          setSearch("");
          setActiveTag("");
          setSort("new");
          setSearchParams({});
        }}
      />
    </PageTransition>
  );
};

export default Products;

// const Breadcrumb = styled.div`
//   font-size: 0.9rem;
//   color: #666;
//   margin-bottom: 1rem;
  
//   a {
//     color: #333;
//     text-decoration: none;
    
//     &:hover {
//       color: #ee9343;
//     }
//   }
  
//   span {
//     color: #999;
//   }
// `;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    h1 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`;

const CategorySidebar = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  @media (max-width: 1024px) {
    padding: 1rem;
    
    h3 {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryItem = styled.div`
  margin-bottom: 1rem;
`;

const CategoryLink = styled(Link)`
  display: block;
  padding: 0.7rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    background: #ee9343;
    color: white;
  }
`;

const SubcategoryList = styled.div`
  margin-top: 0.5rem;
  padding-left: 1rem;
`;

const SubcategoryLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: #666;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    background: #e9ecef;
    color: #ee9343;
  }
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #555;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f0f0;
    color: #333;
  }
  
  span {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const GroupItems = styled.div`
  padding-left: 1rem;
  margin-top: 0.3rem;
`;

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #faf8f5 0%, #ffffff 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(164, 113, 72, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ComingSoonIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '✨';
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 2rem;
    animation: sparkle 1.5s ease-in-out infinite;
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

const ComingSoonTitle = styled.h2`
  font-size: 3rem;
  color: #8b5a3c;
  margin-bottom: 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 1rem auto 0;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ComingSoonText = styled.p`
  font-size: 1.15rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 550px;
  font-family: 'Lora', serif;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ComingSoonNote = styled.div`
  font-size: 0.95rem;
  color: #a47148;
  font-style: italic;
  padding: 1rem 2rem;
  background: rgba(212, 175, 55, 0.08);
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '🔔';
    font-size: 1.1rem;
  }
`;