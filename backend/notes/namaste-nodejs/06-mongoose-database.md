## Mongoose Connection Set Up

```js
// SCENARIO 1
const mongoose = require("mongoose");
mongoose.connect(connection_string_URL); // Since the above statement returns a promise and ensures that whether the database connection is established or not Therefore it can be wrapped into async-await function() like below.
```

```js
// SCENARIO 2
// If you provide only the connection string, this connects to the cluster in MongoDB Compass, where you can access multiple databases.
const connectDB = async () => {
  await mongoose.connect(connection_string_URL);
};
```

```js
// SCENARIO 3
// If you provide only the connection string along with database name at the end of the connection string, this connects to a particular database only if it exists, otherwise it will create a new database.

// If you create a database using the code below, it will not appear in MongoDB Compass until you add at least one collection to it.

const connectDB = async () => {
  await mongoose.connect(connection_string_URL / database_name);
};
```

## Questions

1. What problems can arise from setting the `unique` option to true for fields such as firstname, lastname, or gender?
2. When the `unique` option is already set to true, is it still necessary to define index: true? (Refer to schemas.md for indexes, string, number, and other options.)
3. Since creating an index improves query performance, should we create an index for every field in a Mongoose schema?
4. What is the difference between a path-level index and a schema-level index?
