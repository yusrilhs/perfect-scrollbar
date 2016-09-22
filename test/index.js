import 'babel-polyfill';
// require all modules ending in '_test' from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /_spec/);
testsContext.keys().forEach(testsContext);
