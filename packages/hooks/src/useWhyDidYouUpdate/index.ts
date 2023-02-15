import { computed, watch } from 'vue'

export type IProps = Record<string, any>

export default function useWhyDidYouUpdate(componentName: string, props: IProps) {
  const keys = computed(() => Object.keys(props).map(key => key))
  watch(
    Object.keys(props).map(key => props[key]),
    (curr, prev) => {
      const changedProps: IProps = {}
      keys.value.forEach((key, index) => {
        if (prev[index] !== curr[index]) {
          changedProps[key] = {
            from: prev[index],
            to: curr[index],
          }
        }
      })
      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', componentName, changedProps)
      }
    },
    {
      deep: true,
    },
  )
}
