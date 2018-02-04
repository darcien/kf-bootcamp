// @flow

import fetch from 'node-fetch';

import {githubOAuth} from './secrets';

const githubUsersUrl = 'https://api.github.com/users/';

export default class Github {
  static async checkUser(username: string) {
    let response = await fetch(githubUsersUrl + username + githubOAuth);

    return response.ok;
  }

  static async getUser(username: string) {
    let response = await fetch(githubUsersUrl + username + githubOAuth);

    let user = await response.json();

    return user;
  }

  static async getReposByUser(username: string) {
    let response = await fetch(
      githubUsersUrl + username + '/repos' + githubOAuth,
    );

    let repos = await response.json();

    return repos;
  }
}
