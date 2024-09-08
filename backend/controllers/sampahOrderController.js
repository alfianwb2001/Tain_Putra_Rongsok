// controllers/sampahOrderController.js
const SampahOrder = require("../models/sampahOrderModel");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

exports.getAllOrders = (req, res) => {
  SampahOrder.getAllOrders((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.getOrderById = (req, res) => {
  const { id } = req.params;
  SampahOrder.getOrderById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(results[0]);
  });
};

exports.createOrder = (req, res) => {
  const orderData = {
    users_id: req.body.users_id,
    plastik: req.body.plastik,
    kertas: req.body.kertas,
    besi: req.body.besi,
    botol_kaca: req.body.botol_kaca,
    beling_kaca: req.body.beling_kaca,
    elektronik: req.body.elektronik,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    image_path: req.file ? req.file.filename : null,
  };

  SampahOrder.createOrder(orderData, (err, result) => {
    if (err) {
      console.error("Error creating order:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Order created successfully",
      sale_id: result.insertId,
    });
  });
};

exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const orderData = req.body;
  SampahOrder.updateOrder(id, orderData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully" });
  });
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  SampahOrder.deleteOrder(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  });
};

exports.getMenunngu = (req, res) => {
  SampahOrder.getOrderByMenunggu((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};
