const express = require("express");

const app = express();
const PORT = 8080;

app.get(/.*fly$/, (req, res) => {
  res.send("On the fly!");
});

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("User Information Successfully registered!");
});

app.listen(PORT, () => console.log("server is running " + PORT));

// Route Handlers along w/ Regular Expression
// 1. /ab?c - b becomes optional now - /ac, /abc
// 2. /ab+c - /abc, /abbc, /abbbbbbbbc (b shoud exist at least one or more times...)
// 3. /a(bc)?d - bc becomes optional now - /ad, /abcd
// 4. /ab*c - /abc, /abkeerthivasanc, /abbbc (route should starts with ab & ends with c, anything could be in between)

// Regular Expression also could be passed in place of routes
// /.*fly$/ - starts with any letter or words but should end with the word 'fly'
