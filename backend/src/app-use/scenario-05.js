// Test the route handlers when the order or sequence changes

const express = require("express");

const app = express();
const PORT = 8080;

app.use("/about", (req, res) => {
  res.send("This is about page");
});

app.use("/contact", (req, res) => {
  res.send("This is contact page");
});

app.use("/", (req, res) => {
  res.send("Hello DevTinder!");
});

app.listen(PORT, () => console.log("server is running on " + PORT));

// Note: However, If you try to get something from the following routes: /xyz, /abc you will still get 'Hello DevTinder'
