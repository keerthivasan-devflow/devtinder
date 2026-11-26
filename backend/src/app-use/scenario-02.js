const express = require("express");

const app = express();
const PORT = 8080;

// Case 1: The code below returns the same response for all routes because no specific route is defined.
app.use((req, res) => {
  res.send("Hello! from the server");
});

// Case 2: The code below returns the same response for all routes because no specific route is defined.
app.use("/", (req, res) => {
  res.send("Hello DevTinder!");
});

app.listen(PORT, () => console.log("server is running " + PORT));

// Note: If the route is defined as "/", it acts as a base route for all paths. As a result, all different routes
// will return "Hello DevTinder!".
// See the next example: 'scenario-05.js'.
