const express = require("express");

const app = express();
const PORT = 8080;

app.get("/user", (req, res) => {
  res.send("user data will be retrieved from the database!");
});

app.listen(PORT, () => console.log("server is running " + PORT));

// Note: In case you try to make a POST call with "/user" - you will get 'cannot POST /user'
