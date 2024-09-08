const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const sampahOrderController = require("../controllers/sampahOrderController");
const upload = require("../middleware/upload");

router.get("/orders", sampahOrderController.getAllOrders);
router.get("/orders/acc", sampahOrderController.getMenunngu);
router.get("/orders/:id", sampahOrderController.getOrderById);
router.post(
  "/orders",
  upload.single("photo"),
  sampahOrderController.createOrder
);
router.put("/orders/:id", sampahOrderController.updateOrder);
router.delete("/orders/:id", sampahOrderController.deleteOrder);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", authController.getUser);

module.exports = router;
