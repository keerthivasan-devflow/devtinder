const express = require("express");

const app = express();

app.get("/admin/getusersdetails", (req, res, next) => {
  let token = "abc";
  let isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.send("fetch all the user details");
  } else {
    res.status(401).send("you're an unauthorized user so you cannot read data!");
  }
});

app.post("/admin/updateuser", (req, res, next) => {
    let token = "abc";
    let isAuthorized = token === "abc";
    if (!isAuthorized) {
      res.send("update the user details");
    } else {
      res.status(401).send("you're an unauthorized user so you cannot read data!");
    }
});

app.listen(5000, () => console.log("server is running"));