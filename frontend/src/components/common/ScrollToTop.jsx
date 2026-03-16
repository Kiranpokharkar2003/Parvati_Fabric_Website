import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if this is a back/forward navigation
    if (window.history.state && window.history.state.idx !== undefined) {
      // Browser handles scroll restoration automatically for back/forward
      return;
    }

    // For new navigation, scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname, location.search]);

  return null;
};

export default ScrollToTop;