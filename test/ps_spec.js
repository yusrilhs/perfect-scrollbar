import ps from 'ps';
import $ from './helpers/query-selector';
import loadFixture from './helpers/load-fixture';

describe('test', () => {
  it('test', () => {
    expect(ps()).toBe('ps');
  });

  it('doc test', () => {
    loadFixture('test');
    expect($('#test').clientWidth).toBe(100);
  });
});
