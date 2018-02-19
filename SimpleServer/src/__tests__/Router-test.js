// @flow

import Router, {parsePath, parsePattern} from '../Router';

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
  let expectedResult = {pattern, base: '/upload/', placeholder: 'fileName'};

  expect(result).toEqual(expectedResult);
});

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

xit('should render the root path', () => {
  let router = new Router();
  let handler = jest.fn();

  router.addRoute('/', handler);

  let context = {hello: 'world'};
  router.handleRequest('/', context);
  expect(handler).toHaveBeenCalledWith(context);
});
