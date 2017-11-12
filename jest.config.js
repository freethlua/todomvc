exports.moduleNameMapper = {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/assets/files.js',
  '\\.(css|less|styl)$': '<rootDir>/__mocks__/assets/styles.js',
};

exports.snapshotSerializers = ['preact-render-spy/snapshot'];

exports.transform = {};

exports.collectCoverage = true;
