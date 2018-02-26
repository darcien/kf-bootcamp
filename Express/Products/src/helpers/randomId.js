// @flow

function randomId() {
  return (Math.random() * Math.pow(2, 53)).toString(36);
}

function randomFileId() {
  return (
    new Date(Date.now()).toISOString() +
    '-' +
    (Math.random() * Math.pow(2, 53)).toString(36)
  );
}

export {randomId, randomFileId};
