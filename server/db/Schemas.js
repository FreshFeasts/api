const Joi = require('joi');

module.exports = {
  registerUserSchema: Joi.object({
    user: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dietChoice: Joi.array().items(Joi.string()).required(),
      allergens: Joi.array().items(Joi.string()).required(),
      preferredDay: Joi.number().required(),
    }).required(),
    info: Joi.object({
      deliveryAddress: Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string().allow('').optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
      }).required(),
      DOB: Joi.required(),
      phone: Joi.string().required(),
    }).required(),
    paymentInfo: Joi.object({
      ccNum: Joi.string().required(),
      ccDetails: Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string().allow('').optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
      }).required(),
      ccExp: Joi.object({
        month: Joi.number().required(),
        year: Joi.number().required(),
      }).required(),
    }).required(),
  }),

  updateDeliverySchema: Joi.object({
    orderId: Joi.string().required(),
    userId: Joi.string().required(),
    orderDate: Joi.date().iso().required,
    deliveryDate: Joi.date().iso().required(),
  }),

  updateUserSchema: Joi.object({
    userId: Joi.string().required(),
    user: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      darkTheme: Joi.boolean().required(),
    }).required(),
    info: Joi.object({
      deliveryAddress: Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string().allow('').optional(),
        city: Joi.string().required(),
        state: Joi.string().length(2).required(),
        zip: Joi.string().required(),
      }).required(),
      phone: Joi.string().required(),
    }).required(),
  }),

  updateCartSchema: Joi.object({
    userId: Joi.string().required(),
    currentCart: Joi.object({
      meals: Joi.array().required(),
      deliveryDate: Joi.optional(),
    }).required(),
  }),

  addCartToOrdersSchema: Joi.object({
    userId: Joi.string().required(),
    currentCart: Joi.object({
      meals: Joi.array().required(), // Array of mealId Strings
      deliveryDate: Joi.required(),
      orderDate: Joi.required(),
    }),
  }),
};
