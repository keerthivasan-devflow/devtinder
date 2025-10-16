## Schemas
- Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection. While MongoDB is a NoSQL database and is generally schema-less (meaning that documents in a collection can have different fields), you can still define a schema using libraries like Mongoose in Node.js. 

## Why Schema
1. Validation: Ensures that documents in a collection follow a certain structure, with specified rules for data types, apply defaults and constraints (validation rules) and relationship between the collections.
2. Consistency: Helps maintain consistency across your documents and makes working with data easier, especially in applications with complex data models.
3. Indexing and Query Optimization: Mongoose schemas allow you to define indexes for fields, which improves query performance.

## Benefits Of Schemaless Database
- https://www.mongodb.com/resources/basics/unstructured-data/schemaless
- Greater Flexibility Over Datatypes
    - No pred-defined schema definitions.
    - Redesign the database structure easily in future without needing to have any difficulty like RDBMS.
    - No data truncation
        - In traditional databases, if data does not fit neatly into the predefined structure (schema), it may be truncated (cut off) or altered to match the schema's constraints. 
        - In a schemaless database, however, each piece of data is stored as-is, without modifications, even if it doesn't exactly match the expected structure. This ensures that all the raw data is preserved in its original form, providing complete information for future analysis, without any risk of losing or changing details

## SchemaTypes
You can think of a Mongoose schema as the configuration object for a Mongoose model. A SchemaType is then a configuration object for an individual property. A SchemaType says what type a given path should have, whether it has any getters/setters, and what values are valid for that path.

## `type` Key
type is a special property in Mongoose schemas. When Mongoose finds a nested property named type in your schema, Mongoose assumes that it needs to define a SchemaType with the given type.

## Schema Types 
- https://www.geekster.in/articles/schema-data-types-in-mongoose/

1. String / 'String'
2. Number / 'Number'
3. Date
4. Boolean
5. Array
6. Map
7. Int32
8. Double
9. Decimal128
10. Mixed
11. Buffer
12. ObjectId
13. UUID

## SchemaType options
You can declare a schema type using the type directly, or an object with a type property.

## All SchemaTypes Options - 9
## String Options - 8
## Number Options - 4
## Date Options - 3

## Indexes Options - 3
- **index: true -** MongoDB will create an index on a particular field. An index helps improve the speed of query operations like find(), findOne(), and others, especially for large datasets. By default, MongoDB creates an index for the _id field.
- **unique: true -** This ensures that the values in the field are unique across all documents in the collection(you don’t need to specify index: true explicitly when unique: true is set)
- **sparse: true -** it means that an index will only include documents that actually contain a value for the indexed field. This can be especially useful when you have documents with optional fields, and you don’t want to index documents that don’t have that field.

## ObjectId - 1 

## Boolean Datatype
By default, Mongoose casts the below values to true: true, 'true', 1, '1', 'yes'
Below values to false: false, 'false', 0, '0', 'no'

## Questions
1. What is schema?
2. Why to use a schema in mongoose?
3. What is the problem with `type` key in mongoose?
4. How to define custom schema type?
5. What are all the typically available schematypes in mongoose?
6. What is path? It just a field name. In addition to the type property, you can specify additional properties for a path
7. What are all the fields in Mongoose that could be immutable by nature? 
    Certain fields in Mongoose, such as `timestamps`, `_id`, and `version keys`, are immutable by default. Apart from these fields, Mongoose allows other fields to be updated.
8. What is schema-less database?
9. What are the benefits of it? 
10. Is schema-less really schema-less?