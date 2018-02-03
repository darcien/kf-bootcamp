// @flow

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

  yield {type: 'WAIT', ms: 300};
  return repos.map((repo) => repo.name);
}

function mockFetch(url): Promise<*> {
  let data = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
  let promise = Promise.resolve(data);
  return promise;
}

function run(gen: ReposGen) {
  return new Promise((resolve, reject) => {
    function processNext(data) {
      let {done, value} = gen.next(data);
      if (value) {
        switch (value.type) {
          case 'WAIT':
            console.log('Waiting...', value.ms);
            setTimeout(() => {
              processNext();
            }, value.ms);
            break;
          case 'FETCH':
            console.log('Fetching...', value.url);

            mockFetch(value.url).then((data) => {
              processNext(data);
            });

            break;
        }
        if (done) {
          resolve(value);
        }
      }
    }
    processNext();
  });
}

let promise = run(getUserRepos('sstur'));

if (promise) {
  promise.then((result) => {
    console.log('result :', result);
  });
}
