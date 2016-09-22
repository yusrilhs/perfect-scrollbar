/* eslint-disable no-param-reassign */
import ps from 'perfect-scrollbar';
import Instance from 'perfect-scrollbar/instance';
import $ from './helpers/query-selector';
import F from './helpers/fixture';
import { nextFrame } from './helpers/timing';

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

  const updateTest = changes => done => {
    const container = $('#container');
    const instance = ps(container, { mount: '#mount', emulators: [] });
    spyOn(instance, 'update');
    expect(instance.update).not.toHaveBeenCalled();

    (async function asyncIterate(fns, i) {
      const fn = fns[i];
      if (!fn) {
        return;
      }
      fn(container);
      await nextFrame();
      asyncIterate(fns, i + 1);
    }(changes.concat(() => {
      expect(instance.update.calls.count()).toEqual(changes.length);
      done();
    }), 0));
  };

  describe('mutation observer', () => {
    it('update when the container style changes', updateTest([
      container => { container.style.width = '200px'; },
    ]));

    it('update when the container class changes', updateTest([
      container => { container.className = 'modifier'; },
    ]));

    it('update when a child is appended', updateTest([
      container => container.appendChild(document.createElement('div')),
    ]));

    it('update when the content style changes', updateTest([
      () => { $('#content').className = 'modifier'; },
    ]));

    it('update when the content geometry changes', updateTest([
      () => { $('#content').className = 'modifier'; },
    ]));

    it('update several times', updateTest([
      container => { container.style.width = '200px'; },
      container => container.appendChild(document.createElement('div')),
    ]));
  });

  describe('scroll handler', () => {
    it('update when the container scrolls', updateTest([
      container => { container.scrollTop = 100; },
    ]));

    it('update multiple times', updateTest([
      container => { container.scrollTop = 100; },
      container => { container.scrollTop = 20; },
    ]));
  });

  describe('render loop', () => {
    it('calls render on update', async done => {
      const instance = ps('#container', { mount: '#mount', emulators: [] });
      spyOn(instance, 'render');
      await nextFrame();
      // update is called on initialisation, and then render
      expect(instance.render.calls.count()).toEqual(1);
      await nextFrame();
      // render is not called
      expect(instance.render.calls.count()).toEqual(1);
      instance.update();
      await nextFrame();
      expect(instance.render.calls.count()).toEqual(2);
      done();
    });
  });
});
