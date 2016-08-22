const path = require('path');

const fixtures = Object.keys(__html__).reduce((result, fixturePath) => {
  result[path.basename(fixturePath, '.html')] = __html__[fixturePath];
  return result;
}, {});

module.exports = function (name) {
  const fixture = fixtures[name];
  if (!fixture) {
    throw new Error('no fixture named', name);
  }
  document.body.innerHTML = fixtures[name];
};
