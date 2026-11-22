const http = require('http');
const path = require('path');
const fs = require('fs');

// Only serve the files used by the visualization.
const publicFiles = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/entry-sketch.js', ['entry-sketch.js', 'text/javascript']],
  ['/survey.html', ['survey.html', 'text/html']],
  ['/style.css', ['style.css', 'text/css']],
  ['/sketch.js', ['sketch.js', 'text/javascript']],
  ['/audience-share-counts.json', ['audience-share-counts.json', 'application/json']]
]);

http.createServer((request, response) => {
  const entry = publicFiles.get(request.url.split('?')[0]);
  if (!entry) {
    response.writeHead(404).end('File not found');
    return;
  }

  const [filename, contentType] = entry;
  fs.readFile(path.join(__dirname, filename), (error, content) => {
    if (error) {
      response.writeHead(500).end('Could not read the project file');
      return;
    }
    response.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` }).end(content);
  });
}).listen(8080, 'localhost', () => {
  process.stdout.write('Bye Bye Meta is running at http://localhost:8080\n');
});
