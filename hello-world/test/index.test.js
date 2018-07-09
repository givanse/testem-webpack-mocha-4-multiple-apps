import {expect} from 'chai';
import helloWorld from '../src';

describe('hello world function', function() {
  it('returns the correct string', function() {
    expect(helloWorld()).to.be.equal('Hello world');
  });
});