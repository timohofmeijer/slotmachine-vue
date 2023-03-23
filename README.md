# Slot Machine

This slot machine is written in [Vue](https://vuejs.org) (Vue 3 using their options API), [Typescript](https://www.typescriptlang.org) and [PostCSS](https://postcss.org) with [Vite](https://vitejs.dev) as our build and dev tool. It includes a bot which allows for getting an idea of your chances without having to do any probability math. The code was originally written during a long trip in the car, as a playfull experiment and an attempt to inspire my kids, which it failed to do. Feel free to use, play with or fork this project. A live demo lives at [https://slotmachine.hofmeijer.me](https://slotmachine.hofmeijer.me).

## Running the Slotbot 🤖

- The slot-machine can be run by a bot by setting the `slotbot` queryParam to true: `<url>?slotbot=true`.
- When you want the bot to briefly stop when locking or winning add the aditional `show` param: `<url>?slotbot=true&show=true`.
- Check the browsers [developer console](https://balsamiq.com/support/faqs/browserconsole/) for the results.

The code for the bot can be found in `src/mixins/slot-bot.ts`. Here you can change the way the bot locks reels (defaults to all doubles except for lemons), change the number of sets it will run (`BOT_SET_COUNT`) and the number of spins per set (`BOT_SPIN_COUNT`).

You can also change your chances by changing the value of each symbol (`src/symbol-data.ts`) or by changing their count in each reel (`src/utilities/get-symbol-composition.ts`).

# Standard Vue Info

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
