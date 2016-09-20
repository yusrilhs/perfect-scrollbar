import appendElement from './helpers/append-element';

export default class Instance {
  constructor(container, opts) {
    this.container = container;
    this.opts = opts;

    this.appendScrollbars();
    this.installMutationObserver();

    // initialize properties and flags
    this.dirty = false;

    this.update();
  }

  appendScrollbars() {
    this.els = {};
    this.els.trackX = appendElement(this.opts.mount, 'div', 'ps-track-x');
    this.els.trackY = appendElement(this.opts.mount, 'div', 'ps-track-y');
    this.els.thumbX = appendElement(this.els.trackX, 'div', 'ps-thumb-x');
    this.els.thumbY = appendElement(this.els.trackY, 'div', 'ps-thumb-y');
  }

  installMutationObserver() {
    this.mutObserver = new MutationObserver(() => this.update());
    this.mutObserver.observe(this.container, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
  }

  update() {
    // FIXME: calculate scrollbar geometries

    // flag `dirty` true
    this.dirty = true;
  }
}
