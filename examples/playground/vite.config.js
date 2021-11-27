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
  build: {
    rollupOptions: {
      external: ['loadsh'],
    },
  },
  resolve: {
    // alias: {
    //   lodash: 'lodash',
    // },
  },
  // optimizeDeps: {
  //   exclude: ['lodash'],
  // },
})
