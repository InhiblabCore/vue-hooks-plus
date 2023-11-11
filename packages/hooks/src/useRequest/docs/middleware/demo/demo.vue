<template>
  <div>ready: {{ ready }}</div>
  <div>log: {{ logRef }}</div>
  <vhp-button style="margin-top: 16px;" @click="() => toggle()">changeReady</vhp-button>
  <div style="margin-top: 16px;">{{ data }}</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import {
    RequestHook,
    UseRequestOptions,
    UseRequestPlugin,
    UseRequestService,
  } from '../../../types'
  import { useRequest, useToggle } from 'vue-hooks-plus'

  const logRef = ref('')

  function logger<TData, TParams extends any[]>(useRequestNext: RequestHook<TData, TParams>) {
    return (
      service: UseRequestService<TData, TParams>,
      options: UseRequestOptions<TData, TParams, any>,
      plugins: UseRequestPlugin<TData, TParams, any>[],
    ) => {
      console.log('enter a')

      const extendedService = (...args: TParams) => {
        console.log('request a')
        const data = service(...args)
        data.then(res => {
          logRef.value += `Response: ${JSON.stringify(res)}\n`
        })
        return data
      }
      const next = useRequestNext(extendedService, options, plugins)

      console.log('exit a')

      return next
    }
  }

  function logger1<TData, TParams extends any[]>(useRequestNext: RequestHook<TData, TParams>) {
    return (
      service: UseRequestService<TData, TParams>,
      options: UseRequestOptions<TData, TParams, any>,
      plugins: UseRequestPlugin<TData, TParams, any>[],
    ) => {
      console.log('enter b')

      const extendedService = (...args: TParams) => {
        console.log('request b')
        return service(...args)
      }
      const next = useRequestNext(extendedService, options, plugins)

      console.log('exit b')

      return next
    }
  }

  function getUsername(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('return')
        resolve(String(Date.now()))
      }, 1000)
    })
  }
  const [ready, { toggle }] = useToggle(false)

  const { data } = useRequest(() => getUsername(), {
    ready,
    use: [logger, logger1],
  })
</script>

<style scoped lang="less"></style>
