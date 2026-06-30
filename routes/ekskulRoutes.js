const express = require("express");
const router = express.Router();

const {
    getEkskul,
    getEkskulById,
    createEkskul,
    updateEkskul,
    deleteEkskul,
} = require("../controllers/ekskulController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getEkskul);
router.get("/:id", getEkskulById);
router.post("/", verifyToken, upload.single("upload_gambar"), createEkskul);
router.put("/:id", verifyToken, upload.single("upload_gambar"), updateEkskul);
router.delete("/:id", verifyToken, deleteEkskul);

module.exports = router;
