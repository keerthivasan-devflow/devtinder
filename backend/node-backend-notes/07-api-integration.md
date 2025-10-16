## How to pass dynamic data from the end user (POSTMAN)

## Body Parser
    To access req.body, you need to make sure that the body parsing middleware is set up in your Express application. By default, Express does not parse the body of requests, so you have to use a middleware like express.json() or express.urlencoded() to parse the body content. Without these middlewares, req.body will be undefined.

## Questions
1. Difference between JavaScript objects and JSON
2. What is the purpose of the `express.json()` middleware? converts JSON into JavaScript Objects.
3. Why do we place `express.json()` inside `app.use()`?
    Any function passed to `app.use()` will apply to all routes on the server if no specific route is provided.
4. What is middleware? write once and make use of it as many times as you would like to.

## TOPICS
- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplicate email ids, which object returned
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID