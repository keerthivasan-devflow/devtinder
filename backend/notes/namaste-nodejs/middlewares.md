


**4. What is mount point?**
The request path inside the middleware will be the following for `/product` mount point:

- `Example: app.use("/product") - /`
- `Example: app.use("/product/sale") - /sale`
- `Example: app.use("/product/category/electronics") - /category/electronics`

Whenever an API call is made, it passes through a chain of middleware before reaching the request handler, which is responsible for sending the response back to the user.

# MIDDLEWARE:

In Node.js, **middleware** refers to functions that are executed during the request-response cycle in an Express application (or any web framework). Middleware functions have access to the **request** (`req`), the **response** (`res`), and the **next** function in the application's request-response cycle.

Middleware is used for a variety of tasks such as:

1. **Request modification**: Modifying the `req` object before it reaches the route handler (e.g., parsing incoming data, setting request headers).
2. **Response modification**: Modifying the `res` object before sending the response back to the client (e.g., setting headers, modifying response data).
3. **Authentication and authorization**: Checking if a user is authenticated or authorized to perform a specific action.
4. **Logging**: Logging details about the incoming request, such as method, URL, and timestamps.
5. **Error handling**: Catching errors and sending appropriate responses to the client.

### How Middleware Works:

In Express, middleware is executed in the order it is added to the app, and each middleware can either:

- **End the request-response cycle** by sending a response to the client, or
- **Pass control to the next middleware** by calling `next()`.

### Types of Middleware:

1. **Application-level middleware**: Bound to an instance of an Express app (e.g., `app.use()`).
2. **Router-level middleware**: Bound to specific router instances (e.g., `router.use()`).
3. **Error-handling middleware**: Specifically for handling errors in Express (has 4 parameters: `err`, `req`, `res`, `next`).
4. **Built-in middleware**: Provided by Express (e.g., `express.json()`, `express.static()`).
5. **Third-party middleware**: Middleware provided by external libraries (e.g., `body-parser`, `morgan`, `cors`).

### Example of Middleware:

```javascript
const express = require("express");
const app = express();

// Basic middleware function
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass the request to the next middleware or route handler
});

// Route handler
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Error-handling middleware (must be defined last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(1604, () => console.log("Server is running on port 1604"));
```

### Key Points About Middleware:

- **Order matters**: Middleware is executed in the order it’s defined. If a middleware doesn’t call `next()`, the request-response cycle will end, and subsequent middleware won't be executed.
- **Can modify request/response objects**: Middleware can change the `req` or `res` objects before passing them to the next middleware.
- **Can stop the request-response cycle**: If middleware sends a response (using `res.send()`, `res.json()`, etc.), it ends the cycle, and subsequent middleware will not be executed.
- **Error handling**: Middleware can be used to catch errors and handle them, especially when used as error-handling middleware.

### Example of Common Middleware Usage:

```javascript
const express = require("express");
const app = express();

// Built-in middleware to parse incoming JSON request bodies
app.use(express.json());

// Custom middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Route
app.get("/home", (req, res) => {
  res.send("Welcome to the home page!");
});

// Alternative way of error-handling middleware - err should be the first parameter
// You can make a wildcard match so that it works for all the routes that starts with "/"
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!");
  } else {
    // send the actual response
  }
});

app.listen(1604, () => console.log("Server running on port 1604"));
```

### In summary:

Middleware is essentially a series of functions that have the ability to modify the request, perform actions, and even terminate the request-response cycle. It provides a powerful mechanism to customize how the app handles HTTP requests and responses, enabling things like logging, authentication, error handling, and much more.