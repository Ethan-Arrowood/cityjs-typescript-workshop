# cityjs-typescript-workshop

The workshop is broken up into two main parts. First, [Languagae Features](#language-features), covers multiple intermediate and advanced language features every TypeScript engineer should have in their tool belt. Second, [Project Tooling](#project-tooling) dives into various TypeScript project utilities covering compiler configuration, linting, testing, and more.

The workshop has an estimated run time of **4 hours**. This estimate includes breaks, discussions, and questions.

Before starting the workshop please review and complete the follow requirements:

- [git](https://git-scm.com/) v2.x
- [Node.js](https://nodejs.org/) v14.x
	> this workshop was written and verified on git v2.24.3 and node v14.16.0
- Code Editor of choice (recommended: [VSCode](https://code.visualstudio.com/) for TypeScript IntelliSense)

Additionally, it is recommended you clone or download this repo so you have direct access to any referenced code blocks. All code in the workshop will be found in their relative section directory. Since this workshop involves TypeScript code blocks, they cannot be executed with the Node.js cli alone. There are multiple options for running TypeScript blocks; use whichever is easiest for you.

1. Locally using `ts-node`
	- First, install `typescript` and `ts-node` as global npm modules on your system using `npm i -g typescript ts-node`
	- Run any `*.ts` file using `ts-node script.ts` in your terminal
	- Alternatively, use `npx ts-node` and skip global module installation
2. In browser using [TypeScript Playground](https://www.typescriptlang.org/play)
	- All sections in this workshop have a corresponding [Run in TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNegChfiohUeJyQcpx4EgAUAOQAEpCcEQA0oADqFJzGAIQxAJRAA) link that will open the relative code block in your default browser.

## Table of Contents

- Language Features
	- [Optional Chaining & Nullish Coalescing](./1-language-features/a-optional-chaining-nullish-coalescing)
	- [Tuples](./1-language-features/tuples)
	- [Imports](./1-language-features/imports)
	- [Function Overloading](./1-language-features/function-overloading)
	- [Template Literal Types](./1-language-features/template-literal-types)
	- [Declaration Merging](./1-language-features/declaration-merging)
- Project Tooling
	- [Linting](./2-project-tooling/b-linting)
