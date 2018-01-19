import EventEmitter from '../EventEmitter';

it('shouldnt do anything', () => {
  let e = new EventEmitter();
  let mockCallback = jest.fn();

  e.emit('smth');
  expect(mockCallback.mock.calls.length).toEqual(0);
});

it('should callback once', () => {
  let e = new EventEmitter();
  let mockCallback = jest.fn();
  e.addListener('smth', mockCallback);
  e.emit('smth');
  expect(mockCallback.mock.calls.length).toEqual(1);
});

it('should remove listener by id', () => {
  let e = new EventEmitter();
  let mockCallback = jest.fn();
  let smthID = e.addListener('smth', mockCallback);
  e.emit('smth');
  e.emit('smth');
  e.removeListenerByID(smthID);
  e.emit('smth');
  expect(mockCallback.mock.calls.length).toEqual(2);
});
