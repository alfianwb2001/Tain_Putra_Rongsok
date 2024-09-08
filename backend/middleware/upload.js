const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); // Folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.originalname); // Simpan file dengan nama yang unik
  },
});

// Set up multer dengan konfigurasi storage dan file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit ukuran file 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Tipe file tidak valid, hanya JPEG dan PNG yang diperbolehkan!"
        ),
        false
      );
    }
  },
});

// Ekspor instance upload yang sudah dikonfigurasi
module.exports = upload;
