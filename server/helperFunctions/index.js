module.exports = {
  checkInput: (parameter, defaultAmount) => {
    if (!parameter) {
      return defaultAmount;
    } else {
      return Number.parseInt(parameter);
    }
  },
  userAlreadyExists: async (email, userCollection) => {
    const data = await userCollection.findOne({ email: email });
    return data ? true : false;
  },
  // isUser = (userId)
};
