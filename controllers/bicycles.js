const { ctrlWrapper, HttpError } = require("../helpers");
const calculateStats = require("../helpers/calculateStats");

const { Bicycle } = require("../models/bicycle");

const getAll = async (req, res) => {
  const data = await Bicycle.find({});
  const avgPrice = await calculateStats();
  res.json({ data, ...avgPrice });
};

const add = async (req, res) => {
  const data = await Bicycle.create(req.body);
  res.json(data);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const result = await Bicycle.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Bicycle.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Object deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  updateStatus: ctrlWrapper(updateStatus),
  remove: ctrlWrapper(remove),
};
