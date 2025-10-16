const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("user data will be retrieved from the database!");
});

app.post("/user", (req, res) => {
  res.send("save the user information in the database!");
});

app.patch("/user", (req, res) => {
  res.send("update the user information in the database!");
});

app.delete("/user", (req, res) => {
  res.send("delete the user data from the database!");
});

app.listen(5000, () => console.log("server is running on port 5000..."));