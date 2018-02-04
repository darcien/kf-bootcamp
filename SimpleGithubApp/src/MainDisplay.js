// @flow

import React, {Component} from 'react';

import Github from './API/Github';

type Props = {
  username: ?string,
};

type State = {
  repos: Array<Object>,
  isFetching: boolean,
};

const loadingImgUrl =
  'https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif';

const imageStyle = {
  width: '120px',
  height: 'auto',
};

export default class MainDisplay extends Component<Props, State> {
  state = {
    repos: [],
    isFetching: false,
  };

  componentDidMount() {
    let {username} = this.props;

    if (username) {
      this.setState({isFetching: true});
      Github.getReposByUser(username)
        .then((repos) => {
          // Deliberately delay the setState to show the loading image.
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(repos);
            }, 4000);
          });
        })
        .then((repos) => {
          this.setState({repos, isFetching: false});
        });
    }
  }

  render() {
    let {username} = this.props;
    let {repos, isFetching} = this.state;

    let formattedRepos = [];

    let loading = (
      <div>
        <img src={loadingImgUrl} style={imageStyle} />
      </div>
    );

    if (repos.length) {
      formattedRepos = repos.map((repo) => {
        let {name, id, html_url} = repo;
        return (
          <li key={id}>
            {name} : {html_url}
          </li>
        );
      });
    }

    return (
      <div>
        <span>{username ? username + ' repos:' : null}</span>
        <div>{username && isFetching ? loading : null}</div>
        <div>
          <ul>{formattedRepos}</ul>
        </div>
      </div>
    );
  }
}
