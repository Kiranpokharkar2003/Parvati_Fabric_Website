/**
 * Quick Image Optimization Helper
 * Import this in any component that displays images
 */

import { getOptimizedImage } from './imageOptimizer';

/**
 * Optimizes a single image URL
 * @param {string} url - Original Cloudinary URL
 * @param {string} context - Where the image is used: 'list', 'detail', 'hero', 'thumb'
 * @returns {string} Optimized URL
 */
export const useOptimizedImage = (url, context = 'list') => {
  const presetMap = {
    thumb: 'thumbnail',
    list: 'card',
    detail: 'detail',
    hero: 'hero'
  };
  
  return getOptimizedImage(url, presetMap[context] || 'card');
};

/**
 * Optimizes an array of image URLs
 * @param {Array} images - Array of image URLs
 * @param {string} context - Where images are used
 * @returns {Array} Array of optimized URLs
 */
export const useOptimizedImages = (images, context = 'list') => {
  if (!Array.isArray(images)) return [];
  return images.map(img => useOptimizedImage(img, context));
};

/**
 * Optimizes product object with image
 * @param {Object} product - Product object with image property
 * @param {string} context - Where product is displayed
 * @returns {Object} Product with optimized image
 */
export const useOptimizedProduct = (product, context = 'list') => {
  if (!product) return null;
  
  return {
    ...product,
    image: useOptimizedImage(product.image, context),
    images: product.images ? useOptimizedImages(product.images, context) : undefined
  };
};

/**
 * Optimizes array of products
 * @param {Array} products - Array of product objects
 * @param {string} context - Where products are displayed
 * @returns {Array} Products with optimized images
 */
export const useOptimizedProducts = (products, context = 'list') => {
  if (!Array.isArray(products)) return [];
  return products.map(product => useOptimizedProduct(product, context));
};

// Usage Examples:
// 
// 1. Single image:
//    const optimizedUrl = useOptimizedImage(imageUrl, 'detail');
//
// 2. Product card:
//    const optimizedProduct = useOptimizedProduct(product, 'list');
//    <img src={optimizedProduct.image} />
//
// 3. Product list:
//    const optimizedProducts = useOptimizedProducts(products, 'list');
//    {optimizedProducts.map(p => <ProductCard product={p} />)}
//
// 4. Product detail page:
//    const optimizedProduct = useOptimizedProduct(product, 'detail');
