export const closeDocsNav = () => {
  const event = new CustomEvent("closeDocsNav");
  document.dispatchEvent(event);
};
