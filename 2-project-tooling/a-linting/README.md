# Linting

This interactive section will demonstrate how to add ESLint to an existing TypeScript project.

1. Install ESLint
  ```sh
  npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```
  A linter is a developer dependency, so it should be installed using the `-D` flag (synonymous for `--save-dev`).
2. Create an ESLint configuration file `eslintrc.json` in the root of the project directory. Copy and paste the following into it:
  ```json
  {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ]
  }
  ```
  This file configures ESLint to use a different parser; one specific for TypeScript. It also extends from a default set of linting rules; very useful for getting up and running quickly!
3. Create an ESLint ignore file `.eslintignore` and add `node_modules` and `dist` to it.
4. In `package.json` add a new script: `"lint": "eslint lib"`.
5. Run the newly configured linter with `npm run lint`

My configuration spits out some warnings about functions missing return types:

```sh
➜  zookeeper git:(main) ✗ npm run lint

> zookeeper@0.0.1 lint
> eslint lib --ext .ts


/zookeeper/lib/zookeeper.ts
  28:2  warning  Missing return type on function  @typescript-eslint/explicit-module-boundary-types
  32:2  warning  Missing return type on function  @typescript-eslint/explicit-module-boundary-types

✖ 2 problems (0 errors, 2 warnings)
```

I can fix these up by modifying the code and specifying that both of these methods explicitly return `void`.

## Standard

In addition to configuring ESLint, I like to add [Standard.js](https://standardjs.com/).

1. Install some more dev dependencies
  ```sh
  npm install -D eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 eslint-config-standard-with-typescript
  ```
2. Modify `.eslintrc.json`
  ```json
  {
    "extends": "standard-with-typescript",
    "parserOptions": {
      "project": "./tsconfig.json"
    }
  }
  ```
3. Run `npm run lint` - My machine reported 58 errors!
4. Fix them using `npm run lint -- --fix` 🧹

And just like that the `zookeeper.ts` source code is linted and following `Standard` formatting!