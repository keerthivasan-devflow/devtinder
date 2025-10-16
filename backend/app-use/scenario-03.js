const express = require("express")

const app = express()

app.use("/", (req, res) => {
  res.send("Hello DevTinder!");
});

app.use("/about", (req, res) => {
  res.send("This is about page");
});

app.use("/contact", (req, res) => {
  res.send("This is contact page");
});

app.listen(5000, () => {
  console.log("server is running");
});
