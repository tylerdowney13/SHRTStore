const router = require("express").Router();
const ProductSales = require("../models/ProductSales");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Post sale
router.post("/", verifyTokenAndAuthorization, (req, res) => {
  const newProductSale = new ProductSales(req.body);
  try {
    const savedProductSale = newProductSale.save();
    res.status(200).json(savedProductSale);
  } catch (error) {
    console.log(error);
  }
});

// Get sale stats
router.get("/stats", verifyTokenAndAuthorization, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const productSalesStats = await ProductSales.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          productId: "$productId",
          numberSold: "$quantity",
          title: "$title",
        },
      },
      {
        $group: {
          _id: "$title",
          total: { $sum: "$numberSold" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
    res.status(200).json(productSalesStats);
  } catch (error) {
    console.log(error);
  }
});

router.get("/stats/:pid", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.params.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await ProductSales.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          productId: { $elemMatch: { productId } },
        },
      },
      {
        $project: {
          sales: "$quantity",
          productId: "$productId",
        },
      },
      {
        $group: {
          _id: "$productId",
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
