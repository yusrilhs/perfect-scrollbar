import { basename } from 'path';

// eslint-disable-next-line no-underscore-dangle
const htmls = window.__html__;

const fixtures = Object.keys(htmls)
  .reduce((result, fixturePath) =>
    Object.assign(result, { [basename(fixturePath, '.html')]: htmls[fixturePath] })
  , {});

export function load(name) {
  const fixture = fixtures[name];
  if (!fixture) {
    throw new Error('no fixture named', name);
  }
  document.body.innerHTML = fixtures[name];
}

export function unload() {
  document.body.innerHTML = '';
}
