// build.js
const StyleDictionary = require('style-dictionary');

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: './dist/scss/',
      files: [{
        destination: '_core.scss',
        format: 'scss/variables',
        filter: {
          name: new RegExp("^$core-")
        }
      }]
    }
  }
});

myStyleDictionary.buildAllPlatforms();

// You can also extend Style Dictionary multiple times:
const myOtherStyleDictionary = myStyleDictionary.extend({
  // new configuration
});

myOtherStyleDictionary.buildAllPlatforms();