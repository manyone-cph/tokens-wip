const StyleDictionary = require("style-dictionary");

const cleanFontWeight = (val) => {
  if (val === "Light") {
    return 100;
  } else if (val === "Regular") {
    return 200;
  } else if (val === "Medium") {
    return 400;
  } else {
    return "bold";
  }
};

const cleanRemSize = (val) => {
  if (typeof val == "number") {
    return val / 16 + "rem";
  } else {
    return val;
  }
};

const cleanLineHeight = (lh, fz) => {
  let output = lh.replace("%", "");
  output = Number(output) * Number(fz);
  output = output / 100 / 16 + "rem";
  return output;
};

const cleanFontFamily = (val) => {
  let output;
  if (val == "Roboto") {
    output = "var(--ff-primary)";
  } else {
    output = "var(--ff-secondary)";
  }
  return output;
};

// // Transform line-height
// StyleDictionary.registerTransform({
//   name: 'size/lh',
//   type: 'value',
//   matcher: function (prop) {

//     return prop.attributes.category === 'line-height';
//   },
//   transformer: function (prop) {
//     if (prop.value.includes('%')) {
//       let output = prop.value.replace("%", "");
//       output = Number(output);

//       return output * 0.01
//     } else {
//       return prop.value;
//     }

//   }
// });
// Transform typography
StyleDictionary.registerTransform({
  name: "typography/map",
  type: "value",
  transitive: true,
  matcher: (token) => token.type === "typography",
  transformer: (token) => {
    let { fontWeight, fontSize, lineHeight, fontFamily, letterSpacing } = token.original.value;

    let output = `(
      fontFamily: ${cleanFontFamily(fontFamily)},
      fontSize: ${cleanRemSize(fontSize)},
      lineHeight:  ${cleanRemSize(lineHeight)},
      fontWeight: ${cleanFontWeight(fontWeight)},
      letterSpacing: ${cleanRemSize(letterSpacing)},
    )`;
    return output;
  },
});
// Transform font-family
StyleDictionary.registerTransform({
  name: "size/fontFamilies",
  type: "value",
  matcher: function (prop) {
    return prop.attributes.category === "font-family";
  },
  transformer: function (prop) {
    return cleanFontFamily(prop.value);
  },
});
// transform font-weight
StyleDictionary.registerTransform({
  name: "size/fontWeight",
  type: "value",
  matcher: function (prop) {
    return prop.attributes.category === "font-weight";
  },
  transformer: function (prop) {
    let output;
    if (prop.value.toLowerCase() == "light") {
      output = "100";
    } else if (prop.value.toLowerCase() == "regular") {
      output = "200";
    } else if (prop.value.toLowerCase() == "medium") {
      output = "400";
    } else {
      output = "bold";
    }
    return output;
  },
});
// transform shadows
StyleDictionary.registerTransform({
  name: "shadow/shorthand",
  type: "value",
  transitive: true,
  matcher: (token) => ["boxShadow"].includes(token.type),
  transformer: (token) => {
    let { color, x, y, blur, spread } = token.original.value;
    return x + "px " + y + "px " + blur + "px " + spread + "px " + color;
  },
});
// Convert to rem
StyleDictionary.registerTransform({
  name: "size/toREM",
  type: "value",
  matcher: function (prop) {
    return (
      prop.attributes.category === "letter-spacing" ||
      prop.attributes.category === "font-size" ||
      prop.type === "spacing" ||
      prop.type === "sizing" ||
      prop.attributes.category === "border" ||
      prop.attributes.category === "border-radius"
    );
  },
  transformer: function (prop) {
    return cleanRemSize(prop.value);
  },
});

module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/hex",
        "size/fontWeight",
        "size/fontFamilies",
        "size/toREM",
        "shadow/shorthand",
      ],
      buildPath: "./figma/",
      files: [
        {
          destination: "scss/core/_variables.scss",
          format: "scss/map-deep",
        },
      ],
    },
  },
};
