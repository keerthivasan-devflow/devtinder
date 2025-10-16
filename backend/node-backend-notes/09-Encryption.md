## Password Encryption
- Storing passwords as plaintext in a database is not a best practice; they should instead be stored in an encrypted form.

**npm install bcrypt**
- Use the following method to strengthen the password.
`bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {});`

- Use the following to compare password
`bcrypt.compare(myPlaintextPassword, hash).then(function(result) {});`

- It is not considered a good practice to populate data through an API like:
`const user = new User(req.body);`

- Instead, use the following format, ensuring that any additional fields sent through the API are ignored.
```
const user = new User({
    firstname,
    lastname,
    email,
    gender,
    password: PasswordHash
})
```

## User Login API Implementation

## Questions
1. Storing passwords as plaintext in a database is not a best practice; why?
2. What is information leaking?
 - **Entered email is not exist in database**
 - Exposing too much information through custom error messages is not advisable. While the error should not reveal exact details to the attacker, it should still provide a meaningful and implicit message.