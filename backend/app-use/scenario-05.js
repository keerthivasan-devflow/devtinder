// Test the route handlers when the order or sequence changes

const express = require("express");

const app = express();

app.use("/about", (req, res) => {
  res.send("This is about page route");
});

app.use("/contact", (req, res) => {
  res.send("This is contact page route");
});

app.use("/", (req, res) => {
  res.send("Hello DevTinder");
});

app.listen(5000, () => console.log("server is running"));

// Note: However, If you try to get something from the following route: /xyz, /abc you still get 'Hello DevTinder'
