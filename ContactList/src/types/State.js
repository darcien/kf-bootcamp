// @flow

export type Contact = {
  name: string,
  phoneNumber: string,
  githubUsername: string,
};

export type State = {
  contacts: {[id: string]: Contact},
  searchValue: string,
  selectedID: ?string,
  selectedIndex: number,
  selectedContact: ?Contact,
};
