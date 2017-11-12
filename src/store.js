const undb = require('undb');

module.exports = onChange => onChange(undb({
  path: 'localstorage',
  onChange,
  initial: {
    tasks: []
  }
}));
