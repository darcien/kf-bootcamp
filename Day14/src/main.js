// @flow

// TODO use recursive instead of while loop

type Action =
  | {
      type: 'WAIT',
      ms: number,
    }
  | {
      type: 'FETCH',
      url: string,
    };

type ReposGen = Generator<Action, any, *>;

function* getUserRepos(userID: string): ReposGen {
  yield {type: 'WAIT', ms: 300};

  let repos = yield {
    type: 'FETCH',
    url: `https://api.github.com/users/${userID}/repos`,
  };

  console.log('Repos:', repos);

  yield {type: 'WAIT', ms: 300};
  // let finalResult = repos.map((repo) => repo.name);
  let finalResult = ['Hi'];
  console.log('Final', finalResult);
  return Promise.resolve(finalResult);
}

function mockFetch(url): Promise<*> {
  let data = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
  let promise = Promise.resolve(data);
  return promise;
}

function run(gen: ReposGen) {
  gen.next();
  let next = gen.next();

  return new Promise((resolve, reject) => {
    if (next.value) {
      while (!next.value.done) {
        switch (next.value.type) {
          case 'WAIT':
            console.log('Waiting...', next.value.ms);
            next = gen.next();
            break;
          case 'FETCH':
            console.log('Fetching...', next.value.url);

            mockFetch(next.value.url).then((data) => {
              resolve(data);
            });
            next = gen.next();

            break;
        }
        if (next.done) {
          resolve(next.value);
        }
      }
    }
  });
}

let promise = run(getUserRepos('sstur'));

console.log('Promise : ', promise);

if (promise) {
  promise.then((result) => {
    console.log('result :', result);
  });
}
