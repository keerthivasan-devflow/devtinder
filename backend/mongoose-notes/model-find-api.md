findOne will return an arbitary document or first document?

## Model.insertMany()
- We don't have a specific model for the `insertOne()` method; instead, we only have one for `insertMany()` in Mongoose.
- Parameters:
 - documents → Object / Array of Objects
 - options → Object
    - To specify options, Mongoose expects the documents to be passed in as an array
    - There are many options available, but only the following are essential: ordered, rawResult and lean.

**What is the ordered option?**
- ordered: true (default) → MongoDB will stop the insertion process as soon as it encounters an error with any document.
- ordered: false → MongoDB will continue inserting documents even if it encounters an error with one or more documents.

Note: If any document in the users array is missing a required field or has an invalid field, the whole operation will fail when ordered: true.

**What is the rawResult option?**
- rawResult: false (default) → This method will return an array of the inserted documents. It's the simpler and more common option for most applications, especially when you're just looking to confirm the documents were inserted correctly.

- rawResult: true → which contains detailed information about the operation. This includes low-level details like the insertedCount, insertedIds, and other internal information related to the insert operation. (OR) If you need to handle potential failures at a more granular level or inspect the outcome in more depth.

**What is the lean option?**
- lean: true → It skips hydration; meaning they do not have Mongoose-specific methods and properties. This can make the documents faster to work with, as they are just plain objects without the overhead of Mongoose document features.

- lean: false (default) → When lean is set to false, the returned documents are Mongoose documents. These are full-fledged Mongoose document objects, which means they have access to Mongoose instance methods, like .save(), .remove(), and others.

*When to use lean: true:*
- Performance optimization: Reduce memory usage and improve performance. It's particularly useful when you're fetching large amounts of data and don't need to manipulate the documents beyond basic operations
- Read-only scenarios: If you're not planning to modify the documents and don't need Mongoose's instance methods.

*When to use lean: false*
- Full Mongoose functionality: like the ability to call .save(), .remove(), .populate(), or other Mongoose instance methods. If you are manipulating the documents, validating, or saving them back to the database later.

## Model.find()
- Parameters:
    - filters → Object
        - You can pass an object like { age: 25 } to filter documents by specific fields.
        - If you're looking for a document by its _id, you can pass the ObjectId directly.
    - projection
        - Object: Use { field: 1 (OR) 0 } to include/exclude fields.
        - String: Use 'field1 field2 -_id' to include/exclude fields.
        - Array of Strings: Use ['field1', 'field2'] to include fields.
    - options

## select property
- `select` at schema level
- All the fields will be included by default in query results.
- The password field will be excluded automatically because of the select: false property. If you still want to include the password field in a particular query, you can explicitly use the select method on the query like this:
    `Example: User.find({ name: 'John' }).select('+password');`

## Model.findById()
- Parameters: id, projection, options
- Finds a single document by its _id field. findById(id) is almost* equivalent to findOne({ _id: id }). If you want to query by a document's _id, use findById() instead of findOne().
- The id is cast based on the Schema before sending the command. Why does this matters? In case used something like findOne({ _id: '605c72ef153207f0e4b69f3f' }), mongoose will give an unexpected result.

Note: Except for how it treats `undefined`. If you use findOne(), you'll see that findOne(undefined) and findOne({ _id: undefined }) are equivalent to findOne({}) and return arbitrary documents. However, mongoose translates findById(undefined) into findOne({ _id: null }) which means it will attempt to find a document with the _id field set to null. In most cases, this will return no document because _id is typically a unique identifier for each document and doesn't have a value of null by default.

## Model.findByIdAndDelete()
- Parameters: id, options


// To update user's data in future if needed
router.patch("/profile/edit/:id", userAuth, async (req, res) => {
  const id = req.params?.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "firstname",
      "lastname",
      "phone",
      "gender",
      "password",
    ];
    const isAllowedUpdated = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowedUpdated) {
      throw new Error("Cannot update your profile!");
    }

    const user = await User.findByIdAndUpdate({ _id: id }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

## Questions
1. What is hydration in mongoose? Refers to the process where a plain JavaScript object is converted into a Mongoose document. Hydration involves such as casting, validation and can apply defaults
2. How can you exclude fields using the string method in `Model.find()`? -fieldname
3. Is it possible to exclude fields when using array syntax with `Model.find()`? No, it's not possible