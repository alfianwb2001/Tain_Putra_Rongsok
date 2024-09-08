const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.getUser = (req, res) => {
  User.allUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.register = async (req, res) => {
  const { email, nama, nomer_telpon, password, role } = req.body;

  try {
    const existingUser = await new Promise((resolve, reject) => {
      User.findByEmail(email, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(
      { email, nama, nomer_telpon, password: hashedPassword, role },
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "User registration failed" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await new Promise((resolve, reject) => {
      User.findByEmail(email, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      users_id: user.users_id,
      role: user.role,
      nama: user.nama,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
