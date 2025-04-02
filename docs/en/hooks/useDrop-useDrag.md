---
map:
  # 映射到docs的路径
  path: /useDrop
---

# useDrop & useDrag

A pair of hooks to help you manage data transfer between drag and drop

> useDrop can be used alone to accept file, text or uri dropping.
>
> useDrag should be used along with useDrop.
>
> Paste into the drop area will also be treated as content drop.

## Code demonstration

<demo src="useDrop-useDrag/demo.vue"
  language="vue"
  title="Basic Usage"
  desc="The drop area can accept files, url, text or one of the boxes below."> </demo>

## API

## useDrag

```typescript
useDrag<T>(
  data: any,
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DragOptions
);
```

### Params

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| data | Drag data | `any` | - |
| target | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | - |
| options | More config | `DragOptions` | - |

### DragOptions

| Property    | Description            | Type                     | Default |
| ----------- | ---------------------- | ------------------------ | ------- |
| onDragStart | On drag start callback | `(e: DragEvent) => void` | -       |
| onDragEnd   | On drag end callback   | `(e: DragEvent) => void` | -       |

## useDrop

```typescript
useDrop<T>(
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DropOptions
);
```

### Params

| 参数 | Description | Type | Default |
| --- | --- | --- | --- |
| target | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | - |
| options | More config | `DragOptions` | - |

### DropOptions

| 参数 | Description | Type | Default |
| --- | --- | --- | --- |
| onText | The callback when text is dropped or pasted | `(text: string, e: DragEvent) => void` | - |
| onFiles | The callback when file is dropped or pasted | `(files: File[], e: DragEvent) => void` | - |
| onUrl | The callback when uri is dropped or pasted | `(text: string, e: DragEvent) => void` | - |
| onDom | The callback when DOM is dropped or pasted | `(content: any, e: DragEvent) => void` | - |
| onDrop | The callback when any is dropped | `(e: DragEvent) => void` | - |
| onPaste | The callback when any is pasted | `(e: DragEvent) => void` | - |
| onDragEnter | On drag enter callback | `(e: DragEvent) => void` | - |
| onDragOver | On drag over callback | `(e: DragEvent) => void` | - |
| onDragLeave | On drag leave callback | `(e: DragEvent) => void` | - |
