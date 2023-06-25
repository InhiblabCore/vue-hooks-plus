import { setupDevtoolsPlugin } from '@vue/devtools-api'
import * as cacheSubscribe from '../utils/cacheSubscribe'
// import { CachedData } from '../utils/cache'

import RegisterDevToolsStore from './register'
import { unref } from 'vue'

const MUTATIONS_LAYER_ID = 'vue-hooks-plus:mutations'
const pluginId = 'vue-hooks-plus'
const pluginName = 'Vue Hooks Plus 🍭'
const pluginLogo =
  'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/c3b984112610ef3fb21140a0beb27b4a228fe0b3/packages/hooks/docs/public/logo.svg'

const controlMap = new Map<symbol, string>()
// type Timer = ReturnType<typeof setTimeout>;
// interface RecordData extends CachedData {
//   timer: Timer | undefined;
// }

export function setupDevtools(app: any, cache: any) {
  setupDevtoolsPlugin(
    {
      id: pluginId,
      label: pluginName,
      packageName: 'vue-hooks-plus',
      homepage: 'https://inhiblabcore.github.io/docs/hooks',
      logo: pluginLogo,
      app,
      settings: {
        baseSort: {
          type: 'choice',
          component: 'button-group',
          label: 'Sort Cache Entries',
          options: [
            {
              label: 'ASC',
              value: 1,
            },
            {
              label: 'DESC',
              value: -1,
            },
          ],
          defaultValue: 1,
        },
      },
    },
    api => {
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Vue Hooks Plus`,
        color: 0xe5df88,
      })

      api.addInspector({
        id: pluginId,
        label: pluginName,
        icon: 'api',
        treeFilterPlaceholder: 'Search Cache useRequest',
      })

      RegisterDevToolsStore.subscribe(() => {
        api.sendInspectorTree(pluginId)
        api.sendInspectorState(pluginId)
      })

      cacheSubscribe.otherSubscribe(event => {
        api.sendInspectorTree(pluginId)
        api.sendInspectorState(pluginId)

        api.addTimelineEvent({
          layerId: pluginId,
          event: {
            title: 'update',
            subtitle: event.type,
            time: api.now(),
            data: event.data,
          },
        })
      })

      api.on.getInspectorTree(payload => {
        if (payload.inspectorId === pluginId) {
          controlMap.clear()
          // const settings = api.getSettings()
          // console.log();

          const queries = RegisterDevToolsStore.getAll()
          // const queriesSort: any = queries

          // if (settings.baseSort === 1) {
          //   queriesSort = Object.fromEntries(Object.entries(queries).sort(([, a], [, b]) => b.time - a.time));
          // } else {
          //   queriesSort = Object.fromEntries(Object.entries(queries).sort(([, a], [, b]) => a.time - b.time));
          // }
          const symbols = Object.getOwnPropertySymbols(queries)

          const filtered = symbols
            .filter(item => new RegExp(payload.filter, 'g').test(item.description!))
            .map((item, index) => {
              // @ts-ignore
              controlMap.set(queries[item].key, queries[item].key.description + index)
              return {
                // @ts-ignore
                id: queries[item].key.description + index,
                // @ts-ignore
                label: queries[item].key.description,
                tags: [
                  {
                    label: `${index + 1}`,
                    textColor: 0xffffff,
                    backgroundColor: 0x006bff,
                  },
                ],
              }
            })

          payload.rootNodes = [
            {
              id: 'vue-hooks-plus-useRequest',
              label: 'useRequest',
              tags: [
                {
                  label: 'root',
                  textColor: 0xffffff,
                  backgroundColor: 0x4a5cb6,
                },
              ],
              children: filtered,
            },
          ]
        }
      })

      api.on.getInspectorState(payload => {
        if (payload.inspectorId === pluginId) {
          const queries = RegisterDevToolsStore.getAll()
          console.log(queries)

          // @ts-ignore
          const currentKey =
            [...(controlMap?.entries() ?? [])]?.find?.(([_, v]) => v === payload.nodeId)?.[0] ?? null
          if (currentKey) {
            // @ts-ignore
            const currentSource = queries[currentKey]
            console.log(currentSource.options.ready)
            if (!currentSource) {
              return
            }

            payload.state = {
              Details: [
                {
                  key: 'Key',
                  value: currentKey,
                },
              ],
              'Data Explorer': Object.keys(currentSource.state).map(item => ({
                key: item,
                // @ts-ignore
                value: currentSource.state[item],
              })),
              Option: Object.keys(currentSource.options).map(item => ({
                key: item,
                value: unref(currentSource.options[item]),
              })),
              // @ts-ignore
              Plugins: currentSource.pluginImpls.map((item, index) => ({
                key: 'plugin' + index,
                 // @ts-ignore
                value: currentSource.pluginImpls[index],
              })),
            }
          }
        }
      })
    },
  )
}
