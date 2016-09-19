import ps from 'perfect-scrollbar';
import Instance from 'perfect-scrollbar/instance';
import $ from './helpers/query-selector';
import F from './helpers/fixture';

describe('perfect-scrollbar', () => {
  beforeEach(() => F.load('index_spec'));
  afterEach(() => F.unload());

  it('parameters', () => {
    const container = $('#container');
    const mount = $('#mount');

    expect(() => ps(container, { mount, emulators: [] }))
      .not.toThrow();
  });

  it('selectors', () => {
    expect(() => ps('#container', { mount: '#mount', emulators: [] }))
      .not.toThrow();
  });

  it('return value', () => {
    const instance = ps('#container', { mount: '#mount', emulators: [] });
    expect(instance instanceof Instance).toBe(true);
  });

  it('wrong parameters', () => {
    const el = $('#container');
    const opt = { mount: '#mount', emulators: [] };

    expect(() => ps(null, opt)).toThrow();
    expect(() => ps(1234, opt)).toThrow();
    expect(() => ps('#no-el', opt)).toThrow();

    expect(() => ps(el, { mount: null, emulators: [] })).toThrow();
    expect(() => ps(el, { mount: 1234, emulators: [] })).toThrow();
    expect(() => ps(el, { mount: '#no-el', emulators: [] })).toThrow();

    expect(() => ps(el, { mount: '#mount', emulators: 1234 })).toThrow();
    expect(() => ps(el, { mount: '#mount', emulators: { } })).toThrow();
    expect(() => ps(el, { mount: '#mount', emulators: 'foo' })).toThrow();
  });
});
