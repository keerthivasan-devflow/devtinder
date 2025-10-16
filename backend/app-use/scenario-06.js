const express = require("express");

const app = express();

// SCENARIO 1 - Observe what happens when a route handler fails to send a response.
// Client hangs waiting for response - Like an infinite loop.
app.use("/user", (req, res) => {});

// SCENARIO 2 - Observe what happens when a route handler only executes a console.log().
// The handler executes and logs the message to the console, but since no response is sent to the client,
// the request hangs indefinitely waiting for a response.
app.use("/user", (req, res) => console.log("welcome to user dashboard!"));

// SCENARIO 3 - Observe what happens when a route handler executes both a console.log() and sends a response.
// The message gets logged to the console on the server, and the response is successfully sent to the client.
app.use("/user", (req, res) => {
  console.log("welcome to user dashboard!");
  res.send("This is my response");
});

// SCENARIO 4 - When multiple route handlers are present
// Only the first log and response will be executed
app.use(
  "/user",
  (req, res) => {
    console.log("welcome to user dashboard! - 1");
    res.send("This is my first response");
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 2");
    res.send("This is my second response");
  }
);

// SCENARIO 5 - If the first route handler doesn't send a response, the second route handler won't run, causing an infinite loop.
// This happens because next() was not called but the message gets logged to the console from the first route handler.
app.use(
  "/user",
  (req, res) => {
    console.log("welcome to user dashboard! - 1");
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 2");
    res.send("This is my second response");
  }
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
  }
);

// SCENARIO 7 - Both handlers contain console.log() and res.send(), with next() used.
// This will execute both handlers, but writing code this way is considered bad practice.
app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    res.send("This is my first response");
    next();
  },

  (req, res) => {
    console.log("welcome to user dashboard! - 1");
    // After running the code up to this point, Node.js will throw an error because a second response is attempted for the same route.
    // Error: 'Cannot set headers after they are sent'
    res.send("This is my second response");
  }
);

// SCENARIO 8 - The first route handler has next() and res.send() swapped
// In this case, next() runs before sending the response, so both handlers execute.
// Output:
// First console.log()
// Second console.log()
// Second response
// Finally - Error: 'Cannot set headers after they are sent'
// This happens because after next() completes, control returns to the first handler, attempting to send another response.
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
  }
);

// SCENARIO 9
app.use(
  "/user",
  (req, res, next) => {
    console.log("welcome to user dashboard! - 1");
    next();
  },

  (req, res, next) => {
    console.log("welcome to user dashboard! - 2");
    next();
  }
);

// Final output: Cannot GET /
// This happens because next() was added in the second route handler.
// Express.js expects another handler to follow, but none exists, so execution fails. But you will still get all the logs

// SCENARIO 10
// You will get all the logs and third response
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
  }
);

// SCENARIO 11 - The order of route handlers has been changed.
// Since order matters in Express.js, only the first route handler will execute.
app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 1");
  res.send("This is my first response");
});

app.get("/", (req, res, next) => {
  console.log("welcome to user dashboard! - 2");
  next();
});

app.listen(5000, () => console.log("server is running"));
