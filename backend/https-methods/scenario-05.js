const express = require("express");

const app = express();

app.get(/.*fly$/, (req, res) => {
  res.send("On the fly!");
});

app.get("/user", (req, res)=>{
  console.log(req.query)
  res.send("User Information Successfully registered!")
})

app.listen(5000, () => {
  console.log("server is running on port 5000!");
});

/*
Routes with Regular Expression
 1. /a(bc)?d - bc becomes optional now - /ad, /abcd
 2. /ab?c - b becomes optional now - /ac, /abc
 3. /ab+c - /abc, /abbc, /abbbbbbbbc (b shoud exist at least one or more times...)
 4. /ab*c - /abc, /abkeerthivasanc, /abbbc (route should starts with ab & ends with c, anything could be in between)
*/

// Regular Expression also could be passed in place of routes
// /.*fly$/ - starts with any letter or words but should end with the word 'fly'