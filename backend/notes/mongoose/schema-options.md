**option: autoCreate → autoCreate: false / true (default)**
By default, Mongoose automatically creates a collection based on the model's name (in this case, Test would correspond to a tests collection in MongoDB). However, when you set autoCreate: false, it prevents Mongoose from automatically creating the collection when you start the application.

- If the collection doesn't exist, Mongoose won't create it automatically at the start of the application.
- If you manually call Test.createCollection(), it will create the collection if it doesn't already exist (but only when explicitly instructed to do so).
- If the collection already exists, Test.createCollection() will be a no-op (i.e., it won't create or alter the collection).

**option: capped**
A capped collection automatically removes older documents when it exceeds its defined size or document limit.
A non-capped collection will continue to grow without automatic deletion of older documents.

**option: collection → collection: 'Any userdefined collection names'**
`Example: collection: 'data'`

**option:strict**
- Allowing arbitrary documents can make it harder to maintain data consistency and integrity

**option: id & option: _id**
* id: This is a virtual getter for the _id field, and it's meant to provide an alias without the underscore.
* _id: This is the actual field that stores the document's unique identifier in MongoDB. It's present in all documents by default unless explicitly disabled.


## Questions
What is meant by capped or non-capped collection in mongodb?