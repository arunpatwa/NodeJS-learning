
const express = require("express");

const router = express.Router();

const path = require("path");

//defining the routes
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname,'..', "views", "index.html"));
  });
  
  //using (.html)? -->make it optional
  router.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname,'..', "views", "new-page.html"));
  });
  
  router.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "/new-page.html"); //302 by default
  });
  //301 used to redirect the side permanently

  module.exports=router;