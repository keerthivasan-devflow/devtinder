const express = require("express");

const app = express();
const PORT = 8080;

// SCENARIO 1 - Observe what happens when a route handler does not send a response.
// The client keeps waiting because the request is neither completed nor passed to the next handler.
app.use("/user", (req, res) => {});

// SCENARIO 2 - Observe what happens when a route handler only executes a console.log().
// The handler executes successfully and logs the message to the console, but since no response
// is sent to the client, the request remains pending indefinitely.
app.use("/user", (req, res) => console.log("welcome to user dashboard!"));

// SCENARIO 3 - Observe what happens when a route handler both logs a message and sends a response.
// The message is logged to the server console, and the response is successfully sent back to the client.
app.use("/user", (req, res) => {
  console.log("welcome to user dashboard!");
  res.send("This is my response");
});

// SCENARIO 4 - Observe what happens when multiple route handlers are defined, then only the first matching
// route handler will execute and send the response.

app.use(
  "/user",
  (req, res) => {
    console.log("welcome to user dashboard! - 1");
    res.send("This is my first response");
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 2");
    res.send("This is my second response");
  },
);

// SCENARIO 5 - If the first route handler does not send a response, the second route handler will not execute automatically.
// This happens because next() is not called, leaving the request pending even though the message is logged to the console.
app.use(
  "/user",
  (req, res) => {
    console.log("welcome to user dashboard! - 1");
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 2");
    res.send("This is my second response");
  },
);

// SCENARIO 6
// Both messages will be logged to the console, and the second response will be sent.
app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    next();
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 2");
    res.send("This is my second response");
  },
);

// SCENARIO 7 – Both handlers include console.log() and res.send(), and next() is invoked.
// This causes both handlers to run, but structuring code in this manner is generally considered poor practice.
app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    res.send("This is my first response");
    next();
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 1");
    // At this stage, Node.js will raise an error because the code attempts to send a second response for the same route.
    // Error: "Cannot set headers after they are sent"
    res.send("This is my second response");
  },
);

// SCENARIO 8 – The first route handler calls next() before res.send().
// As a result, control passes to the second handler, so both handlers run.
// Output sequence is:
// 1. First console.log()
// 2. Second console.log()
// 3. Second response
// 4. Then an error occurs: "Cannot set headers after they are sent"
// This happens because once next() finishes, execution returns to the first handler,
// which tries to send another response after headers have already been sent.

app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    next();
    res.send("This is my first response");
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 2");
    res.send("This is my second response");
  },
);

// SCENARIO 9
// Final output: "Cannot GET /"
// This occurs because next() was invoked in the second route handler. Express expects another handler to follow,
// but none is defined, so the request fails. However, all console logs will still be displayed.

app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    next();
  },

  (req, res, next) => {
    console.log("welcome to user dashboard! - 2");
    next();
  },
);

// SCENARIO 10
// All console logs will be displayed, and the third response will be sent.
app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    next();
  },

  (req, res, next) => {
    console.log("welcome to user dashboard! - 2");
    next();
  },

  (req, res, next) => {
    console.log("welcome to user dashboard! - 3");
    res.send("This is my third response");
  },
);

// SCENARIO 11 – The order of route handlers has been modified.
// Because Express.js executes handlers in sequence, only the first handler runs.
// Case 1
app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 1");
  next();
});

app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 2");
  res.send("This is my second response");
});

// Case 2
app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 1");
  res.send("This is my first response");
});

app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 2");
  next();
});

// Case 3
app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 1");
  next();
});

app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 2");
  next();
});

app.listen(PORT, () => console.log("server is running " + PORT));
