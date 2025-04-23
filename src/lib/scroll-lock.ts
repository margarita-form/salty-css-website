export const lockScroll = () => {
  // Save current scroll position
  const scrollY = window.scrollY;

  // Apply scroll lock
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflowY = "scroll";
};

export const unlockScroll = (scroll = true) => {
  // Remove scroll lock
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflowY = "scroll";

  if (scroll) {
    // Restore scroll position
    const scrollY = parseInt(document.body.style.top || "0", 10) * -1;
    window.scrollTo(0, scrollY);
  }
};
