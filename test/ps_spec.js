const $ = require('./helpers/query-selector');
const ps = require('ps');
const loadFixture = require('./helpers/load-fixture');

describe('test', () => {
  it('test', () => {
    expect(ps()).toBe('ps');
  });

  it('doc test', () => {
    loadFixture('test');
    expect($('#test').clientWidth).toBe(100);
  });
});
