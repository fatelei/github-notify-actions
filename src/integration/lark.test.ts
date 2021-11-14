import mockAxios from 'jest-mock-axios';
import { expect, test, afterEach, jest } from '@jest/globals'
import Lark from './lark';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

test('not support message type', async () => {
  const lark = new Lark('http://t.com');
  let catchFn = jest.fn();
  let thenFn = jest.fn();

  lark.sendMessage('test', 'test').catch(catchFn).then(thenFn);
  await Promise.resolve();
  expect(catchFn).toBeCalled();
});

test('send text message', async () => {
  const lark = new Lark('http://t.com');
  let catchFn = jest.fn();
  let thenFn = jest.fn();

  lark.sendMessage('text', 'test').then(thenFn).catch(catchFn);
  await Promise.resolve();
  expect(catchFn).not.toBeCalled();
  expect(mockAxios.post).toHaveBeenCalledWith('http://t.com', {data: {
    msg_type: 'text',
    text: {
      content: 'test'
    }
  }});
});