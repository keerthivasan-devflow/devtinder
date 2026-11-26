const express = require("express");

const app = express();
const PORT = 8080;

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

app.listen(PORT, () => console.log("server is running " + PORT));
