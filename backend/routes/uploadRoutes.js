const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const router = express.Router()

const uploadDir = path.join(__dirname, "..", "uploads", "datasets")

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}
console.log("Upload directory:", uploadDir)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    cb(null, uploadDir)
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000 * 1024 * 1024 }
})

router.post("/", (req, res) => {

  upload.single("dataset")(req, res, function (err) {

    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err)
      return res.status(500).json({ message: "Multer upload error", error: err.message })
    }

    if (err) {
      console.error("Upload error:", err)
      return res.status(500).json({ message: "Upload failed", error: err.message })
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    res.json({
      message: "Dataset uploaded successfully",
      file: req.file.filename
    })

  })

})

module.exports = router