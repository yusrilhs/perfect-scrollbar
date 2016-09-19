export default function appendElement(target, tagName, className) {
  const el = document.createElement(tagName);
  if (className) {
    el.className = className;
  }
  target.appendChild(el);
  return el;
}
