const express = require("express");

const app = express();
const PORT = 8080;

app.get("/admin/getusersdetails", (req, res, next) => {
  let token = "abc";
  if (token === "abc") {
    res.send("fetch all the user details");
  } else {
    res
      .status(401)
      .send("you're an unauthorized user so you cannot read data!");
  }
});

app.post("/admin/updateuser", (req, res, next) => {
  let token = "xyz";
  if (token === "abc") {
    res.send("update the user details");
  } else {
    res
      .status(401)
      .send("you're an unauthorized user so you cannot read data!");
  }
});

app.listen(PORT, () => console.log("server is running " + PORT));
