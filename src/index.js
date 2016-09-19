import convertToElement from './helpers/convert-to-element';

export default function createPsInstance(el) {
  if (!el) {
    throw new Error('no container element specified');
  }

  const container = convertToElement(el);

  return container; // FIXME: temporary
}
