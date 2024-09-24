const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

// Log server start
console.log(`Server running on port ${PORT}`);

// Create or append a log file
const logFilePath = path.join(__dirname, 'server.log');
fs.appendFileSync(logFilePath, `\nServer started on port ${PORT} at ${new Date().toISOString()}\n`, 'utf8');

// Function to log requests both to console and log file
function logRequest(req) {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  // Log to the console (captured by PM2)
  console.log(logEntry);
  // Log to the log file
  fs.appendFileSync(logFilePath, `${logEntry}\n`, 'utf8');
}

http.createServer((req, res) => {
  // Log each incoming request
  logRequest(req);

  // Serve the index.html file
  fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading index.html');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}).listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
