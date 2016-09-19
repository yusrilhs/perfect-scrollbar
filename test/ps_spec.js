import ps from 'ps';
import $ from './helpers/query-selector';
import F from './helpers/fixture';

describe('ps', () => {
  describe('initialize', () => {
    beforeEach(() => F.load('index'));
    afterEach(() => F.unload());

    it('gets an element as its first parameter', () => {
      const container = $('#container');
      expect(() => ps(container)).not.toThrow();
    });

    it('gets a selector as its first parameter', () => {
      expect(() => ps('#container')).not.toThrow();
    });

    it('throws an error with a wrong element', () => {
      expect(() => ps()).toThrow();
      expect(() => ps(null)).toThrow();
      expect(() => ps(1234)).toThrow();
      expect(() => ps('#no-element')).toThrow();
    });
  });
});
