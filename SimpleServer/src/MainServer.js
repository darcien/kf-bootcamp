//@flow

import http from 'http';
import fs from 'fs';
import {join} from 'path';

import Router from './Router';

const contentTypeList = {
  jpg: 'image/jpeg',
  png: 'image/png',
  html: 'text/html',
  txt: 'text/plain',
  mp4: 'video/mp4',
  mp3: 'audio/mp3',
};

let assetsPath = join(__dirname, '../assets/');

let server = http.createServer();
let router = new Router();

function serveFile(request, response, fileName) {
  let extension = fileName.split('.').pop();

  fs.readFile(join(assetsPath, fileName), (err, file) => {
    if (err) {
      serveNotFoundPage({request, response}, err);
    }
    response.writeHead(200, {'Content-Type': contentTypeList[extension]});

    response.end(file);
  });
}

function serveHomePage(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./src/index.html', (err, html) => {
    if (err) {
      serveNotFoundPage({request, response}, err);
    }
    response.end(html);
  });
}

function serveNotFoundPage({response}, e = null) {
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

router.addRoute('/', ({response, request}) => {
  console.log('Yo');
  serveHomePage(request, response);
});

router.addRoute('/files/:fileName', ({response, request}, {fileName}) => {
  serveFile(request, response, fileName);
});

router.addRoute('/api/:userType/:userName', ({response, request}) => {
  serveHomePage(request, response);
});

router.addRoute('/upload', ({response, request}) => {
  handleUpload(request, response);
});

router.addRoute('/upload-json', ({response, request}) => {
  handleUploadJson(request, response);
});

server.on('request', (request, response) => {
  router.handleRequest(request.url, {request, response});
});

server.listen(8080, () => {
  console.log('Server is ready.');
});
