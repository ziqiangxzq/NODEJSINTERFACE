var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.97.210.215',
  user     : 'xsql',
  password : 'MAdt8cBfhzYWDzba',
  port: 3306,    
  database : 'xsql'
});
 
connection.connect();
connection.query('SELECT * FROM `test` WHERE 1', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
// var http = require("http");
// var url = require("url");
 
// function start() {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }
 
//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }
 
// exports.start = start;