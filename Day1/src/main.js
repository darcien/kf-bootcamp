let fetchUrl = 'https://api.github.com/users/darcien';
fetch(fetchUrl)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    let pictureUrl = data.avatar_url;
    let name = data.name;

    console.log(name);
  });
