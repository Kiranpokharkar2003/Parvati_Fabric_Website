/**
 * EXAMPLE: How to use Image Optimizer
 * 
 * Replace your existing image URLs with optimized versions
 */

import { getOptimizedImage, optimizeCloudinaryImage } from '../utils/imageOptimizer';

// Example 1: Using presets (recommended)
const ProductCard = ({ product }) => {
  return (
    <div>
      <img 
        src={getOptimizedImage(product.image, 'card')} 
        alt={product.name}
        loading="lazy"
      />
    </div>
  );
};

// Example 2: Custom optimization
const HeroImage = ({ imageUrl }) => {
  const optimizedUrl = optimizeCloudinaryImage(imageUrl, {
    width: 1920,
    quality: 'auto:best',
    format: 'auto'
  });
  
  return <img src={optimizedUrl} alt="Hero" />;
};

// Example 3: Responsive images with srcSet
const ResponsiveProductImage = ({ product }) => {
  const thumbnail = getOptimizedImage(product.image, 'thumbnail');
  const card = getOptimizedImage(product.image, 'card');
  const detail = getOptimizedImage(product.image, 'detail');
  
  return (
    <img
      src={card}
      srcSet={`${thumbnail} 300w, ${card} 600w, ${detail} 1200w`}
      sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      alt={product.name}
      loading="lazy"
    />
  );
};

// Available presets:
// - 'thumbnail' (300px, low quality) - for small previews
// - 'card' (600px, auto quality) - for product cards
// - 'detail' (1200px, good quality) - for product detail pages
// - 'hero' (1920px, best quality) - for hero/banner images

export { ProductCard, HeroImage, ResponsiveProductImage };
