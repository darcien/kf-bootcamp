// @flow

import React, {Component} from 'react';

import type {Contact} from './types/State';

type Props = {
  selectedContact: Contact,
  onRemoveContact: (id: string) => void,
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

  componentWillReceiveProps(nextProps: Props) {
    let {githubUsername} = nextProps.selectedContact;
    let fetchUrl = 'https://api.github.com/users/' + githubUsername;

    if (githubUsername !== '') {
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

  render() {
    let {selectedContact, onRemoveContact} = this.props;
    let {id, name, phoneNumber} = selectedContact;

    let content;

    if (id === '-1') {
      content = <div className="detail view" style={detailViewStyle} />;
    } else {
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
            onClick={() => onRemoveContact(id)}
          >
            Remove
          </button>
        </div>
      );
    }

    return content;
  }
}

export default DetailView;
