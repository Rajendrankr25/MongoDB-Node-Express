const fs = require('fs');

const data = "A new file is created using fs inbuilt package!!!";

// fs.writeFile('./fs-file.html', data, (err) => {
//     console.log("completed!!!");
// });

//Task 1 - create 10 files using loop
// const quote2 = "Live more, Worry less 😍";
// for (let i = 1; i <= 10; i++) {
//     fs.writeFile(`./backup/text${i}.html`, quote2, (err) => {
//         console.log('files created!!!');
//     })
// }

//Task 2 - create number of files based on input
// const quote2 = "Live more, Worry less 😍";
// const [, , n] = process.argv;
// for (let i = 1; i <= n; i++) {
//     fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
//         console.log('files created!!!');
//     })
// }

//Read file method
// fs.readFile("./readFile.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

//Append / add file method
// const data2 = "this is appended text"
// fs.appendFile("./readFile.txt", '\n' + data2, (err) => {
//     console.log('completed')
// });

//Unlink or delete file
fs.unlink('./delete-me.js', (err) => console.log('file deleted'));
