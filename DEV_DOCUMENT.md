# Dev the Document

## Working principle

I modified the [ruabick](https://github.com/dewfall123/ruabick) plugin o read the .md file and map the generated path。

### plugins:

- `@vue-hooks-plus/vite-plugin-gen-temp` dynamically generate md files.
- `@vue-hooks-plus/vitepress-demo-block` demo block at the md files.
- `@vue-hooks-plus/vitepress` transformation based on vitepress to support internationalization.
- `@vue-hooks-plus/md-demo-plugins` apply demo block.

[Source](https://github.com/InhiblabCore/plugins)

## Start

need run initial at `packages/hooks` folder.

```bash

pnpm initial

```

Check if a .docs folder is generated in your directory。If it fails, it cannot be started and needs to be re-run `initial` 👆 .

next, vitepress run .docs

```bash

pnpm docs:dev

```

If the page startup is blank, you need to refresh the page.
