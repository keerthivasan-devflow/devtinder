## Step 1 - Features | Requirements Gathering

1. Create an acconut
2. Login page
3. Update your profile
4. Feed page explore
5. Send connection request
6. See our matches
7. See the request we have sent/received
8. Update your profile

## Step 2 - High Level Design (HLD)

1. What kind of microservices - Frontend(React) / Backend (Node, MongoDB)
2. Security Practices
3. Authentication
4. Database Design - which database can be used
5. Design API's

## Step 3 - Low Level Design (LLD)

### 1. Database design

- User Collections
  - firstname
  - lastname
  - email
  - password
  - gender
  - age
- ConnectionRequest
  - Who is sending a connection request (fromUserId)
  - To whom he/she is sending the connection request (toUserId)
  - What is the status of the request (status - pending | accepted | rejected)
  - Additional status could be - 'ignored'

Please note that no database is perfect. Therefore, we can revisit the design and approach at any time.

## 2. API design

- GET
  - /profile
  - /requests
- POST
  - /signup
  - /login
  - /profile
  - /send-request - To ignore and interest
  - /review-request - To accept and reject
- PUT | PATCH
  - /profile
- DELETE
  - /profile
