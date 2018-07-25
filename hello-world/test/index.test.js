import {expect} from 'chai';
import helloWorld from '../src';

describe('hello world function', function() {
  it('returns the correct string', async function() {
    const r = await helloWorld();
    expect(r).to.be.equal('Hello world');
  });
});