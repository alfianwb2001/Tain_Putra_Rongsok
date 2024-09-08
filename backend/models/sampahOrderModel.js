// models/sampahOrderModel.js
const db = require("../config/db");

const SampahOrder = {
  getAllOrders: (callback) => {
    const query = "SELECT * FROM sampah_order";
    db.query(query, callback);
  },

  getOrderByMenunggu: (callback) => {
    const query = `SELECT * FROM sampah_order WHERE status = "Menunggu"`;
    db.query(query, callback);
  },

  getOrderById: (id, callback) => {
    const query = "SELECT * FROM sampah_order WHERE sale_id = ?";
    db.query(query, [id], callback);
  },

  createOrder: (orderData, callback) => {
    const query = "INSERT INTO sampah_order SET ?";
    db.query(query, orderData, callback);
  },

  updateOrder: (id, orderData, callback) => {
    const query = "UPDATE sampah_order SET ? WHERE sale_id = ?";
    db.query(query, [orderData, id], callback);
  },

  deleteOrder: (id, callback) => {
    const query = "DELETE FROM sampah_order WHERE sale_id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = SampahOrder;
