var ws = require("nodejs-websocket")

var port = 3000;
// 记录有多少人链连接
var peopleCount = 0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  peopleCount++;
  conn.userNanme = '游客' + peopleCount;
  broadcast(conn.userNanme + 'come in');   
	conn.on("text", function (str) {
    broadcast(conn.userNanme + ': ' + str);
	})
	conn.on("close", function (code, reason) {
    console.log("Connection closed");
    broadcast(conn.userNanme + 'leave');    
  })
  conn.on('error', err => {
    console.log('haddle' + err);
  })
}).listen(port)
console.log("websocket server listener port:" + port);

function broadcast(str) {
  server.connections.forEach(coon => {
    coon.sendText(str);
  })
}