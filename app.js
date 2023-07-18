////const http = require('http');
////
////const hostname = '127.0.0.1';
////const port = 3000;
////
////const server = http.createServer((req, res) => {
////  res.statusCode = 200;
////  res.setHeader('Content-Type', 'text/plain');
////  res.end('Hello World');
////});
////
////server.listen(port, hostname, () => {
////  console.log(`Server running at http://${hostname}:${port}/`);
////});
////
////
////app.get("/", (req, res) => {
////  res.sendFile(__dirname + "/index.html");
////});
//
//
//
//
//const http = require("http");
//const fs = require('fs');
//
//
//
////...
//const host = 'localhost';
//const port = 8000;
//
//const requestListener = function (req, res) {
//    fs.readFile(__dirname + "/index.html")
//        .then(contents => {
//            res.setHeader("Content-Type", "text/html");
//            res.writeHead(200);
//            res.end(contents);
//        })
//        .catch(err => {
//            res.writeHead(500);
//            res.end(err);
//            return;
//        });
//};
//
////...
//
//const server = http.createServer(requestListener);
//server.listen(port, host, () => {
//    console.log(`Server is running on http://${host}:${port}`);
//});
////...
