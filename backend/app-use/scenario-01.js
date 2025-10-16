const express = require("express");

const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log("server is running"));

// After writing these lines of code, if you run your localhost on port 5000,
// the server will start listening for incoming requests and also handle incoming requests and send the response back.

// If you stop executing the script in the terminal and then try to access your
// localhost with the same port number, you will encounter the error message "This site cannot be reached."
// because your server is inactive!

// If you're not using the nodemon package, make sure to save your code after making
// modifications and re-execute the `app.js` file. Otherwise, you won't be able to see the recent changes.
