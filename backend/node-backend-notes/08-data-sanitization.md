## Refer: mongoose-docs/validation.md

Data sanitization is typically performed in POST, PATCH, and PUT APIs.

If a field is marked as required, it must be included when inserting data into the database; otherwise, Mongoose will fail to insert the document into the collection.

## NPM Validator Package
`npm install validator`