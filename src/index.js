import convertToElement from './helpers/convert-to-element';
import Instance from './instance';

export default function createPsInstance(el, opts) {
  if (!el) {
    throw new Error('no container element specified');
  }

  const container = convertToElement(el);

  if (!opts.mount) {
    throw new Error('no mount element specified');
  }
  Object.assign(opts, { mount: convertToElement(opts.mount) });

  if (!Array.isArray(opts.emulators)) {
    throw new Error(`invalid emulators: ${String(opts.emulators)}`);
  }

  return new Instance(container, opts);
}
