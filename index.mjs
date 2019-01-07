/*
* Primary file for th API
*
*
*/

// Dependencies
import http from 'http';
import url from 'url';
import { StringDecoder } from 'string_decoder';

const port = 3000;

// server should respond to all requests with a string 'Hello, World!'
const server = http.createServer((req, res) => {

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //  Get the query string as an object
  const queryStrObj = parsedUrl.query;

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => buffer += decoder.write(data));
  req.on('end', () => {
    buffer += decoder.end();

    // Send the response
    if (res) {
      res.end('Hello, World!\n');
    }

    // Log the request path
    console.log(`Request received on path: ${trimmedPath} with method ${method}
      and with these query string parameters`, queryStrObj);

    console.log(`Request received with these headers`, headers);
    console.log(`Request received with this payload`, buffer);
  });



});

// Start the server, and have it listen on port 3000
server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`The server is listening on port ${port} now.`);
});
