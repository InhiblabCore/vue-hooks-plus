---
map:
  # Path mapped to docs
  path: /useRequest/devtools/
source:
  show: false
---

# DevTools `1.7.7-alpha.1`

Wave your hands in the air and shout hooray because useRequest comes with dedicated DevTools! 😍

When you begin your useRequest journey, you'll want these DevTools by your side. They help visualize all of the inner workings of useRequest and will likely save you hours of debugging if you find yourself in a pinch!

The only thing you need to do is to install official [Vue Devtools](https://devtools.vuejs.org/guide/installation.html)

useRequest will seemingly integrate with official devtools, adding custom inspector and timeline events. Devtools would be treeshaken from production bundles by default.

Currently in the `testing phase`, you can download `1.7.7-aLpha.1` and later versions to use.

## Import the Devtools

`main.ts`

```typescript
import { useRequestDevToolsPlugin } from 'vue-hooks-plus'

app.use(useRequestDevToolsPlugin)
```

You're done! Open the browser Vue plugin to use it 🍺
