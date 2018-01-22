import fs from 'fs';

// Async file read, better use synchronous for reading just file size?
// TODO try promise or async func for calc
// Promise version failed
function calcFileSize(dir) {
  let totalSize = 0;

  fs.readdir(dir, (error, result) => {
    if (error) {
      throw new Error(error);
    }
    for (var i = 0; i < result.length; i++) {
      fs.stat(dir + result[i], (error, resultStat) => {
        if (error) {
          throw new Error(error);
        } else {
          totalSize += resultStat.size;
          console.log('Hi');
          console.log('leng', result.length - 1);
          if (i === result.length - 1) {
            console.log('Reached return');
            return totalSize;
          }
        }
      });
    }
  });
}

function calcFileSizeSync(dir) {
  let totalSize = 0;
  let result = fs.readdirSync(dir);
  result.forEach((item) => {
    let stat = fs.statSync(dir + item);
    totalSize += stat.size;
  });
  return totalSize;
}

console.log('total ', calcFileSize('./'));
// console.log('total ', calcFileSizeSync('./'));
