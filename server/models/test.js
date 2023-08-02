const test = {
  _id: {
    $oid: '64c59c1d32ab87d43f2bec71',
  },
  review: { something: 'Cool' },
  name: "Chef Basil's Bliss",
  description:
    'A delightful vegetable medley layered with fresh ingredients and a touch of love. Inspired by the famous dish from the movie Ratatouille.',
  cuisine: 'French',
  dietType: 'Vegan & Veggie',
  numberOfRatings: 150,
  ratings: {
    1: 5,
    2: 10,
    3: 20,
    4: 45,
    5: 70,
  },
  recommended: true,
  favorites: 85,
  allergens: [],
  photo:
    'https://www.allrecipes.com/thmb/nu4Y5_nZgI82TzfaFaRHFX7MteI=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/165649roasted-vegetable-medley-DDMFS-001-4x3-f9c51738278e4c92aa53d51250f4ed10.jpg',
  ingredients: [
    'Eggplant',
    'Zucchini',
    'Red Bell Pepper',
    'Yellow Bell Pepper',
    'Tomato',
    'Basil',
    'Garlic',
    'Olive Oil',
  ],
  nutrition: [
    {
      calories: '180',
    },
    {
      protein: '5g',
    },
    {
      carbohydrates: '25g',
    },
    {
      fat: '7g',
    },
    {
      fiber: '6g',
    },
    {
      sugar: '8g',
    },
  ],
};

const x = 'something';
console.log(test.review[x]);
