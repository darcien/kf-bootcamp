// @flow

type User = {
  id: string,
  username: string,
  password: string,
};

function saveUser(username, password) {
  let id = 'random';

  return {username, password};
}

let {username, password} = saveUser('D', 'K');
