# n8n Theme Editor



## Quick Start

- `make image` Build docker image for editor web application
- `make up` Start n8n, editor and nginx proxy in docker containers.
- Open http://localhost in browser
- Adjust colors
- When you ready to save your work
  - Open Developers tool Console in Browser (Ctrl+Shift+I works for Chrome and Firefox)
  - press "Export" button (at the bottom of editor UI), all css variables will be printed to console. Copy them to clipboard. 
  - Paste variables into `packages/design-system/src/css/_tokens.scss` [file](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.scss) (replace originals).

If you wan to work with existing n8n instance, for example local one, built from sources, where you want later put `_tokens.scss`, then read [Host network mode](#host-network-mode) section.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/digital-boss/n8n-theme-editor)


## Different ways to Start Working Environment

If you want to run editor service in docker, then build image: `make image`.


### Isolated mode (all services in docker)

- Remove `.env` file, or comment everything out inside (by prefixing with `#` every line).
- `make up`

### Host network mode

The host network option will be convenient in the following cases:
- If you want to work with an existing instance of n8n (to which you have access), or you want to deploy n8n locally (for example, by assembling from sources).
- If you want to run the editor in development mode with hot reload.

To run in this mode:
- configure the environment variables in `.env` file, use `env-examples/local.env` as a reference.
- `make up PROFILE=local SERVICES="<srv1> <srv2> ..."` to start only selected services. For list of services you can use combinations
  - `nginx n8n` In case you want to run editor in dev mode manually
  - `nginx editor` In case you have working instance of n8n
  - `nginx` In case you have n8n and editor, and want only proxy service to route two of them under single [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

Command `make up PROFILE=local` (withoud explicitly specifying services) will start all services in host network. But in case you want to run all tree docker services, consider to use [Isolated mode](#isolated-mode-all-services-in-docker). Every service you run in [host network mode](https://docs.docker.com/network/drivers/host/) ([more details](https://www.metricfire.com/blog/understanding-dockers-net-host-option/)) will expose their port in host network.


#### Variables

Example (from `env-examples/local.env`):

```sh
N8NTHEMES_PORT_NGINX=8080   # Which port nginx you want to listen on
N8NTHEMES_PORT_EDITOR=3001  # Port for editor web application. Default is 3000, but in case you run your instance manually and set different port, then set it also here.
N8NTHEMES_PORT_N8N=8765     # 
N8NTHEMES_N8N_URL=http://localhost:8765/
N8NTHEMES_EDITOR_URL=http://localhost:3001/
```

**In bridge mode**:
- ports: only nginx port will be exposed (and published) into host network, editor and n8n ports will not be exposed. 
- URLs should point to containers host (see default values in `docker-compose.yaml`: http://n8n:5678/, http://editor:3000/)

**In host mode**:
- ports: all services (and ports) will be part of host network.
- URLs: specify your service URL. For example: https://my.n8n.instance.com, http://localhost:3000.


## Build and run n8n as a local service

- Clone n8n core `git clone git@github.com:n8n-io/n8n.git`. May be you want to make a fork first, and then clone the fork.
- `pnpm install`
- `pnpm run build`
- `N8N_PATH=/n8n/ pnpm run start`

In this project we use only `N8N_PORT` and `N8N_PATH` environment variables. In case you need more customizations, check the following environment variables:

- N8N_PROTOCOL
- N8N_HOST
- N8N_PORT
- N8N_PATH
- WEBHOOK_URL
- N8N_EDITOR_BASE_URL
- VUE_APP_URL_BASE_API

The whole list of variables is [here](https://docs.n8n.io/hosting/environment-variables/environment-variables/).

## For Developers: Work with editor locally

- Install dependencies: `pnpm install` or `npm install` or `yarn install`
- `npm run dev` or `npm start` Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.
- `npm run build` Builds the app for production to the `dist` folder.

### Initial Theme Setup

In `src/App.tsx` there is theme import statement: `import { config } from './themes/dark';`. You can import any existing theme from `src/themes` as initial setup. This means, that after starting of [Working Environment](#different-ways-to-start-working-environment) you will see imported theme in n8n instance, rather than original one. So you can adjust theme by editing imported theme file having editor running in dev mode `pnpm start`.

Explanations about theme configuration format provided below.

It is better to understand on the example. Consider the following theme configuration:

```js
const config = {
  primary: {
    $: 'light-gray',
    tint: [88, 94.5, 96.9].map(h.lightness),
    shade: [57.6, 23].map(h.lightness),
  },
  avatar: {
    accent: Array(2).fill(undefined)
  },
  gray: '#333333',
  'light-grey': undefined,
  sticky: {
    notes: {
      workspace: {
        body: h.toDefault(['background', 'border'])
      }
    }
  }
}
```

This tree structure will be expanded into following css variables (values in angle brackets `<...>` has special meaning):

```js
{
  '--color-primary': 'light-gray',
  '--color-primary-tint-1': '<computed>',
  '--color-primary-tint-2': '<computed>',
  '--color-primary-tint-3': '<computed>',
  '--color-primary-shade-1': '<computed>',
  '--color-primary-shade-2': '<computed>',
  '--color-avatar-accent-1': '<get from n8n>',
  '--color-avatar-accent-2': '<get from n8n>',
  '--color-gray': '#333333',
  '--color-light-grey': '<get from n8n>',
  '--color-sticky-notes-workspace-body-background': '<get from n8n>',
  '--color-sticky-notes-workspace-body-border': '<get from n8n>'
}
```

#### Hierarchy

The theme configuration is a hierarchical json object. Whose leaves can have the following types of values: undefined, function, string. For more information about the values, see the next section, in this we will look at the meaning of the hierarchy. 

The hierarchical object will be transformed into a flat one (with a key and a value). All leaf values of the source object will be taken as values, and the corresponding keys will be composed of a chain of key values leading to this leaf value. 

The $ key has a special meaning - it represents a leaf value for the container. 

Arrays in this structure are used for a short form of writing - they are replaced with the corresponding objects, in which the key is the ordinal number (starting from 1) of the array element. Arrays are convenient to use when a parent has several numbered descendants. For example, for tint descendants: 1, 2, 3. See the resulting object above.

#### Values meaning

- The `undefined` value as the color is an indicator that the color will need to be obtained from the n8n instance. In resulting variables list this value type represented as `<get from n8n>`.
- Function as a value means computed value, depended on its parent. See `<computed>` special in resuts.
- String value means exact color value, for example '#333333' or 'light-gray'.


## Known Issues

- Changing `--color-canvas-dot` color from UI doesn't update color in real time. Workaround is - move (pan) n8n workspace in UI (Ctrl + Left Mouse Drag).