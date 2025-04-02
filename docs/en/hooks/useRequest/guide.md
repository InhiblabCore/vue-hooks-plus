---
map:
  # 映射到docs的路径
  path: /useRequest/guide/
source:
  showSource: false
  showDemo: false
---

# 📐 useRequest specification

## Foreword

I believe that `useRequest` is as a business development is more frequently used Hook, please first understand the following `useRequest` functions, limited to document display, can not give you a complete business request process to show, here will be a set of examples to show a complete business development specifications, for reference.

## useRequest Process review

`useRequest` is used as a request intermediate layer and receives arbitrary `Promise` objects. If ts is developed, it needs to explicitly return `Promise <TData>` when encapsulating axios for type acquisition, and the intermediate layer is executing the request and executing various plug-ins intermediate.

## Description of development process (support typescript)

- The package `axios` function `request` in vue returns `Promise <TData>`
- The encapsulation business request function calls the `request`
- With the `useRequest` for business development

> _tip: Not limited to `axios`, but also the request instances of `requestjs`, `fetch`, etc., that return `Promise` objects._

## Example business scenarios

Business scenario: Assuming that there is a home page business module, you need to obtain the basic information of a user on the home page

### Directory structure

```bash
.
├── src
│   ├── network
│   │    ├── axios.ts
│   ├── views
│   │    ├── home
│   │    │    ├── Home.vue
│   │    │    ├── Home.less
│   │    │    ├── services.ts  // API
│   │    │    └── data.d.ts    // TS type
│   ├── services   // recommend
│   │   └── api.ts // global API
└── typings.d.ts   // global ts type

```

## 一、Process axios

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

## 二、Process the business request function

Modular export request function, the generic type of `request` is incoming is the type of request data, which needs to be defined in advance, look at the 👇.

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

The Module exports the type to prevent the type from polluting the global situation

`src/views/home/data.d.ts`

```typescript
export type NameType = {
  name?: string
  age: number
}
```

## 三、Use the useRequest in the. vue

. In vue, use `useRequest` to use `getUserInfo`, incoming parameters, `data` is a `Ref <NameType>` type, you can easily get the type you defined in advance. In the. vue file, you only need to focus on the business, and you do not need to write too many type and function definitions to facilitate the subsequent maintenance.

`src/views/home/Home.vue`

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
```

## END

The above is a set of rigorous and reliable request scheme, which can also be used and changed according to their own needs.
