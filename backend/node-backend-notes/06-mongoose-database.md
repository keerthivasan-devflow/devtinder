## MONGOOSE LIBRARY

## PART - 1
- **Step 1: Install and include the mongoose in your project**
 - `npm install mongoose`
 - `const mongoose = require("mongoose")`
- **Step 2: make a connection to the database**
 - `mongoose.connect(connection_string_URL)`
    - Note: Since the above statement returns a promise and ensures that whether the database connection is established or not Therefore it can be wrapped into async/await function() like below:

    ```
    # This will connect to the cluster where you will have multiple databases in the MongoDB Compass
    const connectDB = async () => {
        await mongoose.connect(connection_string_URL/database-name)
    }

    connectDB()
        .then(() => console.log("Database connection is established successfully"))
        .catch(() => console.log("Database connection failed!"));
    ```
- **Step 3: Include database.js in your app.js file and start your node app**
    const express = require("express");
    require("./config/database");
    const PORT = 5000;
    const app = express();
    app.listen(PORT, () => console.log("server is running: 5000"));

## PART - 2
- **Step 4: Define Mongoose Schema and SchemaTypes:**
- **Step 5: Define a model for your schema**


## PART - 3
- Refer schemas.md from mongooes-docs for indexes, string, number and other options

## Questions
1. What is the issue with specifying the `unique` option as `true` for fields like `firstname`, `lastname`, `gender`, etc.?
2. Is it necessary to define an index as `true` when the `unique` option is already set to `true`?
3. If creating an index improves query performance, should we create an index for each field in Mongoose?
4. What is path-level and schema-level index?