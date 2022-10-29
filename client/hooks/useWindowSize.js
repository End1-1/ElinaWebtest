import { useState, useEffect } from 'react';

// Hook
const useWindowSize = (props = { mobileMaxWidth: 768, maxTabletWidth: 992 }) => {

  const { mobileMaxWidth, maxTabletWidth } = props;

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isMobile: false
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: mobileMaxWidth && window.innerWidth < mobileMaxWidth,
          isTablet: window.innerWidth < maxTabletWidth && window.innerWidth > mobileMaxWidth
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default useWindowSize;