import ps from 'perfect-scrollbar';
import Instance from 'perfect-scrollbar/instance';
import $ from './helpers/query-selector';
import F from './helpers/fixture';

describe('instance', () => {
  beforeEach(() => F.load('instance'));
  afterEach(() => F.unload());

  describe('constructor', () => {
    it('add scrollbars to the mount element', () => {
      const instance = ps('#container', { mount: '#mount', emulators: [] });
      expect($('#mount .ps-track-x')).toBe(instance.els.trackX);
      expect($('#mount .ps-track-y')).toBe(instance.els.trackY);
      expect($('#mount .ps-track-x .ps-thumb-x')).toBe(instance.els.thumbX);
      expect($('#mount .ps-track-y .ps-thumb-y')).toBe(instance.els.thumbY);
    });

    it('update scrollbar geometry properly', () => {
      const container = $('#container');
      spyOn(Instance.prototype, 'update');
      const instance = ps(container, { mount: '#mount', emulators: [] });
      expect(instance.update).toHaveBeenCalled();
    });
  });
});
