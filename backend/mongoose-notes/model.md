## Model Overview
 - In Mongoose, "compiling a schema into a model" refers to the process of creating a model from a schema definition. A schema defines the structure of the documents (data) that will be stored in a MongoDB collection. The model is a higher-level object that provides the methods and functionality to interact with the collection, such as querying, inserting, updating, and deleting data.
 - By compiling the schema into a model, Mongoose helps you work with MongoDB data more effectively in an object-oriented way.

## 1. Mongoose.model()
Example: `const User = mongoose.model("User", userSchema);`
- The first argument is the singular name of your model. Mongoose will use this name to create a collection in the database. By default, Mongoose will pluralize the name (e.g., "User" becomes a collection named "users" in MongoDB).
- The second argument is the schema.

Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()! you can no longer modify the schema, it essentially "freezes" the schema, so it's important to finalize everything before that step.

### What happens if model has not been created?
- No access to the database collection - cannot perform any CRUD operations
- No representation of the data structure: The schema (userSchema) defines how data should be structured, validated, and managed. Without defining a model, you wouldn't be able to apply the schema's rules and validation to incoming data.
- Potential errors: If you try to perform database operations (e.g., creating a new user) without defining the model, Mongoose will throw an error because it won't know how to handle the operations with a missing or undefined model.

To sum up, It is crucial to interact with the database and ensure the proper functioning of your application.

## 2. Model.create() - Returns Promise
- One or more documents to be inserted into the collections.
- It returns a Promise, so you can handle it with .then() and .catch() or use async/await.
- Automatically saves the new document(s) to the database. It's a shorthand for creating and saving documents without needing to first instantiate a new document using new Model() and then calling save() for every document.
- **Parameters:**
 - documents: Object / Array of object
 - options: Object
    - **Note:** To specify options, Mongoose expects the documents to be passed in as an array

**Example:**
User.create({ name: 'John Doe', age: 30, email: 'john@example.com' })
  .then(user => {
    console.log('User Created:', user);
  })
  .catch(err => {
    console.log('Error:', err);
  });

## 3. Model.createCollection(options)
- By default, if no indexes are specified, mongoose will not create the collection for the model until any documents are created. Use this method to create the collection explicitly.
- MongoDB is designed to be flexible and doesn't create a collection unless there is data to store in it. It conserves resources by not having empty collections in the database
- Note: You don't have to call this if your schema contains index or unique field. In that case, just use Model.init()

**Custom Indexes:** When you define custom indexes in the schema, MongoDB will create the collection when the model is first accessed/created, not waiting for any documents to be inserted. The index on the name field means that MongoDB needs to set up a B-tree index on the name field. To do this, MongoDB has to create the collection itself.

  If you add a custom index (like on the name field) after documents have already been inserted, MongoDB will build the index asynchronously on the existing data. 
- Modify the schema
- Apply the index: You would need to call User.syncIndexes() or User.createIndexes(), which triggers MongoDB to create the index on the name field (even though documents have already been inserted).
- Creating the Index: When you run User.syncIndexes(), Mongoose will communicate with MongoDB to create the index on the name field. MongoDB does this by:
  - Creating a B-tree index (a balanced tree structure) on the name field. The index is built asynchronously to avoid locking the database for a long period of time.
  - If you have already inserted data, MongoDB will scan the existing documents and build the index for those documents based on the values in the name field.

## 4. Model.createIndexes() - Returns Promise
## 5. Model.countDocuments() - It returns a Promise that resolves to an integer value representing the count.

## 6. Model.deleteMany(conditions, options) - Returns Query (deletedCount property)
## 7. Model.deleteOne(conditions, options) - Returns Query (deletedCount property)


## Model.prototype.save()
- When saving multiple documents, not as individual spread-out objects.
- This also actually returns a promise

const users = [
  new User({ name: 'Alice', email: 'alice@example.com' }),
  new User({ name: 'Bob', email: 'bob@example.com' })
];

### Example
User.save(...users);  // Incorrect to pass options to save()
User.save(users);  // Correct to pass options to save()

- `user`: This is usually an instance of a **Mongoose model** representing a document (record) in a MongoDB collection. The `user` object would typically be created from a **User schema** that defines the structure of a user document in the database (e.g., fields like `username`, `email`, `password`, etc.).

- `.save()`: used to **save a document to the database**. It checks whether the document is **new** (i.e., it has not been saved before) and, if so, inserts it into the database. If it's an **existing document**, it just updates the document.

- `await`: `user.save()` returns a **promise** because saving data to the database is an **asynchronous operation**. The `await` keyword makes the code wait for that operation to complete before moving on. It ensures that the document is correctly saved or updated before moving on to the next operation.