const express = require("express");

const app = express();
const PORT = 8080;

// Best approach - For Error Handling in Request/Route Handlers
// Note - Here the error handled by catch block itself. This will not reach to app.use() at all.
app.get("/user", (req, res, next) => {
  try {
    throw new Error("Request could not be completed!");
  } catch (err) {
    res.status(500).send("Error managed successfully!");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Request could not be completed!");
  } else {
    res.send("Response received successfully!");
  }
});

app.listen(PORT, () => console.log("server is running " + PORT));
