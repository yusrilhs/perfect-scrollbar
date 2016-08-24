import { basename } from 'path';

const fixtures = Object.keys(__html__).reduce((result, fixturePath) => {
  result[basename(fixturePath, '.html')] = __html__[fixturePath];
  return result;
}, {});

export default function loadFixture(name) {
  const fixture = fixtures[name];
  if (!fixture) {
    throw new Error('no fixture named', name);
  }
  document.body.innerHTML = fixtures[name];
};
