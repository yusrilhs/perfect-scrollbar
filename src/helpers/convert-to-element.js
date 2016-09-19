export default function convertToElement(target) {
  if (typeof target === 'object') {
    return target;
  }
  if (typeof target !== 'string') {
    throw new Error(`invalid element specifier: ${String(target)}`);
  }

  const element = document.querySelector(target);
  if (!element) {
    throw new Error(`no matching element for a selector: ${target}`);
  }
  return element;
}
