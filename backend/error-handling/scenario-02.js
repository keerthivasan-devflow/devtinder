const express = require("express");

const app = express();

// Best approach - For Error Handling in Request/Route Handlers
// Note - Here the error handled by catch block itself. This will not reach to app.use() at all.
app.get("/user", (req, res, next) => {
  try {
    throw new Error("something bad occurs at your end!");
  } catch (err) {
    res.status(500).send("exception handled gracefully!");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("error occured!");
  } else {
    res.send("you've recieved the response successfully!");
  }
});



app.listen(5000, () => console.log("server is running"));