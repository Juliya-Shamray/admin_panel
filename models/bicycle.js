const Joi = require("joi");
const { Schema, model } = require("mongoose");

const bicycleSchema = new Schema({
  name: {
    type: String,
    minlength: [5],
    required: true,
  },
  type: {
    type: String,
    minlength: [5],
    required: true,
  },
  color: {
    type: String,
    minlength: [5],
    required: true,
  },
  wheelSize: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: [5],
    required: true,
  },
});

const addSchema = Joi.object({
  name: Joi.string().min(5).required(),
  type: Joi.string().min(5).required(),
  color: Joi.string().min(5).required(),
  wheelSize: Joi.number().min(5).required(),
  price: Joi.number().min(5).required(),
  description: Joi.string().min(5).required(),
});

const schema = {
  addSchema,
};

const Bicycle = model("bicycle", bicycleSchema);

module.export = {
  Bicycle,
  schema,
};
