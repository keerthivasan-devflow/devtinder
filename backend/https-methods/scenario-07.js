const express = require("express");

const app = express();

// Authentication logic can be placed in a separate file and imported here to improve code efficiency.
app.use("/admin", (req, res, next) => {
  console.log("authentication is done!!");
  let token = "abc";
  let isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("you're an unauthorized user so you cannot read data!");
  } else {
    next();
  }
});

// The auth middleware will be skipped for this route because its path doesn't begin with '/admin/'.
app.get("/user", (req, res, next) => {
  res.send("fetch all the users details");
});

app.get("/admin/getusersdetails", (req, res, next) => {
  res.send("fetch all the users details");
});

app.post("/admin/updateuser", (req, res, next) => {
  res.send("update the user details!");
});

app.delete("/admin/deleteuser", (req, res, next) => {
  res.send("delete the user details!");
});

app.listen(5000, () => console.log("server is running"));