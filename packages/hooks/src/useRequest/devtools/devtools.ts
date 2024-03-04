import { setupDevtoolsPlugin } from '@vue/devtools-api'

import { unref } from 'vue'
import { getRequestTagBg } from './utils'
import devToolsStore from './store'
import Fetch from '../Fetch'

const pluginId = 'vue-hooks-plus'
const pluginName = 'Vue Hooks Plus 🍭'
const pluginLogo =
  'https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/c3b984112610ef3fb21140a0beb27b4a228fe0b3/packages/hooks/docs/public/logo.svg'

let currentStateId: string

const controlMap = new Map<symbol, string>()

export function setupDevtools(app: any) {
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
        id: pluginId,
        label: pluginName,
        color: 0xffd94c,
      })

      api.addInspector({
        id: pluginId,
        label: pluginName,
        icon: 'api',
        treeFilterPlaceholder: 'Search  useRequest',
        actions: [
          {
            icon: 'delete',
            tooltip: 'Clear useRequest root ',
            action: () => {
              devToolsStore.reset(currentStateId)

              api.sendInspectorTree(pluginId)
              api.sendInspectorState(pluginId)
            },
          },
        ],
      })

      devToolsStore.subscribe((event: any) => {
        devToolsStore.update(event.key, { time: event.time, type: event.type })
        api.sendInspectorTree(pluginId)
        api.sendInspectorState(pluginId)
        api.addTimelineEvent({
          layerId: pluginId,
          event: {
            title: event.type,
            subtitle: `data: ${JSON.stringify(event.data)}`,
            time: api.now(),
            data: {
              ...event,
            },
          },
        })
      })

      api.on.getInspectorTree(payload => {
        if (payload.inspectorId === pluginId) {
          controlMap.clear()
          const settings = api.getSettings()
          const queries = devToolsStore.getAll()
          let sortedArray: [
            string,
            { instance: Fetch<any, any[]>; requestName: string; type?: string; time?: number },
          ][] = []

          if (settings.baseSort === 1) {
            sortedArray = Array.from(queries.entries()).sort(
              (a, b) => (b[1]?.time ?? 0) - (a[1]?.time ?? 0),
            )
          } else {
            sortedArray = Array.from(queries.entries()).sort(
              (a, b) => (a[1]?.time ?? 0) - (b[1]?.time ?? 0),
            )
          }

          const filtered = sortedArray
            .filter(item => new RegExp(payload.filter, 'g').test(item[0]))
            .map(item => ({
              id: item[0],
              label: item[0],
              tags: item[1]?.type
                ? [
                  {
                    label: `${item[1]?.type}`,
                    textColor: 0xffffff,
                    backgroundColor: getRequestTagBg(item[1]?.type),
                  },
                ]
                : [],
            }))

          payload.rootNodes = [
            {
              id: 'vue-hooks-plus-useRequest',
              label: 'useRequest',
              tags: [
                {
                  label: 'Root',
                  textColor: 0xffffff,
                  backgroundColor: 0x42b883,
                },
              ],
              children: filtered ?? [],
            },
          ]
        }
      })

      api.on.getInspectorState(payload => {
        currentStateId = payload.nodeId
        let pluginsIndex = 0
        if (payload.inspectorId === pluginId) {
          const queries = devToolsStore.getAll()
          if (payload.nodeId) {
            const currentSource = queries.get(payload.nodeId)
            if (!currentSource) {
              return
            }
            payload.state = {
              Details: [
                {
                  key: 'Key',
                  value: payload.nodeId,
                },
                {
                  key: 'Request Name',
                  value: currentSource.requestName,
                },
              ],

              'Data Explorer': Object.keys(currentSource.instance.state).map(item => ({
                key: item,
                value:
                  currentSource.instance.state[item as keyof typeof currentSource.instance.state],
              })),
              Option: Object.keys(currentSource.instance.options).map(item => ({
                key: item,
                value: unref(currentSource.instance.options[item]),
              })),
              ["Plugins 🧩"]:
                currentSource.instance.pluginImpls?.map((_, index) => {
                  const pluginName = currentSource?.instance?.pluginImpls?.[index]?.name
                  if (!pluginName) {
                    if (index !== pluginsIndex)
                      pluginsIndex++
                  }
                  return {
                    key: pluginName ? pluginName! : `plugin ${pluginsIndex}`,
                    value: currentSource?.instance?.pluginImpls?.[index] ?? null,
                  }
                  // @ts-ignore
                })?.filter(item => Object.keys(item.value).length !== 0) ?? [],
            }
          }
        }
      })
    },
  )
}
