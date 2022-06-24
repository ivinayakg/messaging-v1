const addToStorage = (key, value) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};
const getFromStorage = (key, parse) =>
  parse ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
const deleteFromStorage = (key) => localStorage.removeItem(key);
const resetStorage = () => localStorage.clear();

export { addToStorage, getFromStorage, deleteFromStorage, resetStorage };
