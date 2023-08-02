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
    const cursor = await mealsCollection.aggregate([
      {
        $skip: skipTo,
      },
      {
        $limit: count,
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

  addUserReview: async (mealId, userId, firstName, reviewText) => {
    const query = new ObjectId(mealId);
    const reviewName = `${firstName}`;
    const newReview = {
      name: reviewName,
      reviewText,
    };

    try {
      const meal = await mealsCollection.findOne({ _id: query });
      if (meal.reviews[userId] === undefined) {
        const updatedReviews = { ...meal.reviews, [userId]: newReview };
        // Update the meals
        await mealsCollection.findOneAndUpdate(
          { _id: query },
          { $set: { reviews: updatedReviews } }
        );
        return { code: 201, data: newReview };
      } else {
        return { code: 409, data: { msg: 'Review for user already exists' } };
      }
    } catch (error) {
      console.error(error);
      return { code: 500, data: { msg: 'An internal error occurred' } };
    }
  },
};
