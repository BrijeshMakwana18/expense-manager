const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('Hey there');
});

server.listen(2000);
