const express = require("express");

const app = express();
const PORT = 8080;

// Since all routes are defined as "/user" and app.use() is applied, the response returned will be "user details or information".
app.use("/user", (req, res) => {
  res.send("user details or information!");
});

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
