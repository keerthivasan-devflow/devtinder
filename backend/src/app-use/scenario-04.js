const express = require("express");

const app = express();
const PORT = 8080;

app.use("/home", (req, res) => {
  res.send("Hello DevTinder!");
});

app.use("/contact", (req, res) => {
  res.send("This is contact page");
});

app.listen(PORT, () => console.log("server is running " + PORT));

// Note: If you try to access "/", you will get "Cannot GET /" because only two specific routes are defined.
// However, accessing "/home/products" will still return "Hello DevTinder!" because it matches the "/home" route.
