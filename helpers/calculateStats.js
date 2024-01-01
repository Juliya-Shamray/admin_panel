const { Bicycle } = require("../models/bicycle");

const calculateStats = async () => {
  try {
    const [total, available, busy] = await Promise.all([
      Bicycle.countDocuments(),
      Bicycle.countDocuments({ status: "available" }),
      Bicycle.countDocuments({ status: "busy" }),
    ]);

    const avgPriceResult = await Bicycle.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" },
        },
      },
    ]).exec();

    const avgPrice =
      avgPriceResult.length > 0 ? avgPriceResult[0].averagePrice : null;

    return { total, available, busy, avgPrice };
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = calculateStats;
