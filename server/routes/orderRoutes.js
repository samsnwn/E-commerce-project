const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authControllers");
const {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getUserOrderController,
  getAllOrdersController,
  getIncomeController,
} = require("../controllers/orderControllers");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");

// CREATE
router.post("/create", createOrderController);

// UPDATE
router.put("/update/:id", protect, restrictTo("admin"), verifyTokenAndAdmin, updateOrderController);

// DELETE
router.delete(
  "/delete/:id",
  protect,
  restrictTo("admin"),
  verifyTokenAndAdmin,
  deleteOrderController
);

// GET USER ORDER
router.get(
  "/order/:userId",
  protect,
  restrictTo("admin", "user"),
  verifyTokenAndAuthorization,
  getUserOrderController
);

// GET ALL ORDERS
router.get("/", protect, restrictTo("admin"), verifyTokenAndAdmin, getAllOrdersController);


// GET MONTHLY INCOME
router.get("/income", protect, restrictTo("admin"), verifyTokenAndAdmin, getIncomeController);

module.exports = router;
