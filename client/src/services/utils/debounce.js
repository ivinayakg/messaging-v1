export const debounce = (fun, timeout) => {
  if (!timeout) timeout = 500;
  let timer;
  return (...args) => {
    clearTimeout(timer);
    setTimeout(() => {
      fun(args);
    }, timeout);
  };
};
