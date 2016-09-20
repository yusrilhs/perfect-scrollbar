/* eslint-disable no-param-reassign */
import ps from 'perfect-scrollbar';
import Instance from 'perfect-scrollbar/instance';
import $ from './helpers/query-selector';
import F from './helpers/fixture';

const FRAME = 20; // 20ms is enough duration for a frame

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

  describe('observer', () => {
    const observeTest = changes => done => {
      const container = $('#container');
      const instance = ps(container, { mount: '#mount', emulators: [] });
      spyOn(instance, 'update');
      expect(instance.update).not.toHaveBeenCalled();

      (function asyncIterate(fns, i) {
        const fn = fns[i];
        if (!fn) {
          return;
        }
        fn(container);
        setTimeout(() => asyncIterate(fns, i + 1), FRAME);
      }(changes.concat(() => {
        expect(instance.update.calls.count()).toEqual(changes.length);
        done();
      }), 0));
    };

    it('update when the container style changes', observeTest([
      container => { container.style.width = '200px'; },
    ]));

    it('update when the container class changes', observeTest([
      container => { container.className = 'modifier'; },
    ]));

    it('update when a child is appended', observeTest([
      container => container.appendChild(document.createElement('div')),
    ]));

    it('update when the content style changes', observeTest([
      () => { $('#content').className = 'modifier'; },
    ]));

    it('update when the content geometry changes', observeTest([
      () => { $('#content').className = 'modifier'; },
    ]));

    it('update several times', observeTest([
      container => { container.style.width = '200px'; },
      container => container.appendChild(document.createElement('div')),
    ]));
  });
});
