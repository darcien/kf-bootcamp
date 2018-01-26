// @flow

export type Contact = {
  id: string,
  name: string,
  phoneNumber: string,
};

export type State = {
  contacts: Array<Contact>,
  selectedIndex: number,
  searchValue: string,
};
