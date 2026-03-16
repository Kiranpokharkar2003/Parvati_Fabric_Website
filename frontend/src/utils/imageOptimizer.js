/**
 * Cloudinary Image Optimization Utility
 * Automatically adds optimization parameters to Cloudinary URLs
 */

export const optimizeCloudinaryImage = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const {
    width = 800,
    quality = 'auto',
    format = 'auto',
    crop = 'scale'
  } = options;

  // Check if URL already has transformations
  if (url.includes('/upload/') && !url.includes('/upload/v')) {
    return url.replace('/upload/', `/upload/w_${width},f_${format},q_${quality},c_${crop}/`);
  }
  
  // For URLs with version number
  if (url.includes('/upload/v')) {
    return url.replace('/upload/', `/upload/w_${width},f_${format},q_${quality},c_${crop}/`);
  }

  return url;
};

// Preset configurations for different use cases
export const imagePresets = {
  thumbnail: { width: 300, quality: 'auto:low' },
  card: { width: 600, quality: 'auto' },
  detail: { width: 1200, quality: 'auto:good' },
  hero: { width: 1920, quality: 'auto:best' }
};

export const getOptimizedImage = (url, preset = 'card') => {
  return optimizeCloudinaryImage(url, imagePresets[preset]);
};
