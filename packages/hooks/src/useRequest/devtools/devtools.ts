import {
  setupDevtoolsPlugin,
} from '@vue/devtools-api'
import * as cacheSubscribe from '../utils/cacheSubscribe'
import { CachedData } from '../utils/cache'

const MUTATIONS_LAYER_ID = 'vue-hooks-plus:mutations'
const pluginId = 'vue-hooks-plus'
const pluginName = 'Vue Hooks Plus 🍭'
const pluginLogo = 'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/c3b984112610ef3fb21140a0beb27b4a228fe0b3/packages/hooks/docs/public/logo.svg'

type Timer = ReturnType<typeof setTimeout>;
interface RecordData extends CachedData {
  timer: Timer | undefined;
}


export function setupDevtools(app: any, cache: any) {
  setupDevtoolsPlugin({
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
  }, api => {
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


    cacheSubscribe.otherSubscribe((event) => {
      api.sendInspectorTree(pluginId)
      api.sendInspectorState(pluginId)

      api.addTimelineEvent({
        layerId: pluginId,
        event: {
          title: "update",
          subtitle: event.type,
          time: api.now(),
          data: event.data,
        },
      })
    })

    api.on.getInspectorTree((payload) => {
      if (payload.inspectorId === pluginId) {
        const settings = api.getSettings()
        const queries = cache.getCacheAll() as RecordData
        let queriesSort: any = queries

        if (settings.baseSort === 1) {
          queriesSort = Object.fromEntries(Object.entries(queries).sort(([, a], [, b]) => b.time - a.time));
        } else {
          queriesSort = Object.fromEntries(Object.entries(queries).sort(([, a], [, b]) => a.time - b.time));
        }

        const filtered = Object.keys(queriesSort).filter(item => new RegExp(payload.filter, "g").test(item)).map((item, index) => ({
          id: item,
          label: item,
          tags: [
            {
              label: `${index + 1}`,
              textColor: 0xffffff,
              backgroundColor: 0x006bff,
            }]
        }))

        payload.rootNodes = [{
          id: "vue-hooks-plus-useRequest",
          label: "useRequest",
          tags: [{
            label: 'root',
            textColor: 0xffffff,
            backgroundColor: 0x4a5cb6,
          }],
          children: filtered
        }]
      }
    })

    api.on.getInspectorState((payload) => {
      if (payload.inspectorId === pluginId) {
        const currentCache = cache.getCache(payload.nodeId)
        if (!currentCache) {
          return
        }

        payload.state = {
          'Details': [
            {
              key: 'Cache key',
              value: payload.nodeId,
            },
            {
              key: 'Last Updated',
              value: currentCache.time,
            },
          ],
          'Data Explorer': [
            {
              key: 'Data',
              value: currentCache,
            },
          ],

        }
      }
    })

  })
}


