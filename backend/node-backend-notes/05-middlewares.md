## Let's dive into request/route handler and middlewares

- Refer - `./app-use/scenario-06.js`

**1. Syntax** : `app.use(path, callback)`

- Path: could be;

  - A string representing a path.
  - A path pattern.
  - A regular expression pattern to match paths.
  - An array of combinations of any of the above.
  - **Note:** The 'path' is optional. When provided, it specifies the route for which the middleware will execute. If no path is given, the middleware will run for every incoming request, regardless of the URL.

- Callback functions; can be:
  - A middleware function.
  - A series of middleware functions (separated by commas).
  - An array of middleware functions.
  - A combination of all of the above.
  - **Note:** The 'callback' refers to a middleware functions. These functions are executed in the order they are defined and are often called 'route handlers.'

**2. How app.use() works?**

- In Express, `app.use()` is used to define middleware that match a certain path. When you use `app.use("/")`, it creates a route handler for the root URL `("/")` that applies to all requests, and it will be called for every incoming request regardless of the requested path since your first handler `(app.use("/"))` doesn't have any condition to check the URL path, it responds to all requests with the same response that matches a requested path at first but the issue here is that app.use() matches any HTTP method (GET, POST, etc.)
- To fix this, you should use more specific route definitions like `app.get("/product")` instead of using `app.use("/")`.
- While this approach works, it's not the most efficient or clean way to handle routing in Express. The preferred way is to use route-specific methods like app.get(), app.post(), etc., as shown in my previous response, for better clarity and performance. But using app.use() this way can be useful in certain cases where you want to apply middleware or route handling in a more dynamic manner.

**3. What is middleware vs route handler?**
The two functions below are middleware. When an API request is made, it passes through a series of middleware until the route handler sends the final response.

```js
app.use(
  "/",
  (req, res) => {
    console.log("Welcome to home!");
    res.send("This is my first response");
  },

  (req, res) => {
    console.log("Welcome to neighbour!");
    res.send("This is my second response");
  }
);
```

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

## Questions

1. What is middleware?
   Middleware is a function that has access to the request object (req), response object (res), and the next() function. It processes requests and can either send a response or pass control to the next middleware or handler using next().

   ```js
   app.use((req, res, next) => {
     console.log("Request received");
     next(); // Pass control to next handler
   });
   ```

   Middleware is used for tasks like logging, authentication, parsing data, etc

2. What is request handler?
   It is a general term for any function that handles an incoming HTTP request. It receives the request and sends a response back.

3. What is route handler?
   A route handler is a specific type of request handler that processes requests for a particular HTTP method and path combination. It typically sends a final response and doesn't call next().

4. Can a single route have multiple route handlers? Yes
5. Why do we need actually a middleware? I mean the `app.use()`
6. What is the difference between app.use() and app.all()?
7. If there is any request for /user/login, then the user needs to be authenticated/authorized?
8. If you send only two parameters then first will be treated as request, then response
9. If you send three parameters then first will be treated as request, then response and then next() function
10. If you send four parameters then first will be treated as err, then request, response and next() so the request handler function is more dynamic in express.js. Order matters a lot!
11. Can we pass a custom arguments to a request handler or middlware function?
12. Is this a good practice to place app.use("/") at the end of your application? yes by Akshay Saini but needs to be validated!
