export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
};

export const respond = (breakpoint) => `@media (max-width: ${breakpoints[breakpoint]})`;
