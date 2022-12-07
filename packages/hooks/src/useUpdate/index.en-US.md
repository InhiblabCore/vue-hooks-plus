---
map:
  # 映射到docs的路径
  path: /useUpdate
---

# useUpdate

Used to simulate and rerender the page

## Code demonstration

### Default Usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Default Usage"
  desc="Listen to the dynamic rendering page with watch by changing the object of ref"> </demo>

### Advanced usage

<demo src="./demo/demo1.vue"
  language="vue"
  title=""
  desc="Change the hash value to refresh the page"> </demo>

## API

```typescript
const update = useUpdate()
```

## Remark

By changing the variable, listening to this variable to achieve the simulated effect
