---
map:
  # Path mapped to docs
  path: /useCookieState
---

# useCookieState

A Hook that store state into Cookie.

## Code demonstration

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Store the status in the Cookie"
  desc="After refreshing the page, you can see the content in the input box being restored from the Cookie."> </demo>

### Advanced Usage-Receivable functions

<demo src="./demo/demo1.vue"
  language="vue"
  title="The set accepts the function"
  desc="Be able to receive feelings when set"> </demo>

## API

```typescript
type State = string | undefined;
type SetState = (
  newValue?: State | ((prevState?: State) => State),
  options?: Cookies.CookieAttributes,
) => void;
const [state, setState]: [State, SetState] = useCookieState(
  cookieKey: string,
  options?: Options,
);
```

:::tip Note

If you want to remove this data from the document.cookie, use the `setState()` or `setState (undefined)`.

:::

### Params

| Property  | Description                    | Type      | Default |
| --------- | ------------------------------ | --------- | ------- |
| cookieKey | The key of Cookie              | `string`  | -       |
| options   | Optional. Cookie configuration | `Options` | -       |

### Result

| Property | Description         | Type                         |
| -------- | ------------------- | ---------------------------- |
| state    | Local Cookie value  | `Ref<string` \| `undefined>` |
| setState | Update Cookie value | `SetState`                   |

setState can update cookie options, which will be merged with the options set by `useCookieState`

`const targetOptions = { ...options, ...updateOptions }`

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| defaultValue | Optional. Default value, but not store to Cookie | `string` \| `undefined` \| `(() => (string \| undefined))` | `undefined` |
| expires | Optional. Set Cookie expiration time | `number` \| `Date` | - |
| path | Optional. Specify available paths | `string` | `/` |
| domain | Optional. Specify available domain. Default creation domain | `string` | - |
| secure | Optional. Specify whether the Cookie can only be transmitted over secure protocol as https | `boolean` | `false` |
| sameSite | Optional. Specify whether the browser can send this Cookie along with cross-site requests | `strict` \| `lax` \| `none` | - |

Options is same as [js-cookie attributes](https://github.com/js-cookie/js-cookie#cookie-attributes)
