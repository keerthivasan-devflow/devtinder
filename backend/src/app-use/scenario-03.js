const express = require("express");

const app = express();
const PORT = 8080;

// The "/" route matches all incoming paths, so it will handle every request and prevent the routes defined
// below from being reached. Therefore, you will always get "Hello DevTinder!"
app.use("/", (req, res) => {
  res.send("Hello DevTinder!");
});

app.use("/about", (req, res) => {
  res.send("This is about page");
});

app.use("/contact", (req, res) => {
  res.send("This is contact page");
});

app.listen(PORT, () => {
  console.log("server is running " + PORT);
});
