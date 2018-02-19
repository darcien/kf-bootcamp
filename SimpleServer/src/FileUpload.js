//@flow

import http from 'http';
import url from 'url';
import fs from 'fs';

import {join, parse} from 'path';

const contentTypeList = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mp3',
};

let assetsPath = join(__dirname, '../assets/');

let server = http.createServer();

function serveHomePage(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./src/index.html', (err, html) => {
    if (err) {
      serveNotFoundPage(request, response, err);
    }
    response.end(html);
  });
}

function serveNotFoundPage(request, response, e = null) {
  response.writeHead(404, 'Not here', {
    'Content-Type': 'text/plain',
  });
  response.write('Not found...', e ? e : '');
  response.write('\n');
  response.end();
}

function handleUpload(request, response) {
  console.log('Files', request);
  let receivedData = fs.createWriteStream('assets/uploaded.txt');

  response.writeHead(200, {'Content-Type': 'text/plain'});
  request.on('data', (data) => {
    receivedData.write(data);
    console.log('Request', request.headers);
    // console.log('Data', data.toString());
  });

  request.pipe(receivedData);

  request.on('end', () => {
    response.write(`Upload finished`);
    response.write('\n');
    response.end();
  });
}

function handleUploadJson(request, response) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let chunkCount = 0;
    request.on('data', (chunk) => {
      chunkCount += 1;
      chunks.push(chunk);
      console.log('Data', chunkCount);
    });

    request.on('end', () => {
      let data = Buffer.concat(chunks).toString();
      let body;

      try {
        body = JSON.parse(data);
      } catch (error) {
        reject(error);
      }
      console.log('Upload finished', body);
      response.end('Done');
      resolve(body);
    });
  });
}

server.on('error', (error) => {
  console.log('Something went wrong', error);
});

server.on('request', (request, response) => {
  if (request.url === '/') {
    serveHomePage(request, response);
    return;
  }

  if (request.url === '/upload') {
    handleUpload(request, response);
    return;
  }

  if (request.url === '/upload-json') {
    handleUploadJson(request, response);
    return;
  }

  let parsedUrl = url.parse(request.url, true);

  let pathName = parsedUrl.pathname;

  if (pathName) {
    let parsedPathName = parse(pathName);
    // console.log('parsedPathName.dir', parsedPathName.dir);

    switch (parsedPathName.dir) {
      case '/files': {
        let filePath = join(assetsPath, parsedPathName.base);

        if (!filePath.startsWith(assetsPath + '/')) {
          serveNotFoundPage(request, response);
          return;
        }

        fs.open(filePath, 'r', (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              console.error(`${parsedPathName.base} does not exist`);
              serveNotFoundPage(request, response, err);
              return;
            }
            serveNotFoundPage(request, response, err);
            return;
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

      case '/upload': {
        let assetsPath = join(__dirname, '../assets/');
        let filePath = join(assetsPath, parsedPathName.base);

        if (!filePath.startsWith(assetsPath + '/')) {
          serveNotFoundPage(request, response);
          return;
        }
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
