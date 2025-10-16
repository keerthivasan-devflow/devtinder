const express = require("express");

const app = express();

app.use("/home", (req, res) => {
  res.send("Hello DevTinder!");
});

app.use("/contact", (req, res) => {
  res.send("This is contact page");
});

app.listen(5000, () => console.log("server is running"));

// Note: Now if you try to get "/" - cannot GET / because there are totally 2 specific routes defined over there.
// But You may still encounter issue when you're trying to get /home/products