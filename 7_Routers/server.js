const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const corsOptions=require('./config/corsOptions')

const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//after the logger we can apply cors


app.use(cors(corsOptions));

//express has built in error handler by default

app.use(cors());

//built in middleware to handle urlencoded form data
// in other words form data;
// 'content-type': application/x-www-form-urlencoded'

app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//server static files
//we are using public folder for the use of CSS,images and everything which is publically defined for the pages to display
app.use('/',express.static(path.join(__dirname,'/public')))
// app.use('/subdir',express.static(path.join(__dirname,'/public')))


// if we apply this then all routes will go into this
// app.use('/*',require(''))
//that why we use above routes to write using '/'


//Routes

app.use('/',require('./routes/root'));

// app.use('/subdir',require('./routes/subdir'));
app.use('/employees',require('./routes/api/employees'));

//Route Handlers

//commenting all this after coming to router

// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attempted to load hello.html");
//     next();
//     //moving to the next handler/function
//   },
//   (req, res) => {
//     res.send("Hello World !");
//   }
// );

// //calling multiple functions

// const one = (req, res, next) => {
//   console.log("one");
//   next();
// };

// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };

// const three = (req, res) => {
//   console.log("three");
//   res.send("Finished all three functions");
// };

// app.get("/chain(.html)?", [one, two, three]);



// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

app.all("*", (req, res) => {
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
