import { Plugin } from 'vite'

export function importMaps(): Plugin {
  return {
    name: 'vite-plugin-import-maps',
    async transform(_source: string, id: string) {
      return null
    },
  }
}
