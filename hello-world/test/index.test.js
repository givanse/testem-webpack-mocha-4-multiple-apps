//const {describe, it} = require('mocha');
const expect = require('chai').expect;
const helloWorld = require('../src');

describe('hello world function', function() {
  it('returns the correct string', function() {
    expect(helloWorld()).to.be.equal('hello world');
  });
});
