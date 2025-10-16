const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("user data will be retrieved from the database!");
});

app.listen(5000, () => console.log("server is running on port 5000..."));

// Note: In case you try to make a POST call with "/user" - you will get 'cannot POST /user'