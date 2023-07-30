module.exports = {
  checkInput: (parameter, defaultAmount) => {
    if (!parameter) {
      return defaultAmount;
    } else {
      return Number.parseInt(parameter);
    }
  },
};
