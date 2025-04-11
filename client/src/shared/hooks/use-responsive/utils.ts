export const deviceAgentRegex = {
  mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  tablet: /iPad|Android|tablet|PlayBook|Silk/i,
  ios: /iPad|iPhone|iPod/,
};

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
};

export const responsiveType = (width: number) => {
  if (width < breakpoints.mobile) return 'mobile';
  if (width >= breakpoints.mobile && width < breakpoints.tablet)
    return 'tablet';
  return 'desktop';
};
