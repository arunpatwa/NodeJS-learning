const fs = require("fs");

//creating the directory
// if directory already created then use existsync method so that new directory will not created


if (!fs.existsSync("./newdir")) {
  fs.mkdir("./newdir", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}

if (fs.existsSync("./newdir")) {
    fs.rmdir("./newdir", (err) => {
      if (err) throw err;
      console.log("Directory Removed");
    });
  }
