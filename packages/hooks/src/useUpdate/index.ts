import { ref } from 'vue-demi'

export default function useUpdate() {
  const update = ref({})
  const setUpdate = () => {
    update.value = Object.assign({}, { ...update.value })
  }
  return {
    update,
    setUpdate,
  }
}
