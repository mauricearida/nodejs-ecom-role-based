const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ errorMessage: "No token. Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);

    // if (decoded) {
    //   console.log("decoded", decoded);
    // } else {
    //   console.log(" not decoded", decoded);
    // }
    req.user = decoded.user;

    next();
  } catch (err) {
    console.log("jwt error", err);
    res.status(401).json({
      errorMessage: "Invalid token",
    });
  }
};
