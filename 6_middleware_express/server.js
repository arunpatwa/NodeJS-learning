const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//after the logger we can apply cors

//CORS==Cross Origin Resource Sharing
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://locahost:3500",
];

//to access our front end site from the backend we need to put it here

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      //callback(error,origin sent back)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//express has built in error handler by default

app.use(cors());

//built in middleware to handle urlencoded data
// in other words form data;
// 'content-type': application/x-www-form-urlencoded'

app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//server static files
// app.use(express.static(path.join(__dirname,'/public')))

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

app.get("/chain(.html)?", [one, two, three]);



// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

app.get("*", (req, res) => {
  res.status(404);
  if(req.accepts('html')){
  res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if(req.accepts('json')){
    res.json({error:"404 Not Found"});
  }
  else{
    res.type('txt').send("404 Not Found");
  }
});

//
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
