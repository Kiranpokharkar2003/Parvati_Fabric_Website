import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SimpleProductCard from '../products/SimpleProductCard';
import { AnimatedCard } from '../common/MicroAnimations';

const RecommendationsContainer = styled.div`
  margin: 3rem 0;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: #333;
`;

const RecommendationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
`;

const RecommendationType = styled.div`
  margin-bottom: 2rem;
`;

const AIRecommendations = ({ currentProduct, allProducts, userPreferences = {} }) => {
  const [recommendations, setRecommendations] = useState({
    similar: [],
    complementary: [],
    trending: [],
    personalised: []
  });

  useEffect(() => {
    generateRecommendations();
  }, [currentProduct, allProducts]);

  const generateRecommendations = () => {
    if (!currentProduct || !allProducts.length) return;

    // Similar products (ONLY same category)
    const similar = allProducts
      .filter(p => 
        p.id !== currentProduct.id && 
        p.category === currentProduct.category
      )
      .slice(0, 4);

    // Complementary products (different category but matching occasion)
    const complementary = allProducts
      .filter(p => 
        p.id !== currentProduct.id &&
        p.category !== currentProduct.category &&
        p.occasion?.some(occ => currentProduct.occasion?.includes(occ))
      )
      .slice(0, 4);

    // Trending products (high ratings)
    const trending = allProducts
      .filter(p => p.id !== currentProduct.id && p.avgRating >= 4)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 4);

    // Personalised based on user preferences
    const personalised = allProducts
      .filter(p => {
        if (p.id === currentProduct.id) return false;
        
        // Match regional style preference
        if (userPreferences.regionalStyle && 
            p.regionalStyle === userPreferences.regionalStyle) return true;
        
        // Match fabric preference
        if (userPreferences.fabric && 
            p.tags?.includes(userPreferences.fabric)) return true;
        
        // Match occasion preference
        if (userPreferences.occasions && 
            p.occasion?.some(occ => userPreferences.occasions.includes(occ))) return true;
        
        return false;
      })
      .slice(0, 4);

    setRecommendations({
      similar,
      complementary,
      trending,
      personalised
    });
  };

  const RecommendationSection = ({ title, products, delay = 0 }) => {
    if (!products.length) return null;

    return (
      <RecommendationType>
        <SectionTitle>{title}</SectionTitle>
        <RecommendationGrid>
          {products.map((product, index) => (
            <AnimatedCard key={product.id} delay={`${delay + index * 0.1}s`}>
              <SimpleProductCard product={product} />
            </AnimatedCard>
          ))}
        </RecommendationGrid>
      </RecommendationType>
    );
  };

  return (
    <RecommendationsContainer>
      <RecommendationSection 
        title="Similar Products" 
        products={recommendations.similar}
        delay={0}
      />
      
      <RecommendationSection 
        title="Perfect Complements" 
        products={recommendations.complementary}
        delay={0.2}
      />
      
      <RecommendationSection 
        title="Trending Now" 
        products={recommendations.trending}
        delay={0.4}
      />
      
      {recommendations.personalised.length > 0 && (
        <RecommendationSection 
          title="Recommended for You" 
          products={recommendations.personalised}
          delay={0.6}
        />
      )}
    </RecommendationsContainer>
  );
};

export default AIRecommendations;