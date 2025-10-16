## Project Folder Setup - Episode 3
1. npm init
2. npm install express
3. create a src folder
4. create a file 'app.js' as an entry point file

### NPM Packages
- express
- mongoose
- nodemon
- cookie-parser
- validator
- bcrypt
- jsonwebtoken

### Need to discuss
1. What is cluster in mongodb?
2. What is model in mongodb?
3. What is middleware?
4. How app.use() differs from app.#METHOD()
5. express itself is a middleware or express provides a feature of middleware?
6. If mongodb is schemaless, why do we need schema? Where it can be useful the schemaless structured database

- What is route handler? (Request Handler | Controller)
- What is the default http method of a URL?
- List out various HTTP methods
- If there is a route like app.get("/user"), whether this will be called for post method?
- Can we have same route for different HTTP methods like app.get("/user") and app.post("/user") ?


### API's Lists
- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- GET /profile/edit
- GET /profile/reset/password

- POST - /request/send/interested/:userId
- POST - /request/send/ignored/:userId
- **POST - /request/send/:status/:userId** - Dynamic API


- POST - /request/review/accepted/:requestedId
- POST - /request/review/rejected/:requestedId
- **POST - /request/review/:status/:requestedId** - Dynamic API

- GET - /user/connections
- GET - /user/feed/
- GET - /user/requests


### Git Commands

- To add only modifies and deleted files but not untracked any new files
- `git add -u`
- `git diff --name-only --diff-filter=M | xargs git add`

- `git ls-files --deleted -z | xargs -0 git add`
- `xargs -0 git add adds only those deleted files to the staging area.`