## Instance Methods
- 3 ways to define instance methods
    - Schema.methods.methodname = function(){}
    - You can also use the Schema.method(string/object, function) helper.
            ```
            schema.method({
                purr: function () {},
                scratch: function () {}
            });
            ```
    - directly pass instance methods to schema definition as a argument(Object)
- Do not declare methods using ES6 arrow functions, this explicitly prevents binding this, so your method will not have access to the document and the example will not work.

## Statics Methods - Reusability / Database Queries / Abstraction
- In Mongoose, static methods are functions that are defined on the model itself (not on individual instances of the model). These methods are accessible directly from the model and are typically used for operations that apply to the entire collection of documents.

    ```
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    name: String,
    email: String
    });

    // Defining a static method using Schema.statics
    userSchema.statics.findByEmail = function(email) {
    return this.find({ email: email });
    };

    const User = mongoose.model('User', userSchema);

    // Inside the app.js, include the following:
    User.findByEmail('user@example.com').then(users => {
    console.log(users);
    });
    ```

## POINTS TO REMEMBER
- When performing database operations using APIs like app.get() or app.post(), always use the async/await method.
- In Mongoose, any property(passed through the API) that isn't defined in the schema will not be saved to the database.

## Questions
**1. Why do need an `instance method` in schema?**
- **Code Reusability / Separation of concerns / Scalability / Testability / Consistency and DRY Principle**
- Instead of repeating the password validation logic (using bcrypt.compare()) in every place where you need to validate the password, you centralize this logic in one place, within the schema definition. The schema-level method allows you to call validatePassword() on any instance of the User model. This ensures that the request handler focuses on handling requests (getting inputs, managing HTTP responses) rather than dealing with business logic.

**2. What is the purpose of creating a `statics method` in schema?**
**3. What is the key difference between instance and statics methods in schema?**
- Instance Methods: Operate on individual instances of the model. These methods are called on specific documents and typically access this, which refers to the instance (document).

- Static Methods: Operate on the entire model (or collection of documents). These methods are called directly on the model itself and typically don't have access to this as an instance.