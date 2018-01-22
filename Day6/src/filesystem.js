import fs from 'fs';

// Try to avoid using synchronous that'll block the main thread.
fs.readdir('./', (error, result) => {
  if (error) {
    throw new Error(error);
    return;
  }
  console.log(result);
});
