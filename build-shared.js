// build.js
const StyleDictionary = require('style-dictionary');

const cleanRemSize = (val) => {
  if (typeof val == "number") {
    return val / 16 + "rem";
  } else {
    return val;
  }
};
// Convert to rem
StyleDictionary.registerTransform({
  name: "size/toREM",
  type: "value",
  matcher: function (prop) {
    console.log(prop);
    return (
      prop.type === "fontSizes" ||
      prop.type === "spacing" ||
      prop.type === "sizing" ||
      prop.path.includes("typography") && prop.path.includes("fontSize")
    );
  },
  transformer: function (prop) {
    return cleanRemSize(prop.value);
  },
});
// This code takes the tokens from the core/ folder in the tokens/ folder and creates a
// SCSS file with a _core.scss file and a JS file with a core.js file.

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: './dist/scss/',
      transforms: [
        "name/cti/kebab", "size/toREM",
      ],
      files: [{
        destination: '_shared.scss',
        format: 'scss/variables',
        // add filter to only include tokens that are not in the theme folder
        filter: (token) => {
          return !token.path.includes("theme/a/core");
        },
      }, {
        destination: '_themea.scss',
        format: 'scss/variables',
        // add filter to only include tokens that are not in the theme folder
        filter: (token) => {
          return token.path.includes("theme/a/core");
        },
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: './dist/js/',
      files: [{
        destination: 'shared.js',
        format: 'javascript/es6',
      }]
    }
  }
});

myStyleDictionary.buildAllPlatforms();