import appendElement from './helpers/append-element';

export default class Instance {
  static properties() {
    return {
      container: null,
      opts: {},
      els: {},
      mutObserver: null,
      scrollHandler: null,
      renderLoop: null,
      dirty: false,
    };
  }

  constructor(container, opts) {
    Object.assign(this, Instance.properties());

    this.container = container;
    this.opts = opts;

    this.appendScrollbars();
    this.installMutationObserver();
    this.installScrollHandler();
    this.installRenderLoop();

    this.update();
  }

  appendScrollbars() {
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

  installScrollHandler() {
    this.scrollHandler = () => this.update();
    this.container.addEventListener('scroll', this.scrollHandler);
  }

  installRenderLoop() {
    this.renderLoop = () => {
      if (this.dirty) {
        this.render();
      }
      // reset dirty to false
      this.dirty = false;
      if (this.renderLoop) {
        requestAnimationFrame(this.renderLoop);
      }
    };
    requestAnimationFrame(this.renderLoop);
  }

  update() {
    // 'update' doesn't actually update geometry.
    // it just changes a flag `dirty` to true, which causes each frame loop
    // to update the real geometries later.
    this.dirty = true;
  }

  render() {
    // FIXME: calculate geometry and apply
  }
}
