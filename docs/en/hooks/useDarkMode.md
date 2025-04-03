---
map:
  # 映射到docs的路径
  path: /useDarkMode
---

# useDarkMode

Hook using Dark mode.

## Code demonstration

<demo src="useDarkMode/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Follow the system and the user to manually switch"> </demo>

## API

```typescript
const [darkMode, setDarkMode] = useDarkMode()
```

## Result

| Property | Description | Type |
| --- | --- | --- |
| darkMode | Is it in dark mode | `ComputedRef<boolean>` |
| setDarkMode | Set the dark mode, and the undefined is the following system | `boolean` \| `undefined` |
