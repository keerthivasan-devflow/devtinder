const express = require("express");

const app = express();
const PORT = 8080;

// Step 1 – Throw an error intentionally for testing and observe the behavior that follows.
app.get("/user", (req, res, next) => {
  throw new Error("Server temporarily unavailable!");
});

// step 2 - Handling errors within request or route handlers.
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Server temporarily unavailable!");
  } else {
    res.send("you've recieved the response successfully!");
  }
});

app.listen(PORT, () => console.log("server is running " + PORT));
