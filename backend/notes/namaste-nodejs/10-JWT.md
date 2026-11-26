## Basic Definition Of Authentication | Authorization

- Authentication is the gatekeeper checking your ID at the entrance.
- Authorization is the rules inside the building that decide which rooms you can enter and what actions you can perform.
- Authentication = Identity, Authorization = Access Rights.

## Browser Cookies

## JWT

- To install JWT: `npm install jsonwebtoken`
- After validating the login credentials, the server generates a JWT [or authentication token] using the jsonwebtoken.
- This token is then sent back to the client and typically stored in a cookie for subsequent requests.

## Json Web Token [JWT]

- Three parts of JWT - Header | Payload | Verify Signature

## Schema Methods | Refer to schema-methods.md

## Questions

1. What is the distinction between encoding-decoding and encryption-decryption?
2. What is cookie hijacking and session hijacking?
3. Is a new token generated each time a user logs in?
4. How can you make a cookie or JWT token expire?
5. Why do some web applications allow cookies that never expire and provide lifetime access after a single login, such as Gmail?
6. What is an appropriate expiration time for cookies and JWT tokens? Does it vary from app to app?
7. Why is it important to expire tokens? For example, if a user logs in on a friend’s computer and forgets to log out, they could retain indefinite access to the account, creating a serious security risk.
