import {expect} from 'chai';
import helloStar from '../src';

describe('hello star function', function() {
  it('returns the correct string', function() {
    expect(helloStar()).to.be.equal('Hello star');
  });
});
