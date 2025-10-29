let navigator;

const setNavigator = (nav) => {
  navigator = nav;
};

const navigate = (...args) => {
  if (navigator) {
    navigator(...args);
  }
};

export { setNavigator, navigate };