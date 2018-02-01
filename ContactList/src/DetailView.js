// @flow

import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';

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
  selectedRepoID: string,
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

const repoDetailsStyle = {
  margin: '6px',
};

class DetailView extends Component<Props, State> {
  state = {
    githubName: '',
    avatarUrl: '',
    githubRepos: [],
    githubReposDetails: [],
    selectedRepoID: '',
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
        let fetchUrl = 'https://api.github.com/users/' + githubUsername;
        fetch(fetchUrl + githubOAuth)
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
            if (!result.ok) {
              return Promise.reject(result);
            }
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
          })
          .catch((result) => {
            console.log('ERROR', result);
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

  _onRepoSelect = (repoID: number) => {
    if (repoID) {
      this.setState({selectedRepoID: String(repoID)});
    }
  };

  render() {
    let {selectedContact, selectedID, onRemoveContact} = this.props;
    let {avatarUrl, githubReposDetails, selectedRepoID} = this.state;

    let content;
    let repos = null;

    let repoDetails;

    if (selectedContact && selectedID) {
      if (githubReposDetails.length > 0) {
        repos = githubReposDetails.map((repo, index) => {
          let {id, name} = repo;

          if (String(id) === selectedRepoID) {
            let {created_at, size, subscribers_count, watchers} = repo;
            repoDetails = (
              <div key={id}>
                <ul style={repoDetailsStyle}>
                  <li>Created at : {created_at}</li>
                  <li>Size : {size} KBs</li>
                  <li>Subscribers : {subscribers_count}</li>
                  <li>Stalkers : {watchers}</li>
                </ul>
              </div>
            );
          } else {
            repoDetails = null;
          }

          return (
            <div
              className="detail repo"
              key={id}
              onClick={() => this._onRepoSelect(id)}
            >
              {index + 1}. {name}
              {repoDetails}
            </div>
          );
        });
      }

      let {githubUsername, name, phoneNumber} = selectedContact;
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
            {githubUsername ? 'Github repos:' : ''}
            <br />
            {/* <CSSTransitionGroup
              transitionName="githubDetails"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            > */}
            {repos}
            {/* </CSSTransitionGroup> */}
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
