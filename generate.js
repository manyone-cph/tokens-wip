const { transformTokens } = require('token-transformer');

const rawTokens = {
  setA: {
    "sizing": {
      "base": {
        "value": "4",
        "description": "Alias value",
        "type": "sizing"
      },
      "large": {
        "value": "$sizing.base * 2",
        "description": "Math value",
        "type": "sizing"
      }
    }
  }
};

const setsToUse = ['setA'];
const excludes = [];

const transformerOptions = {
  expandTypography: true,
  expandShadow: true,
  expandComposition: true,
  preserveRawValue: false,
  throwErrorWhenNotResolved: true,
  resolveReferences: true
}

const resolved = transformTokens(rawTokens, setsToUse, excludes, transformerOptions);

/*{
  sizing: {
    base: { value: 4, description: 'Alias value', type: 'sizing' },
    large: { value: 8, description: 'Math value', type: 'sizing' } 
  }
}*/