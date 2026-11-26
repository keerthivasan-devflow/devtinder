const adminAuth = (req, res, next) => {
  console.log("authentication is done!!");
  let token = "abc";
  let isAuthorized = token === "abc";
  if (!isAuthorized) {
    res
      .status(401)
      .send("you're an unauthorized user so you cannot read data!");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
