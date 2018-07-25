import {expect} from 'chai';
import helloStar from '../src';

describe('hello star function', function() {
  it('returns the correct string', async function() {
    const r = await helloStar();
    expect(r).to.be.equal('Hello star');
  });
});
