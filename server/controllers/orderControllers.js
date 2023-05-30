const Order = require("../models/OrderModel");
const ExpressError = require("../utils/ExpressError");
const asyncHandler = require("express-async-handler");

// exports.createOrderController = async (req, res, next) => {
//   const newOrder = new Order(req.body);
//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     next(new ExpressError("Failed to create order, Please Try Again", 500));
//   }
// };

// exports.updateOrderController = async (req, res, next) => {
//   const orderId = req.params.id;
//   const updatedOrderData = req.body;
//   try {
//     const updatedOrder = await Cart.findByIdAndUpdate(
//       orderId,
//       {
//         $set: updatedOrderData,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     next(new ExpressError("Failed to update order, Please Try Again", 500));
//   }
// };

// exports.deleteOrderController = async (req, res, next) => {
//   const orderId = req.params.id;
//   try {
//     await Order.findByIdAndDelete(orderId);
//     res.status(200).json("Order has been deleted");
//   } catch (err) {
//     next(
//       new ExpressError("Failed to delete your order, try again please!", 500)
//     );
//   }
// };

// exports.getUserOrderController = async (req, res, next) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     next(new ExpressError("Cannot find this order", 500));
//   }
// };

// exports.getAllOrdersController = async (req, res, next) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (err) {
//     next(
//       new ExpressError("Failed to retrieve all orders, try again please!", 500)
//     );
//   }
// };

// exports.getIncomeController = async (req, res, next) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
//       { $group: { _id: "$month", total: { $sum: "$sales" } } },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     next(
//       new ExpressError(
//         "Failed to retrieve monthly income, try again please!",
//         500
//       )
//     );
//   }
// };

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id:req.body.id,
      status:req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }
    const updtatedOrder = await order.save()
    res.status(201).json(updtatedOrder);
  } else {
    res.status(404)
    throw new Error("Order not found")
  }

});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id
  const deliveredOrder = await Order.findByIdAndUpdate(orderId, {isDelivered: true})
  res.status(201).json(deliveredOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({})
  res.status(201).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(201).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
