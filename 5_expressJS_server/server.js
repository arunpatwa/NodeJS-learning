const express = require("express");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//defining the routes
app.get("^/$|/index(.html)?", (req, res) => {
  // app.get("/", (req, res) => {
  // res.sendFile('./views/index.html',{root:__dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//using (.html)? -->make it optional
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
});
//301 used to redirect the side permanently

//Route Handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
    //moving to the next handler/function
  },
  (req, res) => {
    res.send("Hello World !");
  }
);

//calling multiple functions

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished all three functions");
};

app.get('/chain(.html)?',[one,two,three]);


app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
