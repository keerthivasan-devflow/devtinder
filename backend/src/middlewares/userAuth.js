const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token)
      throw new Error("Invalid or expired token");

    const decodedToken = jwt.verify(token, "KPY23HNOA");
    const { _id } = decodedToken;
    const user = await User.findById(_id);

    if (!user)
      return res.status(404).send("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error occured: " + err.message);
  }
};

module.exports = { userAuth };
