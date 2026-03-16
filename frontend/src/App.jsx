import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { InquiryProvider } from "./contexts/InquiryContext";

import Navbar from "./components/layout/Navbar";
import PremiumFooter from "./components/layout/PremiumFooter";
import Toast from "./components/common/Toast";
import FloatingCTA from "./components/common/FloatingCTA";
import MobileFloatingCTA from "./components/mobile/MobileFloatingCTA";
import FloatingInquiryCart from "./components/layout/FloatingInquiryCart";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollRestoration from "./components/common/ScrollRestoration";
import BackToTop from "./components/common/BackToTop";
import GlobalFonts from "./styles/GlobalFonts";
import { GlobalStyles } from "./styles/GlobalStyles";
import SeasonalBannerStrip from "./components/home/SeasonalBannerStrip";
import InquiryTray from "./components/products/InquiryTray";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div>Loading...</div>
  </div>
);

const App = () => {
  return (
    <InquiryProvider>
      <GlobalFonts />
      <GlobalStyles />
      <ScrollRestoration />
      <SeasonalBannerStrip />
      <Navbar />

      {/* Global Inquiry Tray */}
      <InquiryTray />

      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        } />

        {/* Product listing routes */}
        <Route path="/products" element={
          <Suspense fallback={<LoadingFallback />}>
            <Products />
          </Suspense>
        } />
        <Route path="/products/:category" element={
          <Suspense fallback={<LoadingFallback />}>
            <Products />
          </Suspense>
        } />
        <Route path="/products/:category/:subcategory" element={
          <Suspense fallback={<LoadingFallback />}>
            <Products />
          </Suspense>
        } />

        {/* Product detail */}
        <Route path="/product/:id" element={
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetail />
          </Suspense>
        } />
        
        {/* Wishlist */}
        <Route path="/wishlist" element={
          <Suspense fallback={<LoadingFallback />}>
            <Wishlist />
          </Suspense>
        } />
      </Routes>

      <FloatingCTA />
      <MobileFloatingCTA />
      <FloatingInquiryCart />
      <BackToTop />
      <Toast />
      <PremiumFooter />
    </InquiryProvider>
  );
};

export default App;