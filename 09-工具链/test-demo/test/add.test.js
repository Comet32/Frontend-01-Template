import { add }  from '../src/add.js'
import assert from 'assert'

// var { add } = require('../src/add.js');
// var assert = require('assert');

describe('Array', function () {
  it('add(4 + 5) should be 9', function () {
    assert.equal(add(4, 5), 9);
  });
});
