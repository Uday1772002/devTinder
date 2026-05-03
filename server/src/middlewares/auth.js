const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //Read the token from req cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = userAuth;
