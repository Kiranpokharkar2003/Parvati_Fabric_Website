import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('lastScrollY', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const isBackNavigation = window.performance?.navigation?.type === 2 || 
                            window.performance?.getEntriesByType('navigation')[0]?.type === 'back_forward';

    if (isBackNavigation) {
      const savedY = sessionStorage.getItem('lastScrollY');
      if (savedY) {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedY));
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollRestoration;
