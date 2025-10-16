const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send("user information!");
});

app.get("/user", (req, res) => {
  res.send("user data will be retrieved from the database!");
});

app.post("/user", (req, res) => {
  res.send("Save the user information in the database!");
});

app.patch("/user", (req, res) => {
  res.send("Update the user information in the database!");
});

app.delete("/user", (req, res) => {
  res.send("Delete the user data from the database!");
});

app.listen(5000, () => console.log("server is running on port 5000..."));