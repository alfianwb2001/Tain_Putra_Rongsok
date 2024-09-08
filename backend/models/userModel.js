const db = require("../config/db");

const User = {
  create: (userData, callback) => {
    const query =
      "INSERT INTO users (email, nama, nomer_telpon, password, role) VALUES (?, ?, ?, ?, 'user')";
    db.query(
      query,
      [
        userData.email,
        userData.nama,
        userData.nomer_telpon,
        userData.password,
        userData.role,
      ],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },

  allUsers: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      return callback(null, results[0]);
    });
  },
};

module.exports = User;
