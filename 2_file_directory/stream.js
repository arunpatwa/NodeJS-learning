const fs=require('fs')


//reading the files (readable string)
const rs= fs.createReadStream ('./files/arun.txt',{encoding: 'utf8'});


//creating a new file from the prev saved file
const ws=fs.createWriteStream('./files/new-arun.txt');

// rs.on('data', (dataChunk) =>{
//     ws.write(dataChunk);
// })

//shortcut to create a new file 
rs.pipe(ws);