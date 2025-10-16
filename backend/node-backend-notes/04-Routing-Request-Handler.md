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

## Software Installation - Postman Application
- Create a New Workspace
- Create a New Collection for testing API's

## Questions
1. What happens if we accidentally delete node_modules?
2. Should we really need to push node_modules to server?
3. Why postman is so powerful or useful when compared to browers?
4. How do you make different API calls like GET/POST?