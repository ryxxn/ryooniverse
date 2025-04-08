export const debounce = (func: (...arg: any) => void, wait = 500) => {
  let timeout: ReturnType<typeof setTimeout>;
  function debounced(...args: any) {
    const later = () => {
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
};
