const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    console.log("newUser", newUser);

    await newUser.save();

    res.json({ successMessage: "Registration success. Please sign in" });
  } catch (err) {
    console.log("signupController err", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errorMessage: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errorMessage: "Invalid credentials" });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    await jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpire },
      (err, token) => {
        if (err) console.log("jwt error", err);

        const { _id, username, email, role } = user;

        res.json({
          token,
          user: { _id, username, email, role },
        });
      }
    );
  } catch (err) {
    console.log("signinController err", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
