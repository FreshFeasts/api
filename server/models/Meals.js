const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/index');

let mealsCollection;

const getCollection = async () => {
  if (mealsCollection) {
    return;
  }
  const db = await connectDb();
  mealsCollection = db.collection('meals');
};

getCollection();

const projectOptions = {
  _id: 0,
  mealId: '$_id',
};

module.exports = {
  getMeals: async (count, page) => {
    const skipTo = (page - 1) * count;
    console.log(count);
    const cursor = await mealsCollection.aggregate([
      {
        $skip: skipTo,
      },
      {
        $limit: 1,
      },
      {
        $addFields: {
          mealId: '$_id',
        },
      },
    ]);

    const data = await cursor.toArray();
    console.log(data);
    return data;
  },
};
