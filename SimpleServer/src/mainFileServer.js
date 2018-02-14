//@flow

import http from 'http';
import url from 'url';
import fs from 'fs';

import {join, parse} from 'path';

// const filePath = join(__dirname, '../assets/ananas.jpg');

const products = [
  {
    id: 1,
    name: 'Apple',
    price: 100,
  },
  {
    id: 2,
    name: 'Banana',
    price: 500,
  },
  {
    id: 3,
    name: 'Circuit',
    price: 5000,
  },
];

const contentTypeList = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
};

let server = http.createServer();

function serveHomePage(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello from the server');
  response.write('\n');
  response.end();
}

function serveNotFoundPage(request, response, e = null) {
  response.writeHead(404, 'Not here', {
    'Content-Type': 'text/plain',
  });
  response.write('Not found...', e ? e : '');
  response.write('\n');
  response.end();
}

function getProducts(request, response, id = null) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify({products: products}));
}

// Pipe function for handling backpressure that happen when read is much faster
// than the write
// function pipe(readStream, writeStream) {
//   readStream.on('error', (e) => {
//     console.log('Something went really wrong', e);
//   });
//
//   readStream.on('data', (data) => {
//     if (writeStream.write(data)) {
//       // console.log('Writing...', data);
//     } else {
//       readStream.pause();
//       writeStream.once('drain', () => {
//         readStream.resume();
//       });
//     }
//   });
//   readStream.on('end', () => {
//     writeStream.end(() => {
//       console.log('Writing finished.');
//       return true;
//     });
//   });
// }

server.on('error', (error) => {
  console.log('Something went wrong', error);
});

server.on('request', (request, response) => {
  let parsedUrl = url.parse(request.url, true);

  let pathName = parsedUrl.pathname;

  if (pathName) {
    let parsedPathName = parse(pathName);

    switch (parsedPathName.dir) {
      case '/': {
        switch (parsedPathName.base) {
          case '':
            serveHomePage(request, response);
            break;
          default:
            serveNotFoundPage(request, response);
        }
        break;
      }
      case '/api': {
        switch (parsedPathName.base) {
          case 'products':
            {
              let query = parsedUrl.query;
              if (query) {
                let productId = query.id;
                if (productId) {
                  let notFound = true;
                  for (let product of products) {
                    if (String(product.id) === productId) {
                      notFound = false;
                      response.writeHead(200, {
                        'Content-Type': 'application/json',
                      });
                      response.end(JSON.stringify({products: product}));
                      break;
                    }
                  }
                  if (notFound) {
                    serveNotFoundPage(request, response);
                  }
                } else {
                  response.writeHead(200, {'Content-Type': 'application/json'});
                  response.end(JSON.stringify({products}));
                }
              } else {
                console.log('Does this even execute?');
                serveNotFoundPage(request, response);
              }
            }

            break;
          default:
            serveNotFoundPage(request, response);
        }

        break;
      }
      case '/files': {
        let filePath = join(__dirname, '../assets/', parsedPathName.base);

        fs.open(filePath, 'r', (err, fd) => {
          if (err) {
            if (err.code === 'ENOENT') {
              console.error(`${parsedPathName.base} does not exist`);
              serveNotFoundPage(request, response, err);
              return;
            }
            serveNotFoundPage(request, response, err);
            throw err;
          }

          let readStream = fs.createReadStream(filePath);
          try {
            response.writeHead(200, {
              'Content-Type': contentTypeList[parsedPathName.ext],
            });

            readStream.pipe(response);
          } catch (e) {
            serveNotFoundPage(request, response, e);
          }
        });

        break;
      }

      default: {
        serveNotFoundPage(request, response);
      }
    }
  }
});

server.listen(8080, () => {
  console.log('Server is ready.');
});
