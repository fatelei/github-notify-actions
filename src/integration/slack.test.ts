import mockAxios from 'jest-mock-axios'
import {expect, test, afterEach, jest} from '@jest/globals'
import Slack from './slack'

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset()
})

test('not support message type', async () => {
  const slack = new Slack('http://t.com')
  let catchFn = jest.fn()
  let thenFn = jest.fn()

  await slack.sendMessage('test', 'test', 'test').then(thenFn).catch(catchFn)
  expect(catchFn).toBeCalled()
})

test('send text message', async () => {
  const slack = new Slack('http://t.com')
  let catchFn = jest.fn()
  let thenFn = jest.fn()

  slack.sendMessage('text', 'test', 'test').then(thenFn).catch(catchFn)
  await Promise.resolve()
  expect(catchFn).not.toBeCalled()
  expect(mockAxios.post).toHaveBeenCalledWith('http://t.com', {
    text: 'test'
  })
})
