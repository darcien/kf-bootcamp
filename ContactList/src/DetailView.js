// @flow

import React, {Component} from 'react';

import type {Contact} from './types/State';

type Props = {
  selectedContact: ?Contact,
  selectedID: ?string,
  onRemoveContact: (id: ?string) => void,
};

type State = {
  githubName: string,
  githubAvatarUrl: string,
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
    githubAvatarUrl: '',
  };

  componentDidMount() {
    if (this.props.selectedContact) {
      let {githubUsername} = this.props.selectedContact;
      let fetchUrl = 'https://api.github.com/users/' + githubUsername;
      if (githubUsername) {
        fetch(fetchUrl)
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            let pictureUrl = data.avatar_url;
            let name = data.name;

            this.setState({githubName: name, githubAvatarUrl: pictureUrl});
          });
      } else {
        this.setState({
          githubAvatarUrl: 'defaultIcon.png',
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
              <img style={imgStyle} src={this.state.githubAvatarUrl} />
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
