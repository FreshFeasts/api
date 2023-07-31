const { Meals } = require('../models');
const { checkInput } = require('../helperFunctions');

module.exports = {
  getMeals: async (req, res) => {
    let { count, page } = req.query;
    count = checkInput(count, 5);
    page = checkInput(page, 1);
    try {
      const data = await Meals.getMeals(count, page);
      res.send(data);
    } catch (err) {
      res.status(400).send({
        msg: `There was an error`,
      });
    }
  },
};
