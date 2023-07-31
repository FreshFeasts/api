const Joi = require('joi');

module.exports = {
  registerSchema: Joi.object({
    user: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dietChoice: Joi.array().items(Joi.string()).required(),
      allergens: Joi.array().items(Joi.string()).required(),
      preferredDay: Joi.number().min(0).max(4).required(),
    }).required(),
    info: Joi.object({
      deliveryAddress: Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
      }).required(),
      DOB: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .required(),
      phone: Joi.string().required(),
    }).required(),
    paymentInfo: Joi.object({
      ccNum: Joi.string().required(),
      ccDetails: Joi.object({
        address1: Joi.string().required(),
        address2: Joi.string(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
      }).required(),
      ccExp: Joi.object({
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().min(new Date().getFullYear()).required(),
      }).required(),
    }).required(),
  }),
};
