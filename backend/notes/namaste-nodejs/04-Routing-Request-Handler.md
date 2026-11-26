## SCENARIO 1

- If you don't pass any route, route handler will be executed for all the routes which you try to encounter in the browser

## SCENARIO 2

- /
- /home
- /contact
- /about
  For everything the "/" route handler will be executed because "/" act as a wildcard character [matches any character or sequence of]

Similarly, the below "/devtinder" will be executed for all the below routes.

- /devtinder
  - /devtinder/users
  - /devtinder/login
  - /devtinder/contact
- When using app.use(), you need to be more specific with your paths, as shown in `scenario-04.js`. However, you might still encounter issues. For example, if you define a route for /home, a request to /home/products.