import React from 'react';
import { create } from 'zustand';
import { deviceAgentRegex, responsiveType } from './utils';
import { throttle } from '../../utils';

interface Store {
  viewportType: 'mobile' | 'tablet' | 'desktop';
  isInitialized: boolean;
}

const useStore = create<Store>(() => ({
  viewportType: 'desktop',
  isInitialized: false,
}));

const useResponsive = () => {
  const { viewportType, isInitialized } = useStore();

  React.useEffect(() => {
    if (isInitialized) return;

    const userAgent = navigator.userAgent.toLowerCase();

    const isMobileDevice = deviceAgentRegex.mobile.test(userAgent);
    const isTabletDevice =
      deviceAgentRegex.tablet.test(userAgent) && !isMobileDevice;

    const updateResponsiveType = throttle(() => {
      const width = window.innerWidth;
      const type = responsiveType(width);

      if (isMobileDevice || type === 'mobile') {
        useStore.setState({ viewportType: 'mobile' });
        return;
      }

      if (isTabletDevice || type === 'tablet') {
        useStore.setState({ viewportType: 'tablet' });
        return;
      }

      useStore.setState({ viewportType: 'desktop' });
    }, 200);

    // initialize
    updateResponsiveType();
    useStore.setState({ isInitialized: true });

    window.addEventListener('resize', updateResponsiveType);

    return () => {
      window.removeEventListener('resize', updateResponsiveType);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    viewportType,
    isMobile: viewportType === 'mobile',
    isTablet: viewportType === 'tablet',
    isDesktop: viewportType === 'desktop',
  };
};

export default useResponsive;
