## Request Body Validation

Never trust req.body directly — an attacker can send arbitrary data through the API. Always validate and sanitize inputs before using them.

## Password Security

Plaintext storage is insecure — Passwords should never be stored in plaintext in a database. Instead, they must be stored in a securely hashed form.

## Installing a password encryption package

- Install the required package - `npm install bcrypt`
- Encrypt Passwords - `bcrypt.hash(UserPassword, SaltRounds).then(function(hash) {});`
- Compare Passwords - `bcrypt.compare(UserPassword, PasswordHash).then(function(result) {});`

## Questions

1. Why is storing passwords in plaintext within a database considered insecure and a poor security practice?
2. What does "information leakage" mean in the context of authentication systems?
   - For example: revealing that an entered email does not exist in the database.
   - Why is exposing too much detail through custom error messages discouraged, and how can we provide meaningful yet non‑revealing feedback instead?
3. If someone obtains another user’s encrypted (hashed) password, can they directly log in to that account?
4. If we copy and paste a hashed password string into the login form, will it allow access to the account?
