const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.end('Hello, Kube World! – a fun twist on “Hello World”');
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
