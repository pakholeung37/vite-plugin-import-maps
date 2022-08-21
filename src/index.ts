import { Plugin } from 'vite'
import { ImportMap } from './types'

const prefix = '/@import-maps/'
export function importMaps(options: ImportMap[] | (() => ImportMap[])): Plugin {
  if (typeof options === 'function') options = options()
  const oriImportMap: Required<ImportMap> = Object.assign(
    { imports: {}, scope: {} },
    ...options,
  )

  const importMap: Required<ImportMap> = {
    imports: {
      ...oriImportMap.imports,
      ...Object.keys(oriImportMap.imports).reduce(
        (acc, imp) => ({
          ...acc,
          [`${prefix}${imp}`]: oriImportMap.imports[imp],
        }),
        {},
      ),
    },
    scope: {
      ...oriImportMap.scope,
    },
  }

  return {
    name: 'vite-plugin-import-maps',
    config() {
      return {
        resolve: {
          alias: {
            ...Object.keys(importMap.imports).reduce(
              (acc, imp) => ({ ...acc, [imp]: `${prefix}${imp}` }),
              {},
            ),
          },
        },
        // optimizeDeps: {
        //   include: Object.keys(oriImportMap.imports),
        // },
      }
    },
    transformIndexHtml: {
      enforce: 'post',
      transform(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: {
                type: 'importmap',
              },
              children: JSON.stringify(importMap, null, 2),
              injectTo: 'head-prepend',
            },
          ],
        }
      },
    },
  }
}
