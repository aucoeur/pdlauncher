// TODO: test for authjoin
// import { isCodeValid } from '../index';
// TODO: test why joincode returns below JSON:
  // {
  //   "teacherUrl": "tjagylyls",
  //   "type": "slides"
  // }
const isCodeValid = require('../index');
const isMemeNumber = require('is-meme-number');

test(`sanity check`, () => {
  expect(isMemeNumber(42)).toBeTruthy()
})

test(`valid join code`, () => {
  expect(isCodeValid('asfhsf')).toBeTruthy()
  expect(isCodeValid('abc def')).toBeFalsy()
  expect(isCodeValid('asfasdahsf')).toBeFalsy()
  expect(isCodeValid()).toBeUndefined()
})

// test(`main will return something`, () => {
//   expect(main()).toBe(`${joinCode} is not a valid code`)
// })
// comment out main() or current tests will fail
