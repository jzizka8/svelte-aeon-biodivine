# Svelte AEON Biodivine
Svelte AEON biodivine is a Svelte version of AEON tool by System Biology Laboratory at Masaryk University.
It no longer needs to run the compute engine separately, instead, it uses a Web Assembly module.
Work in progress.
## Setup
Setup submodules
```bash
git submodule init
git submodule update
```
Install node modules and wasm compute engine

`npm i && npm run wasm`

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

<!-- > To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. -->
## Usage
To see basic usage of the tool, refer to the `example/README.MD`