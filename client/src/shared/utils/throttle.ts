export function throttle(func: (...arg: any) => void, wait = 500) {
  let waiting = false;

  function throttled(...args: any) {
    if (!waiting) {
      func(...args);
      waiting = true;

      setTimeout(() => (waiting = false), wait);
    }
  }

  return throttled;
}
