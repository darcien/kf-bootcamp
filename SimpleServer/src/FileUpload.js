//@flow

import http from 'http';
import url from 'url';
import fs from 'fs';

import md5 from 'md5';

import {join, parse} from 'path';

const contentTypeList = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mp3',
};

let server = http.createServer();

function serveHomePage(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(
    `<form method='POST' action='/upload'>
        <input onChange="_onInputChange" name='file' type='file' accept='.jpg, .png, .mp3, .txt'><br>
          <input type='submit' name='submit'>
      </form>
      <button onClick="()=> console.log('Hahahahha')">Haha</button>
      <script>
        function _onInputChange(e) {
          console.log('Hi');
          console.log(e.target.value);
        }
      </script>
  `,
  );
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

function handleUpload(request, response) {
  console.log('Files', request);
  let receivedData = fs.createWriteStream('assets/uploaded.txt');

  // response.writeHead(200, {'Content-Type': 'text/plain'});
  // request.on('data', (data) => {
  //   console.log('Request', request.headers);
  //   // console.log('Data', data.toString());
  // });

  request.pipe(receivedData);

  request.on('end', () => {
    receivedData.end();
    console.log('The file has been saved!');
    response.write(`Upload received`);
    response.write('\n');
    response.end();
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

  let parsedUrl = url.parse(request.url, true);

  let pathName = parsedUrl.pathname;

  if (pathName) {
    let parsedPathName = parse(pathName);
    // console.log('parsedPathName.dir', parsedPathName.dir);

    switch (parsedPathName.dir) {
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
