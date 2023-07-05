# Issue: React is not defined

Reproduces only in production. And only in docker containers. Reproduces with `pnpm`, as well as with `npm`. For some reason it doesn't reproduced on my local machine.

Reproduction steps:

```
pnpm install
pnpm run build
pnpm run serve
```

Open browser and see in console:

```
Uncaught ReferenceError: React is not defined
    at index-581b7c1b.js:2:786
    at index-581b7c1b.js:1:6821
    at W.l (index-581b7c1b.js:1:1022)
    at B (index-581b7c1b.js:1:3495)
    at W (index-581b7c1b.js:1:1064)
    at We (index-581b7c1b.js:1:6789)
    at HTMLIFrameElement.<anonymous> (index-581b7c1b.js:2:773)
```

In dist/assets/index*.js there is unexpected React reference:

```js
    return React.createElement("div", {
        class: K.App
    }, React.createElement("header", {
        class: K.header
    }, React.createElement(De, {
        each: Object.entries(e)
    }, ([r,[s,o]])=>React.createElement("div", {
        class: K.item
    }, React.createElement("span", null, r, ":"), React.createElement(Ve, {
```

Resources: 
- [@vitejs/plugin-react@1.1.4: ReferenceError: React is not defined when rendering a Dialog-component from @mui/material](https://github.com/vitejs/vite/issues/6537). Similar problem. 

