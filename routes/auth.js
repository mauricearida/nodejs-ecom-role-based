const express = require("express");
const router = express.Router();

const {
  signupValidator,
  validationResult,
  signinValidator,
} = require("../middleware/validator");
const { signupController, signinController } = require("../controllers/auth");
//imports finish here........................

router.post("/signup", signupValidator, validationResult, signupController);
router.post("/signin", signinValidator, validationResult, signinController);

module.exports = router;
