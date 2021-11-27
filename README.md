# vite-plugin-import-maps

Use native browser import-maps in vite. What's [import-maps](https://github.com/WICG/import-maps)

## Usage

Simply add import-maps plugin in vite.config

```javascript
// vite.config.js
const { defineConfig } = require('vite')
const { importMaps } = require('vite-plugin-import-maps')

module.exports = defineConfig({
  plugins: [
    importMaps([
      {
        imports: {
          lodash: 'https://esm.sh/lodash-es@4.17.20',
        },
      },
    ]),
  ],
})
```

Then your module will import from cdn instead of vite pre-bundle module.

Cuz it use native import-maps, itt also allow you to use module in runtime.

```html
<!-- index.html -->
<script type="module">
  import _, { isNaN } from 'lodash'

  console.log(_.isNaN(NaN)) // true
  console.log(isNaN(NaN)) // true
</script>
```

## Limitation

Until now, only Chrome implements the import-maps feature. But it is easy to use a polyfill with [es-module-shims](https://github.com/guybedford/es-module-shims).

And to be ware, due to there is no way for vite to unresolve bare moduleId now, this plugin use an alia with the preifx `/@import-maps/`, which means `import 'lodash'` will transform to `import '/@import-maps/lodash'`.

## License

[MIT](LICENSE)
