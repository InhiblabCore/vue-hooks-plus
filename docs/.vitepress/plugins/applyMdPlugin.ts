import { parseProps } from "../config/utils";
import { resolve } from 'path'
import fsExtra from 'fs-extra'
import { getDemoComponent } from "../config/factory";
export const applyMdPlugin = (md: any) => {
  const htmlBlock = md.renderer.rules.html_block!
  md.renderer.rules.html_block = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const content = token.content.trim();
    const { path } = env;
    const props = parseProps(content);

    if (!props?.src) {
      console.error(`miss src props in ${path} demo.`);
      // 必须返回默认渲染结果，否则会导致无限递归
      return htmlBlock(tokens, idx, options, env, self);
    }

    const srcPath = resolve(process.cwd(), "docs", "demo", props.src);
    const code = fsExtra.readFileSync(srcPath, 'utf8');
    const demoScripts = getDemoComponent(md, env, {
      title: props?.title,
      desc: props?.desc,
      path: srcPath,
      code,
    });
    return demoScripts;
  }

}