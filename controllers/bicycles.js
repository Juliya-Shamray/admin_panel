const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
