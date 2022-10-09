---
map:
  # 映射到docs的路径
  path: /useRequest/guide/
---

# 📐 业务开发规范

## 前言

我相信 `useRequest` 作为业务开发的时候是比较频繁使用的 Hook, 在上面的例子中我相信大家对 `useRequest` 的功能有所了解，限制于文档展示，没办法给大家完整的业务请求流程进行展示，在这里将以一套示例展示完整的业务开发规范，给予参考。

## useRequest 流程回顾

`useRequest` 是作为一个请求中间层，接收任意 `Promise` 对象，如果 ts 开发，需要在封装 axios 的时候明确返回 `Promise<TData>` 进行类型获取，中间层会代执行请求并且中间执行各种插件。

## 开发流程简述 （支持 ts 类型）

- vue 中 封装 `axios` 函数 `request` 返回 `Promise<TData>`
- 封装业务请求函数调用 `request`
- 搭配 `useRequest` 进行业务开发

> _tip: 不限于 `axios`,也可是 `requestjs` 、 `fetch`等返回 `Promise` 对象的请求实例。_

## 业务场景示例

业务场景：假设存在一个首页业务模块，需要在首页获取某个用户的基本信息

### 目录结构

```bash
.
├── src
│   ├── network
│   │    ├── axios.ts
│   ├── views
│   │    ├── home
│   │    │    ├── Home.vue
│   │    │    ├── Home.less
│   │    │    ├── services.ts  // 模块 API
│   │    │    └── data.d.ts    // 模块 TS 类型
│   ├── services   // 推荐目录
│   │   └── api.ts // 全局公共的 API
└── typings.d.ts   // 全局公共的 TS 类型声明

```

## 一、封装 axios

`src/network/axios.ts`

```typescript
import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const axiosInstance = axios.create({
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    if (response?.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error?.message?.includes?.('timeout')) {
      console.log('timeout')
    } else {
      console.log(error)
    }
    Promise.reject(error)
  },
)

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>,
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}
export { axiosInstance, request }
```

## 二、封装业务请求函数

模块化导出请求函数，`request` 的泛型传入的是请求数据的类型，需要提前定义好，看 👇。

`src/views/home/services.ts`

```typescript
import { request } from '@/network/axios'
import { NameType } from './data.d'

export async function getUserInfo(id: string) {
  return request<NameType>('url', {
    params: {
      id,
    },
  })
}
```

模块导出类型，防止类型污染全局

`src/views/home/data.d.ts`

```typescript
export type NameType = {
  name?: string
  age: number
}
```

## 三、在 .vue 中使用 useRequest

.vue 中使用 `useRequest` 使用 `getUserInfo`,传入参数，`data` 是一个 `Ref<NameType>` 类型，可以很简单的获取到你提前定义好的类型。在 .vue 文件中只需要关注业务，不需要书写过多的类型和函数定义，方便后续进行维护。

```vue
<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Home',
  }
</script>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'
  import { getUserInfo } from './services'
  const { data } = useRequest(() => getUserInfo('666'))
</script>

<style scoped lang="less"></style>
```

## 结语

上述是一套严谨可靠的请求方案，也可根据自身需求自行使用更改。
