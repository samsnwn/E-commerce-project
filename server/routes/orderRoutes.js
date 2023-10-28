import express from "express"
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from"../controllers/orderControllers.js"

import { protect, admin } from '../middleware/authMiddleware.js'

// const { protect, restrictTo } = require('../middleware/authMiddleware')
// const {
//   createOrderController,
//   updateOrderController,
//   deleteOrderController,
//   getUserOrderController,
//   getAllOrdersController,
//   getIncomeController,
// } = require("../controllers/orderControllers");

// const {
//   verifyToken,
//   verifyTokenAndAdmin,
//   verifyTokenAndAuthorization,
// } = require("../middleware/verifyToken");

// // CREATE
// router.post("/create", createOrderController);

// // UPDATE
// router.put("/update/:id", protect, restrictTo("admin"), verifyTokenAndAdmin, updateOrderController);

// // DELETE
// router.delete(
//   "/delete/:id",
//   protect,
//   restrictTo("admin"),
//   verifyTokenAndAdmin,
//   deleteOrderController
// );

// // GET USER ORDER
// router.get(
//   "/order/:userId",
//   protect,
//   restrictTo("admin", "user"),
//   verifyTokenAndAuthorization,
//   getUserOrderController
// );

// // GET ALL ORDERS
// router.get("/", protect, restrictTo("admin"), verifyTokenAndAdmin, getAllOrdersController);


// // GET MONTHLY INCOME
// router.get("/income", protect, restrictTo("admin"), verifyTokenAndAdmin, getIncomeController);



router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router;
