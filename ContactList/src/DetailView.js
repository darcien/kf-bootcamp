// @flow

import React, {Component} from 'react';

import MD5 from 'md5';

import type {Contact} from './types/State';

import key from './secret.js';

type Props = {
  selectedContact: ?Contact,
  selectedID: ?string,
  onRemoveContact: (id: ?string) => void,
};

type State = {
  githubName: string,
  AvatarUrl: string,
};

const detailViewStyle = {
  flex: '1 0 auto',
  backgroundColor: '#95b9c7',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
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
    AvatarUrl: '',
  };

  componentDidMount() {
    if (this.props.selectedContact) {
      let {githubUsername, email, googleUserID} = this.props.selectedContact;

      if (googleUserID) {
        let fetchUrl =
          'https://www.googleapis.com/plus/v1/people/' +
          googleUserID +
          `?key=${key}`;

        fetch(fetchUrl)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            let pictureUrl = data.image.url;
            pictureUrl = pictureUrl.substring(0, pictureUrl.length - 2) + '200';
            let name = data.displayName;

            this.setState({githubName: name, AvatarUrl: pictureUrl});
          });
      } else if (githubUsername) {
        let fetchUrl = 'https://api.github.com/users/' + githubUsername;
        fetch(fetchUrl)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            let pictureUrl = data.avatar_url;
            let name = data.name;

            this.setState({githubName: name, AvatarUrl: pictureUrl});
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
            this.setState({AvatarUrl: imageUrl});
          });
      } else {
        this.setState({
          AvatarUrl: 'defaultIcon.png',
        });
      }
    }
  }

  render() {
    let {selectedContact, selectedID, onRemoveContact} = this.props;

    let content;

    if (selectedContact && selectedID) {
      let {name, phoneNumber} = selectedContact;
      content = (
        <div className="detail view" style={detailViewStyle}>
          <div className="detail header">
            <div className="detail picture">
              <img style={imgStyle} src={this.state.AvatarUrl} />
            </div>
            <div className="detail name">{name}</div>
          </div>
          <div className="detail phoneNumber">📞 {phoneNumber}</div>
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
