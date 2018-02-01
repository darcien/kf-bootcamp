// @flow

import React, {Component} from 'react';

import MD5 from 'md5';

import type {Contact} from './types/State';

import {key, githubClientID, githubClientSecret} from './secret.js';

type Props = {
  selectedContact: ?Contact,
  selectedID: ?string,
  onRemoveContact: (id: ?string) => void,
};

type State = {
  githubName: string,
  avatarUrl: string,
  githubRepos: Array<String>,
  githubReposDetails: any,
};

const detailViewStyle = {
  flex: '1 0 auto',
  backgroundColor: '#95b9c7',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  minWidth: '450px',
  width: '450px',
};

const imgStyle = {
  width: '100px',
  height: '100px',
  border: '2px solid black',
  backgroundColor: 'lightgreen',
};

class DetailView extends Component<Props, State> {
  state = {
    githubName: '',
    avatarUrl: '',
    githubRepos: [],
    githubReposDetails: [],
  };

  componentDidMount() {
    if (this.props.selectedContact) {
      let {githubUsername, email, googleUserID} = this.props.selectedContact;

      // if (googleUserID) {
      //   let fetchUrl =
      //     'https://www.googleapis.com/plus/v1/people/' +
      //     googleUserID +
      //     `?key=${key}`;
      //
      //   fetch(fetchUrl)
      //     .then((result) => {
      //       return result.json();
      //     })
      //     .then((data) => {
      //       let pictureUrl = data.image.url;
      //       pictureUrl = pictureUrl.substring(0, pictureUrl.length - 2) + '200';
      //       let name = data.displayName;
      //
      //       this.setState({githubName: name, avatarUrl: pictureUrl});
      //     });
      // } else
      if (githubUsername) {
        let githubOAuth = `?client_id=${githubClientID}&client_secret=${githubClientSecret}`;
        let fetchUrl =
          'https://api.github.com/users/' + githubUsername + githubOAuth;
        fetch(fetchUrl)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            let pictureUrl = data.avatar_url;
            let name = data.name;
            let reposUrl = data.repos_url;

            this.setState({githubName: name, avatarUrl: pictureUrl});
            return fetch(reposUrl + githubOAuth);
          })
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            let fetchRepoList = data.map((repo) => {
              return fetch(repo.url + githubOAuth);
            });

            this.setState({githubRepos: data});

            return Promise.all(fetchRepoList);
          })
          .then((results) => {
            return Promise.all(results.map((result) => result.json()));
          })
          .then((data) => {
            this.setState({githubReposDetails: data});
          });
      } else if (email) {
        let hashedEmail = MD5(email);
        let fetchUrl =
          'https://www.gravatar.com/avatar/' + hashedEmail + '?s=200';

        fetch(fetchUrl)
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({avatarUrl: imageUrl});
          });
      } else {
        this.setState({
          avatarUrl: 'defaultIcon.png',
        });
      }
    }
  }

  render() {
    let {selectedContact, selectedID, onRemoveContact} = this.props;
    let {avatarUrl, githubReposDetails} = this.state;

    let content;
    let repos = [];

    if (selectedContact && selectedID) {
      if (githubReposDetails.length > 0) {
        repos = githubReposDetails.map((repo, index) => {
          return (
            <div key={repo.id}>
              {index + 1}. {repo.name} : subscribers count ={' '}
              {repo.subscribers_count}
            </div>
          );
        });
      }

      let {name, phoneNumber} = selectedContact;
      content = (
        <div className="detail view" style={detailViewStyle}>
          <div className="detail header">
            <div className="detail picture">
              <img style={imgStyle} src={avatarUrl} />
            </div>
            <div className="detail name">{name}</div>
          </div>
          <div className="detail phoneNumber">
            📞 {phoneNumber} <br />
            Github repos:<br />
            {repos}
          </div>
          <button
            className="detail removeContact"
            onClick={() => onRemoveContact(selectedID)}
          >
            Remove
          </button>
        </div>
      );
    } else {
      content = <div className="detail view" style={detailViewStyle} />;
    }

    return content;
  }
}

export default DetailView;
