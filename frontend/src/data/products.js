import sareesData from './sarees';
import lehengasData from './lehengas';
import kurtisData from './kurtis';
import fabricsData from './fabrics';

// Combine all product data
const allProductsData = [
  ...sareesData,
  ...lehengasData,
  ...kurtisData,
  ...fabricsData
];

export default allProductsData;
