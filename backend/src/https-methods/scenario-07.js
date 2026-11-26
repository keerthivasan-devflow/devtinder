const express = require("express");
const { adminAuth } = require("../middlewares/admin");

const app = express();
const PORT = 8080;

app.use("/admin", adminAuth);

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

app.listen(PORT, () => console.log("server is running " + PORT));
