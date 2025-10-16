https://jwt.io/

## Browser Cookies
- npm install cookie-parser
- just send a dummy cookie to user inside /login API - res.cookie("token", "IEXPK");
- create a GET /profile API and check if you get the cookie back
  `const cookies = req.cookies;`
  `console.log(cookies)`

## JWT
- To install JWT: `npm install jsonwebtoken`
- After login validation, create a JWT token using below method and send it to user in cookie
  To create a JWT token: `jwt.sign(payload, secretOrPrivateKey, [options, callback])`
- Read the cookie inside the /profile API and find the authenticated user
  To verify a JWT token: `jwt.verify(token, secretOrPublicKey, [options, callback])`
- Create a userAuth middleware and include in /profile and /sendconnection API request
- Set the expiry time to cookie and JWT to 7 days

## Schema Methods
- Refer: mongoose-docs/schema-methods.md

## Questions
1. What is the distinction between encoding/decoding and encryption/decryption?
2. What does JWT stand for?
3. What are the three components of a JWT?
4. What is cookie hijacking and session hijacking?
5. Is a new token generated every time a user logs in?
6. How can you make a cookie or JWT token expire?
7. What is an appropriate expiration time for cookies and JWT tokens? depends on app-to-app
8. Why is it important to expire the token?
   - For example, if a user logs in on a friend's computer and forgets to log out, they could potentially have access to their account indefinitely. This could pose a serious security risk.

## TOPICS
- install cookie-parser
- just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create e JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)



Cookie hijacking is a type of cyberattack where an attacker steals a user's session cookies to gain unauthorized access to their account or web session. Cookies are small pieces of data stored by web browsers, often used to keep users logged in or remember their preferences.

When an attacker successfully hijacks a user's cookies, they can impersonate the user by using the stolen cookie, which often contains session data or authentication tokens. This can allow them to access sensitive information or perform actions on the user's behalf without their knowledge or consent.

Cookie hijacking can occur in various ways, including:

1. **Man-in-the-middle (MITM) attacks**: If the connection between the user and the server is not encrypted (e.g., using HTTP instead of HTTPS), attackers can intercept and steal cookies during transmission.
2. **Cross-site scripting (XSS)**: Malicious scripts can be injected into websites to steal cookies from users who visit those sites.
3. **Phishing**: Attackers might trick users into visiting a malicious website that steals their cookies.
4. **Malware**: Software installed on a user's device could steal cookies directly from the browser.

To prevent cookie hijacking, it's essential to use encrypted connections (HTTPS), set secure cookie flags (e.g., `HttpOnly`, `Secure`), and ensure proper website security to prevent vulnerabilities like XSS.

The ease with which a cookie can be stolen depends on various factors, such as the security measures in place, the type of cookie, and the attack method used. While cookies themselves are not inherently insecure, certain circumstances can make them more vulnerable to theft.

Here are some factors that influence how easily a cookie can be stolen:

### 1. **Unencrypted Connection (HTTP vs. HTTPS)**

- If a website uses **HTTP** instead of **HTTPS**, the data (including cookies) transmitted between the user's browser and the server is unencrypted. This makes it much easier for attackers to **intercept** and steal cookies using techniques like **Man-in-the-Middle (MITM) attacks**.
- **HTTPS** encrypts the data, making it much harder for attackers to steal cookies during transmission.

### 2. **Insecure Cookie Settings**

- Cookies can be set with attributes that enhance security. If these attributes are not properly configured, cookies become more vulnerable:
  - **HttpOnly**: If this flag is not set, cookies can be accessed by client-side scripts (JavaScript), making them vulnerable to **Cross-Site Scripting (XSS)** attacks.
  - **Secure**: Without this flag, cookies can be sent over an unencrypted HTTP connection, increasing the risk of interception.
  - **SameSite**: If this attribute isn't set, cookies might be sent in cross-site requests, increasing the chances of **Cross-Site Request Forgery (CSRF)** attacks.

### 3. **Cross-Site Scripting (XSS)**

- If a website is vulnerable to **XSS attacks**, attackers can inject malicious scripts into web pages that run in the context of another user's session. If the cookies are accessible to client-side JavaScript (e.g., when `HttpOnly` is not set), the attacker can steal them.

### 4. **Weak Authentication/Session Management**

- If a website has weak authentication or session management practices (such as allowing long session lifetimes or failing to validate sessions securely), an attacker may have more time to hijack cookies and impersonate the user.

### 5. **Phishing and Social Engineering**

- **Phishing attacks** can trick users into revealing their cookies or session data. For example, attackers might lure users into visiting a malicious website that steals cookies or tricks them into providing login information that lets the attacker hijack their session.

### 6. **Browser Vulnerabilities**

- If a user’s browser has security flaws, these could be exploited to steal cookies. Attackers could leverage browser vulnerabilities to gain unauthorized access to cookies stored locally on a user's device.

### 7. **Malware**

- If the user’s device is infected with malware, attackers may be able to access the cookies stored on the device and transmit them back to the attacker.

### **Preventing Cookie Theft**

While cookies can be vulnerable under certain circumstances, strong security measures can significantly reduce the risk:

- **Always use HTTPS** to encrypt data in transit.
- Use **secure cookie flags** (`HttpOnly`, `Secure`, `SameSite`).
- **Regularly clear session cookies** to limit the window of opportunity for attackers.
- Employ **multi-factor authentication (MFA)** to reduce the reliance on cookies for authentication.
- Keep **browsers and devices secure** from malware and vulnerabilities.

In summary, while cookies can be stolen under certain conditions, implementing strong security practices can make it much more difficult for attackers to gain unauthorized access.
