const express = require("express");

const app = express();

// step 1 - just throw an error for testing purpose and observe what happens
app.get("/user", (req, res, next) => {
  throw new Error("something bad occurs at your end!");
});

// step 2 - catching the error occured by step 1 and displaying it
// Alternative approach - For Error Handling in Request/Route Handlers
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("error occured!");
  } else {
    res.send("you've recieved the response successfully!");
  }
});

app.listen(5000, () => console.log("server is running"));
