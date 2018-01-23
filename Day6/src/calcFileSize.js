// @flow
/* global __dirname */

import fs from 'fs';
import {join} from 'path';

function calcFileSize() {
  let path = join(__dirname, '../flow-typed');
  let sizeList = new Map();

  fs.readdir(path, (error, fileNames) => {
    if (error) {
      throw new Error(error);
    }
    sizeList.set('__counter', 0);
    sizeList.set('__totalSize', 0);

    // We could avoid using for with declaring global counter and
    // do recursive version
    for (let fileName of fileNames) {
      // console.log('fileName', fileName);

      sizeList.set(fileName, null);
      fs.stat(join(path, fileName), (error, fileStat) => {
        // Increase counter each time checking file stats
        sizeList.set(fileName, fileStat.size);
        let previousCounter = sizeList.get('__counter');
        let currentCounter = previousCounter + 1;
        sizeList.set('__counter', currentCounter);

        let previousSize = sizeList.get('__totalSize');
        let currentSize = previousSize + fileStat.size;
        sizeList.set('__totalSize', currentSize);

        if (sizeList.get('__counter') === fileNames.length) {
          sizeList.forEach((size, fileName) => {
            if (!fileName.startsWith('__')) {
              console.log(fileName, size);
            }
          });
          console.log('DONE');
          console.log('Total size =', sizeList.get('__totalSize'));
        }
      });
    }
  });
  // return sizeList.get('__totalSize');
}
calcFileSize();
