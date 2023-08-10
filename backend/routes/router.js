const express = require("express");
const imageController = require("../controllers/imageController");
const splitController = require("../controllers/splitController");
const emailController = require("../controllers/emailController");
const router = express.Router();
let multer = require("multer");

let uploadImage = multer({ storage: imageController.imageStorage });

router.get("/scan-receipt", imageController.scanReceipt);

router.post(
  "/upload-receipt",
  uploadImage.single("image"),
  imageController.scanReceipt
);

router.post("/split-bill", splitController.splitBill);
router.post("/send-email", emailController.sendEmails);

module.exports = router;
