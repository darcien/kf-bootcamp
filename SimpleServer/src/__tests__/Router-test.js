// @flow

import Router, {getPlaceholders, tryMatchPattern} from '../Router';

describe('the getPlaceholders function', () => {
  it('should get nothing from root pattern', () => {
    let pattern = '/';
    expect(getPlaceholders(pattern)).toEqual({});
  });
  it('should get nothing from url without pattern', () => {
    let pattern = '/upload/something';
    expect(getPlaceholders(pattern)).toEqual({});
  });
  it('should get simple pattern', () => {
    let pattern = '/upload/:fileName';
    expect(getPlaceholders(pattern)).toEqual({[1]: 'fileName'});
  });
  it('should get advanced pattern', () => {
    let pattern = '/something/:fileName/date/:year/index';
    expect(getPlaceholders(pattern)).toEqual({
      [1]: 'fileName',
      [3]: 'year',
    });
  });
});

describe('The tryMatchPattern function', () => {
  it('shouldnt match wrong pattern', () => {
    let pattern = '/api/users/:userName';
    let path = '/api/users/';
    expect(tryMatchPattern(pattern, path)).toEqual(null);
    expect(tryMatchPattern('/foo', '/')).toEqual(null);
    expect(tryMatchPattern('/foo/:bar', '/')).toEqual(null);
  });
  it('should match existing pattern', () => {
    let pattern = '/api/:userType/home';
    let path = '/api/users/home';
    expect(tryMatchPattern(pattern, path)).toEqual({
      userType: 'users',
    });
  });
  it('should match existing pattern, again', () => {
    let pattern = '/api/:userType/:userName';
    let path = '/api/users/torvalds';
    expect(tryMatchPattern(pattern, path)).toEqual({
      userType: 'users',
      userName: 'torvalds',
    });
  });
});

describe('The router class', () => {
  it('should render the root path', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/', handler);

    let context = {hello: 'world'};
    router.handleRequest('/', context);
    expect(handler).toHaveBeenCalledWith(context);
  });
  it('should render simple path', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/upload/something', handler);

    let context = {hello: 'world'};
    router.handleRequest('/upload/something', context);
    expect(handler).toHaveBeenCalledWith(context);
  });
  it('should render simple path with pattern', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/upload/:file', handler);

    let context = {hello: 'world'};
    router.handleRequest('/upload/hai.txt', context);
    expect(handler).toHaveBeenCalledWith(context, {file: 'hai.txt'});
  });
  it('should render path with multiple pattern', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/api/:userType/:userName', handler);

    let context = {hello: 'world'};
    router.handleRequest('/api/orgs/kodefox', context);
    expect(handler).toHaveBeenCalledWith(context, {
      userType: 'orgs',
      userName: 'kodefox',
    });
  });
  it('shouldnt match root pattern', () => {
    let router = new Router();
    let results = [];

    router.addRoute('/', () => {
      results.push('one');
    });
    router.addRoute('/api/orgs/:userName', () => {
      results.push('two');
    });

    let context = {hello: 'world'};
    router.handleRequest('/api/orgs/kodefox', context);
    expect(results).toEqual(['two']);
  });
  it('should call single handler', () => {
    let router = new Router();
    let results = [];

    router.addRoute('/api/:userType/:userName', () => {
      results.push('one');
    });
    router.addRoute('/api/orgs/:userName', () => {
      results.push('two');
    });

    let context = {hello: 'world'};
    router.handleRequest('/api/orgs/kodefox', context);
    expect(results).toEqual(['one']);
  });
});
