// @flow

import Router, {parsePath, parsePattern} from '../Router';

describe('the parsePattern function', () => {
  it('should parse root pattern', () => {
    let pattern = '/';
    let result = parsePattern(pattern);
    let expectedResult = {pattern, base: pattern, placeholder: null};

    expect(result).toEqual(expectedResult);
  });
  it('should parse the url without pattern', () => {
    let pattern = '/upload-something';
    let result = parsePattern(pattern);
    let expectedResult = {pattern, base: pattern, placeholder: null};

    expect(result).toEqual(expectedResult);
  });
  it('should parse simple pattern', () => {
    let pattern = '/upload/:fileName';
    let result = parsePattern(pattern);
    let expectedResult = {pattern, base: '/upload', placeholder: 'fileName'};

    expect(result).toEqual(expectedResult);
  });
});

describe('The parsePath function', () => {
  it('should parse root path', () => {
    let path = '/';
    let result = parsePath(path);
    let expectedResult = {path, dir: path, file: null};

    expect(result).toEqual(expectedResult);
  });
  it('should parse simple path', () => {
    let path = '/abc/';
    let result = parsePath(path);
    let expectedResult = {path, dir: path, file: null};

    expect(result).toEqual(expectedResult);
  });
  it('should parse simple path with filename', () => {
    let path = '/upload/hello.txt';
    let result = parsePath(path);
    let expectedResult = {path, dir: '/upload', file: 'hello.txt'};

    expect(result).toEqual(expectedResult);
  });
});

describe('The router class', () => {
  it('should render the root path', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/', handler);

    let context = {hello: 'world'};
    router.handleRequest('/', context);
    expect(handler).toHaveBeenCalledWith(context, null);
  });
  it('should render simple path', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/upload/something', handler);

    let context = {hello: 'world'};
    router.handleRequest('/upload/something', context);
    expect(handler).toHaveBeenCalledWith(context, null);
  });
  it('should render simple path with pattern', () => {
    let router = new Router();
    let handler = jest.fn();

    router.addRoute('/upload/:file', handler);

    let context = {hello: 'world'};
    router.handleRequest('/upload/hai.txt', context);
    expect(handler).toHaveBeenCalledWith(context, 'hai.txt');
  });
});
