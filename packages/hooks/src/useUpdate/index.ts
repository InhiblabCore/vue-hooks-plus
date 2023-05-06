import { readonly, ref } from 'vue'

export default function useUpdate() {
  const update = ref({})
  const setUpdate = () => {
    update.value = Object.assign({}, { ...update.value })
  }
  return {
    update: readonly(update),
    setUpdate,
  }
}
