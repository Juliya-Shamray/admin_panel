const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const statusList = ["available", "busy", "unavailable"];

const bicycleSchema = new Schema(
  {
    id: { type: String, minlength: [5], required: true },
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
    status: {
      type: String,
      enum: statusList,
      default: "available",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  id: Joi.string().min(5).required(),
  name: Joi.string().min(5).required(),
  type: Joi.string().min(5).required(),
  color: Joi.string().min(5).required(),
  wheelSize: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().min(5).required(),
  status: Joi.string().valid(...statusList),
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...statusList)
    .required()
    .messages({
      "any.required": "missing field status",
    }),
});

const schema = {
  addSchema,
  updateStatusSchema,
};

bicycleSchema.post("save", handleMongooseError);

const Bicycle = model("bicycle", bicycleSchema);

module.exports = {
  Bicycle,
  schema,
};
