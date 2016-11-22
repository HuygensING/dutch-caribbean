const getCurrentScrollTop = () =>
  (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

export {getCurrentScrollTop}