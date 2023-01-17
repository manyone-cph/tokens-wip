// build.js
const StyleDictionary = require("style-dictionary");

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
      (prop.path.includes("typography") && prop.path.includes("fontSize"))
    );
  },
  transformer: function (prop) {
    return cleanRemSize(prop.value);
  },
});
// This code takes the tokens from the core/ folder in the tokens/ folder and creates a
// SCSS file with a _core.scss file and a JS file with a core.js file.

const filePaths = {
  shared: "tokens/shared.json",
  themeA: "tokens/theme/a.json",
  themeB: "tokens/theme/b.json",
};

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./dist/scss/",
      transforms: ["name/cti/kebab", "size/toREM"],
      files: [
        {
          destination: "_shared.scss",
          format: "scss/variables",
          filter: (token) => {
            // only include: shared
            return token.filePath === filePaths.shared;
          },
        },
        {
          destination: "_theme-a.scss",
          format: "scss/variables",
          filter: (token) => {
            // only include: theme a
            return token.filePath === filePaths.themeA;
          },
        },
        {
          destination: "_theme-b.scss",
          format: "scss/variables",
          filter: (token) => {
            // only include: theme b
            return token.filePath === filePaths.themeB;
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "./dist/js/",
      files: [
        {
          destination: "_shared.js",
          format: "javascript/es6",
          filter: (token) => {
            // only include: shared
            return token.filePath === filePaths.shared;
          },
        },
        {
          destination: "_theme-a.js",
          format: "javascript/es6",
          filter: (token) => {
            // only include: theme a
            return token.filePath === filePaths.themeA;
          },
        },
        {
          destination: "_theme-b.js",
          format: "javascript/es6",
          filter: (token) => {
            // only include: theme b
            return token.filePath === filePaths.themeB;
          },
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
