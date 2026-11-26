const express = require("express");

const app = express();
const PORT = 8080;

app.get("/user", (req, res) => {
  res.send("user data will be retrieved from the database!");
});

app.get("/user/xyz", (req, res) => {
  res.send("xyz test route!");
});

app.listen(PORT, () => console.log("server is running " + PORT));

// Note: In case you try to make a "POST" call with "/user" - you will get 'cannot POST /user'
// Note: In case you try to make a "GET" call with "/user/xyz" - you will get 'xyz test route!' because it matches exact path.
