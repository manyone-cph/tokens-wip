# figma-tokens-example

This example illustrates how you can transform your tokens stored on Figma Tokens (with GitHub sync enabled) to be automatically transformed with token-transformer and Style Dictionary.

Change your tokens in `tokens.json` (either directly or with the Figma Tokens plugin in Figma). The GitHub action will automatically generate tokens to the `tokens/` directory that can then be read by Style Dictionary, which will output tokens to the format you defined in `config.json`

## Generate tokens

1. `nvm use` to switch to the correct node version
2. `npm install` to install dependencies
3. `npm run build` to generate tokens

### All commands

Here's a breakdown of the commands we have:

* `clean:token-transformer` - remove the `tokens` directory
* `clean:style-dictionary` - remove the `dist` directory
* `clean` - run both `clean:token-transformer` and `clean:style-dictionary`
* `generate-tokens:shared` - generate a json file for the *shared* tokens
* `generate-tokens:theme:a` - generate a json file for the *theme a* tokens
* `generate-tokens:theme:b` - generate a json file for the *theme b* tokens
* `generate-styles` - run the `build-shared.js` script to generate the `dist` directory which contains the scss and js files that can be used in other projects
* `build` - clean folders, then generate the tokens and styles
