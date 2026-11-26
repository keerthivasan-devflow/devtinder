const express = require("express");

const app = express();

// SCENARIO 1 - Observe what happens - if there is any order change
// For example, if an API call is made to "/user", it first passes through
// the wildcard route "/" because it uses app.use(). If no error occurs, the
// request continues to "/user". If an error is intentionally thrown using
// throw Error(), the message "Exception handled gracefully will be displayed" appears.

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("error occured!");
  }
});

app.get("/user", (req, res, next) => {
  try {
    throw new Error("something bad occurs at your end!");
  } catch (err) {
    res.status(500).send("exception handled gracefully!");
  }
});

// SCENARIO 2 - If there is no try/catch block, then you might again encounter the random error message.
app.get("/user", (req, res, next) => {
  throw new Error("something bad occurs at your end!");
});

app.listen(5000, () => console.log("server is running"));
