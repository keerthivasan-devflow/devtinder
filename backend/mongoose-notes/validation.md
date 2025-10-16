**Since backend APIs are highly vulnerable, it's crucial to implement validations to protect them from potential attacks.**

- API-Level Validation
- Schema-Level Validation

## Built-In-Validators

## Custom Error Messages
There are two equivalent ways to set the custom validator error message:
- Array syntax → min: [6, 'Must be at least 6, got {VALUE}']
- Object syntax → enum: { values: ['Coffee', 'Tea'], message: '{VALUE} is not supported' }

## Validation Error

## Cast Error
Before running validators, Mongoose attempts to coerce values to the correct type. This process is called casting the document. If casting fails for a given path, the error.errors object will contain a CastError object and will not run any validators.

Note: By default, Mongoose cast error messages look like Cast to Number failed for value "pie" at path "numWheels". You can overwrite Mongoose's default cast error message by the cast property on your SchemaType.

## Different Types Of Errors in Mongoose
https://mongoosejs.com/docs/api/error.html#Error.ValidatorError

## Questions
What are the two ways to add cutom validation?
What is the casting the document?
When do typically validation occurs?
What is the difference between validation error and cast error and its object properties?
