const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const productController = require("../controllers/product");
const { authenticateJWT } = require("../middleware/authenticator");

//routes
router.post(
  "/",
  // authenticateJWT,
  upload.single("productImage"),
  productController.create
);
//"single" means single image at a time. and then you
//mention the name you gave your input where you are uploading the image
//router.post("/signin", signinValidator, validationResult, productController);

router.get("/", productController.readAll);
router.get("/count", productController.readByCount);
router.get("/:productId", productController.read);

router.put(
  "/:productId",
  authenticateJWT,
  upload.single("productImage"),
  productController.update
);

router.delete("/:productId", authenticateJWT, productController.delete);

module.exports = router;
