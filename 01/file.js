const fs = require("fs");

// fs.writeFileSync("./test.txt", "yoyo" );

// const results = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(results);

// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//     if(err){
//         return console.log("error", err);
//     }else{
//         return console.log(result);
//     }
// });

console.log(fs.statSync("./test.txt"));