// @flow

import type {Contact} from './types/State';

let initialContactList = new Map();

initialContactList = {
  [10]: {
    name: 'Yosua',
    phoneNumber: '+62 878-0800-2924',
    githubUsername: 'darcien',
    email: 'yosua.ian.sebastian@gmail.com',
    googleUserID: '106789814834430652889',
  },
  [11]: {
    name: 'Rahel',
    phoneNumber: '+62 812-9425-5600',
    githubUsername: '',
  },
  [0]: {
    name: 'Chyvalle',
    phoneNumber: '+62 99',
    email: 'lutfi.blast@gmail.com',
  },
  [12]: {
    name: 'Joshua',
    phoneNumber: '+62 878-1714-4417',
    githubUsername: 'ikusa',
  },
  [13]: {
    name: 'Simon',
    phoneNumber: '+1 (913) 538-1260',
    githubUsername: 'sstur',
  },
  [14]: {
    name: 'Andrew',
    phoneNumber: '+61 433 998 850',
    githubUsername: '',
  },
  [15]: {
    name: 'Evan',
    phoneNumber: '+62 811-1042-216',
    githubUsername: 'Sherlock9',
  },
  [16]: {
    name: 'Jorgie',
    phoneNumber: '+62 812-8743-6934',
    githubUsername: '',
  },
  [17]: {
    name: 'Audy',
    phoneNumber: '+62 812-8868-3794',
    githubUsername: '',
  },
  [18]: {
    name: 'Listiani',
    phoneNumber: '+62 812-9036-0320',
    githubUsername: '',
  },
  [19]: {
    name: 'Edric',
    phoneNumber: '+62 813-8019-1357',
    githubUsername: '',
  },
  [20]: {
    name: 'Domi',
    phoneNumber: '+62 813-9403-0507',
    githubUsername: '',
  },
  [21]: {
    name: 'Juang',
    phoneNumber: '+62 857-7436-9672',
    githubUsername: '',
  },
};

export default initialContactList;
