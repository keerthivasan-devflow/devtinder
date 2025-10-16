const express = require("express");
const app = express();



app.use("/home", (req, res)=>{
    res.send("this is my home page")
})

app.use("/", (req, res) => {
  res.send("server responded successfully");
});

app.listen(5000, () => console.log("server is listening to incoming request!"));
