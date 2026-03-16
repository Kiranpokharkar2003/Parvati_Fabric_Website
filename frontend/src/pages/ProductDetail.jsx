import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from 'react-toastify';
import productsData from "../data/products";
import Breadcrumb from "../components/common/Breadcrumb";
import SimilarProducts from "../components/products/SimilarProducts";
import { useInquiry } from "../contexts/InquiryContext";
import Product360Viewer from "../components/products/Product360Viewer";
import ColorVariantSwitcher from "../components/products/ColorVariantSwitcher";
import SimpleProductCard from "../components/products/SimpleProductCard";
import CertificationBadges from "../components/social/CertificationBadges";
import PageTransition from "../components/common/PageTransition";
import StickyMobileBar from "../components/products/StickyMobileBar";

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((p) => String(p.id) === String(id));
  const images = product?.images?.length ? product.images : [product?.image];
  const { addItem, removeItem, isInInquiry } = useInquiry();

  const [activeImage, setActiveImage] = useState(images[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const imgRef = useRef(null);

  // Utility function to shuffle array randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get all recommendations with no duplicates
  const getRecommendations = () => {
    const usedProductIds = new Set([product.id]); // Track used products
    
    // 1. Similar Products - Same category and subcategory
    const similarProducts = shuffleArray(
      productsData.filter(p => 
        p.id !== product.id && 
        p.category === product.category &&
        (product.subcategory ? p.subcategory === product.subcategory : true)
      )
    ).slice(0, 4);
    
    similarProducts.forEach(p => usedProductIds.add(p.id));
    
    // 2. Recommended Products - Same category first, then other categories
    let recommended = shuffleArray(
      productsData.filter(p => 
        !usedProductIds.has(p.id) && 
        p.category === product.category
      )
    ).slice(0, 4);
    
    // If less than 4, fill with other categories
    if (recommended.length < 4) {
      const otherCategories = shuffleArray(
        productsData.filter(p => 
          !usedProductIds.has(p.id) && 
          p.category !== product.category
        )
      ).slice(0, 4 - recommended.length);
      
      recommended = [...recommended, ...otherCategories];
    }
    
    recommended.forEach(p => usedProductIds.add(p.id));
    
    // 3. Trending Now - Newly added products
    const trendingProducts = shuffleArray(
      productsData.filter(p => 
        !usedProductIds.has(p.id) && 
        p.dateAdded
      )
    )
    .sort((a, b) => {
      const dateA = new Date(a.dateAdded || '2000-01-01');
      const dateB = new Date(b.dateAdded || '2000-01-01');
      return dateB - dateA; // Most recent first
    })
    .slice(0, 4);
    
    trendingProducts.forEach(p => usedProductIds.add(p.id));
    
    // 4. Perfect Complements - Top rated/reviewed products
    const perfectComplements = shuffleArray(
      productsData.filter(p => !usedProductIds.has(p.id))
    )
    .sort((a, b) => {
      const scoreA = (a.totalReviews || 0) * 10 + (a.avgRating || 0);
      const scoreB = (b.totalReviews || 0) * 10 + (b.avgRating || 0);
      return scoreB - scoreA;
    })
    .slice(0, 4);
    
    return {
      similar: similarProducts,
      recommended,
      trending: trendingProducts,
      complements: perfectComplements
    };
  };

  // Get recommendations once when component mounts or product changes
  const [recommendations, setRecommendations] = useState(() => getRecommendations());

  // Update recommendations when product changes
  React.useEffect(() => {
    setRecommendations(getRecommendations());
  }, [id]);

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (showModal || showGalleryModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showGalleryModal]);

  const handlePrevImage = () => {
    const newIndex = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImageIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  const handleThumbnailClick = (img, index) => {
    setActiveImage(img);
    setActiveImageIndex(index);
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    qty: 1,
    budget: "",
    message: "",
  });

  if (!product) return <NotFound>Product not found</NotFound>;

  const isAdded = isInInquiry(product.id);

  const handleInquiryToggle = () => {
    if (isAdded) {
      removeItem(product.id);
    } else {
      addItem(product);
      window.dispatchEvent(new CustomEvent('inquiryItemAdded'));
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: product.category, link: `/products/${product.category}` }
  ];
  
  if (product.subcategory) {
    breadcrumbItems.push({ 
      label: product.subcategory, 
      link: `/products/${product.category}/${product.subcategory}` 
    });
  }
  
  breadcrumbItems.push({ label: product.name });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendWhatsApp = () => {
    if (!form.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (!form.city.trim()) {
      toast.error('Please enter your city');
      return;
    }
    if (!form.budget) {
      toast.error('Please select a budget range');
      return;
    }
    
    const text = `
Wholesale Inquiry:

🧵 Product: ${product.name}
📂 Category: ${product.category}
🆔 Product ID: ${product.id}

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏙 City: ${form.city}
📦 Quantity: ${form.qty} pieces
💰 Budget: ${form.budget}

💬 Requirements: ${form.message || 'N/A'}
    `;
    const url = `https://wa.me/919265282488?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setShowModal(false);
    toast.success('Inquiry sent successfully!');
  };

  const handleDoubleClick = () => {
    if (window.innerWidth >= 768) {
      setZoomEnabled(!zoomEnabled);
      if (zoomEnabled) {
        resetZoom();
      }
    }
  };

  const handleImageClick = () => {
    if (window.innerWidth < 768) {
      setShowGalleryModal(true);
    }
  };

  const handleGalleryPrev = () => {
    const newIndex = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  const handleGalleryNext = () => {
    const newIndex = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImageIndex(newIndex);
    setActiveImage(images[newIndex]);
  };

  const handleZoom = (e) => {
    if (!zoomEnabled || window.innerWidth < 768) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    imgRef.current.style.transform = "scale(1.8)";
  };

  const resetZoom = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)";
      imgRef.current.style.transformOrigin = "center";
    }
  };

  return (
    <PageTransition>
      <Page>
        <Breadcrumb items={breadcrumbItems} />
      
      <Container>
        <Main>
          {/* GALLERY */}
          <Gallery>
            <MainImage 
              onDoubleClick={handleDoubleClick}
              onClick={handleImageClick}
              onMouseMove={handleZoom} 
              onMouseLeave={resetZoom}
              style={{ cursor: window.innerWidth >= 768 ? (zoomEnabled ? 'zoom-out' : 'zoom-in') : 'pointer' }}
            >
              <img ref={imgRef} src={activeImage} alt={product.name} />
              {images.length > 1 && (
                <>
                  <NavButton className="prev" onClick={handlePrevImage}>
                    ‹
                  </NavButton>
                  <NavButton className="next" onClick={handleNextImage}>
                    ›
                  </NavButton>
                </>
              )}
            </MainImage>

            <Thumbs>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className={activeImageIndex === i ? "active" : ""}
                  onClick={() => handleThumbnailClick(img, i)}
                />
              ))}
            </Thumbs>
          </Gallery>

          {/* INFO */}
          <Info>
            <h1>{product.name}</h1>
            <Category>{product.category}</Category>
            <Description>{product.description}</Description>

            <MetaGrid>
              <div>
                <strong>Fabric</strong>
                <span>{product.fabric || "Premium"}</span>
              </div>
              <div>
                <strong>Length</strong>
                <span>{product.length || "5.5 m"}</span>
              </div>
              <div>
                <strong>Blouse</strong>
                <span>{product.blouse || "Included"}</span>
              </div>
              <div>
                <strong>Care</strong>
                <span>{product.care || "Dry Clean"}</span>
              </div>
            </MetaGrid>

            <CertificationBadges />

            <InquiryCard>
              <h3>Wholesale Inquiry</h3>
              <p>Get bulk pricing and wholesale rates</p>
              <InquiryActions>
                <AddToInquiryBtn 
                  $added={isAdded} 
                  onClick={handleInquiryToggle}
                >
                  {isAdded ? "Remove from Inquiry" : "Add to Inquiry"}
                </AddToInquiryBtn>
                <InquiryBtn onClick={() => setShowModal(true)}>
                  Send Inquiry
                </InquiryBtn>
              </InquiryActions>
            </InquiryCard>
          </Info>
        </Main>

        <div style={{ marginTop: '3rem' }}>
          {/* Similar Products - Same category and subcategory */}
          <RecommendationSection>
            <SectionTitle>Similar Products</SectionTitle>
            <ProductGrid>
              {recommendations.similar.length === 0 ? (
                <EmptyMessage>No similar products available</EmptyMessage>
              ) : (
                recommendations.similar.map(prod => (
                  <SimpleProductCard key={prod.id} product={prod} />
                ))
              )}
            </ProductGrid>
          </RecommendationSection>
          
          {/* Recommended Products - Same category first, then other categories */}
          <RecommendationSection>
            <SectionTitle>Recommended for You</SectionTitle>
            <ProductGrid>
              {recommendations.recommended.length === 0 ? (
                <EmptyMessage>No recommendations available</EmptyMessage>
              ) : (
                recommendations.recommended.map(prod => (
                  <SimpleProductCard key={prod.id} product={prod} />
                ))
              )}
            </ProductGrid>
          </RecommendationSection>
          
          {/* Trending Now - Newly added products (based on dateAdded) */}
          <RecommendationSection>
            <SectionTitle>Trending Now</SectionTitle>
            <ProductGrid>
              {recommendations.trending.length === 0 ? (
                <EmptyMessage>No trending products available</EmptyMessage>
              ) : (
                recommendations.trending.map(prod => (
                  <SimpleProductCard key={prod.id} product={prod} />
                ))
              )}
            </ProductGrid>
          </RecommendationSection>
          
          {/* Perfect Complements - Top highly selected products (based on reviews/ratings) */}
          <RecommendationSection>
            <SectionTitle>Perfect Complements</SectionTitle>
            <ProductGrid>
              {recommendations.complements.length === 0 ? (
                <EmptyMessage>No complementary products available</EmptyMessage>
              ) : (
                recommendations.complements.map(prod => (
                  <SimpleProductCard key={prod.id} product={prod} />
                ))
              )}
            </ProductGrid>
          </RecommendationSection>
        </div>
      </Container>

      {showGalleryModal && (
        <GalleryModalOverlay onClick={() => setShowGalleryModal(false)}>
          <GalleryModal onClick={(e) => e.stopPropagation()}>
            <GalleryCloseBtn onClick={() => setShowGalleryModal(false)}>×</GalleryCloseBtn>
            <GalleryImageContainer>
              <img src={activeImage} alt={product.name} />
              {images.length > 1 && (
                <>
                  <GalleryNavButton className="prev" onClick={handleGalleryPrev}>
                    ‹
                  </GalleryNavButton>
                  <GalleryNavButton className="next" onClick={handleGalleryNext}>
                    ›
                  </GalleryNavButton>
                </>
              )}
            </GalleryImageContainer>
            <GalleryThumbs>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className={activeImageIndex === i ? "active" : ""}
                  onClick={() => {
                    setActiveImage(img);
                    setActiveImageIndex(i);
                  }}
                />
              ))}
            </GalleryThumbs>
          </GalleryModal>
        </GalleryModalOverlay>
      )}

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalImage>
              <img src="/images/showcase_products/bulk-inquiry.jpeg" alt="Wholesale Inquiry" />
            </ModalImage>
            <ModalFormWrapper>
              <ModalFormHeader>
                <h2>Wholesale Inquiry</h2>
                <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
              </ModalFormHeader>
              <ModalFormContent>
                <input
                  name="name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  maxLength="10"
                  required
                />
                <input
                  name="city"
                  placeholder="City *"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Budget Range *</option>
                  <option value="20k-50k">₹20,000 - ₹50,000</option>
                  <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                  <option value="1L-2L">₹1,00,000 - ₹2,00,000</option>
                  <option value="2L-3L">₹2,00,000 - ₹3,00,000</option>
                  <option value="3L-5L">₹3,00,000 - ₹5,00,000</option>
                  <option value="5L+">Above ₹5,00,000</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Wholesale requirements, preferred designs, delivery timeline..."
                  value={form.message}
                  onChange={handleChange}
                />
              </ModalFormContent>
              <ModalFormActions>
                <Cancel onClick={() => setShowModal(false)}>Cancel</Cancel>
                <Submit onClick={sendWhatsApp}>Send on WhatsApp</Submit>
              </ModalFormActions>
            </ModalFormWrapper>
          </Modal>
        </ModalOverlay>
      )}
      
      <StickyMobileBar
 
        product={product}
        isAdded={isAdded}
        onInquiry={handleInquiryToggle}
      />
    </Page>
    </PageTransition>
  );
};

export default ProductDetail;

/* ---------------- STYLES ---------------- */

const Page = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    padding-top: calc(0px + var(--banner-height, 0px));
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1rem;
  padding-top: 1rem;
  
  @media (max-width: 768px) {
    padding-top: 0.5rem;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 480px 1fr;
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Gallery = styled.div``;

const MainImage = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid #eee;
  background: #fafafa;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.3s ease;
  }

  @media (max-width: 900px) {
    height: 600px;
    
    img {
      object-fit: scale-down;
    }
  }

  @media (max-width: 768px) {
    height: 400px;
    cursor: pointer;
    
    img {
      object-fit: scale-down;
    }
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
  
  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 1.6rem;
    
    &.prev {
      left: 0.5rem;
    }
    
    &.next {
      right: 0.5rem;
    }
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;

  img {
    width: 70px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
  }

  img.active {
    border-color: #111;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Category = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: #fafafa;
  padding: 1rem;
  border-radius: 12px;

  div {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
  }

  strong {
    color: #333;
  }
  span {
    color: #666;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InquiryCard = styled.div`
  background: linear-gradient(135deg, #e67e35, #A0522D);
  color: white;
  padding: 1.8rem;
  border-radius: 16px;
  margin-top: 1.5rem;

  h3 {
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 1rem;
  }
`;

const InquiryActions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const AddToInquiryBtn = styled.button`
  background: ${({ $added }) => ($added ? "#25d366" : "#8B4513")};
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 140px;
  
  &:hover {
    background: ${({ $added }) => ($added ? "#1da851" : "#A0522D")};
  }
`;

const InquiryBtn = styled.button`
  background: white;
  color: #111;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  min-width: 140px;
`;

const RecommendationSection = styled.div`
  background: #fafafa;
  border-radius: 16px;
  padding: 0.5rem;
  border: 0px solid #eee;
  margin-bottom: 0rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 0.95rem;
`;

const NotFound = styled.div`
  padding: 5rem;
  text-align: center;
  font-size: 1.2rem;
`;

/* ---------- MODAL ---------- */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3600;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #fff;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  max-height: 90vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 95vw;
    max-height: 95vh;
  }
`;

const ModalImage = styled.div`
  background: linear-gradient(135deg, #e67e35, #A0522D);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    min-height: 20px;
  }
`;

const ModalFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  
  @media (max-width: 768px) {
    max-height: 95vh;
  }
`;

const ModalFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;

  h2 {
    margin: 0;
    color: #8B4513;
    font-size: 1.3rem;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const ModalFormContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  touch-action: manipulation;
  
  @media (max-width: 768px) {
    padding: 1rem;
    max-height: calc(95vh - 180px);
  }

  input,
  textarea,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 0.9rem;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #8B4513;
      box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
    }
  }

  select {
    background: white;
    cursor: pointer;
  }

  textarea {
    resize: none;
    min-height: 100px;
  }
`;

const ModalFormActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.8rem;
  }
`;

const Cancel = styled.button`
  flex: 1;
  padding: 0.9rem;
  border-radius: 10px;
  border: 2px solid #ddd;
  background: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: #f5f5f5;
    border-color: #999;
  }
`;

const Submit = styled.button`
  flex: 1;
  padding: 0.9rem;
  border-radius: 10px;
  border: none;
  background: #25d366;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: #1da851;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }
`;

/* ---------- GALLERY MODAL ---------- */

const GalleryModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4000;
  padding: 1rem;
`;

const GalleryModal = styled.div`
  width: 100%;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const GalleryCloseBtn = styled.button`
  position: absolute;
  top: -10px;
  right: 0;
  background: white;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: #333;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: #f0f0f0;
  }
`;

const GalleryImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const GalleryNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2.5rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
  
  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const GalleryThumbs = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  overflow-x: auto;
  padding: 0.5rem;
  
  img {
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    flex-shrink: 0;
    
    &:hover {
      border-color: #fff;
    }
    
    &.active {
      border-color: #a47148;
    }
  }
`;
