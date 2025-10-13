const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.end('Hello World from AWS EKS using Jenkins CI/CD!');
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
