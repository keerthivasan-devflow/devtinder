const express = require("express");

const app = express();

// The below code will give the same output for the all the routes since it doesn't have any particular route.
app.use((req, res) => {
  res.send("Hello Keerthivasan from the server");
});

// The below code will give the same output for the all the routes since it doesn't have any particular route.
app.use("/", (req, res) => {
  res.send("Hello DevTinder!");
});

app.listen(5000, () => console.log("server is running"));

// Note: If you route denotes only "/" then whatsoever the following route which will come under "/" only
// Therefore you will get the output for all the different routes as "Hello DevTinder!"
// See the next example - 'scenario-05.js'
