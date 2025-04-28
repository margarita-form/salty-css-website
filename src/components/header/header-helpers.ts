export const closeMainNav = () => {
  const event = new CustomEvent("closeMainNav");
  document.dispatchEvent(event);
};
