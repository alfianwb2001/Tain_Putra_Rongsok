const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:5000", // Allow only this origin
    credentials: true, // Allow cookies to be sent
  })
);
