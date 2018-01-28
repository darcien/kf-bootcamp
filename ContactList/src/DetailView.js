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
};

const hideButton = {
  display: 'none',
};

const initialButton = {
  display: 'initial',
};

const imgStyle = {
  width: '100px',
  height: '100px',
  border: '2px solid black',
};

class DetailView extends Component<Props, State> {
  state = {
    githubName: '',
    githubAvatarUrl: '',
  };

  componentWillReceiveProps(nextProps: Props) {
    let {githubUsername} = nextProps.selectedContact;
    let fetchUrl = 'https://api.github.com/users/' + githubUsername;

    console.log(this.state.githubAvatarUrl);

    if (githubUsername !== '') {
      fetch(fetchUrl)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          let pictureUrl = data.avatar_url;
          let name = data.name;

          this.setState({githubName: name, githubAvatarUrl: pictureUrl});
          console.log('Name', name);
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

    return (
      <div style={detailViewStyle}>
        <div className="detail-header">
          <h2>Details:</h2>
        </div>
        <div className="detail-picture">
          <img style={imgStyle} src={this.state.githubAvatarUrl} />
        </div>
        <div className="detail-name">{name}</div>
        <div className="detail-phoneNumber">{phoneNumber}</div>
        <button
          style={id === '-1' ? hideButton : initialButton}
          className="button-removeContact"
          onClick={() => onRemoveContact(id)}
        >
          Remove
        </button>
      </div>
    );
  }
}

export default DetailView;
