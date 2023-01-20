const fsPromises = require("fs").promises;
//importing the files
//better way of reading files
const path = require("path");



fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

//write append and renaming the file simultaneous

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you arun",
//   (err) => {
//     if (err) throw err;
//     console.log("Write Completed");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\n This is the new appended text",
//       (err) => {
//         if (err) throw err;
//         console.log("Append Completed");
//       }
//     );

//     fs.rename(
//       path.join(__dirname, "files", "reply.txt"),path.join(__dirname,'files',"newname.txt"),
//       (err) => {
//         if (err) throw err;
//         console.log("Rename Completed");
//       }
//     );
//   }
// );

// fs.readFile('./files/starter.txt',(err,data) =>{
//     if(err) throw err;
//     console.log(data);
// })

// fs.readFile('./files/starter.txt',(err,data) =>{
//     if(err) throw err;
//     console.log(data.toString());
// })

// fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

console.log("Hello...");

process.on("uncaughtException", (err) => {
  console.error(`There was uncaught error: ${err}`);
  process.exit(1);
});
