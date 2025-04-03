import fsExtra from 'fs-extra';
import { dirname, join, sep } from 'path';
import { MarkdownRenderer } from 'vitepress';

const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;

let index = 1;
export function getDemoComponent(
  md: MarkdownRenderer,
  env: any, // TODO
  { title, desc, path, code }: any,
) {
  const componentName = `DemoComponent${index++}`;

  path = normalizePath(path);

  injectImportStatement(env, componentName, path);

  const highlightedCode = md.options.highlight!(code, 'vue', '') as any;
  return `
    <demo
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      src="${path}"
      title="${title ?? ''}"
      desc="${desc ?? ''}"
    >
        <${componentName}></${componentName}>
    </demo>
  `.trim();
}

let fenceIndex = 1;
const codeFileMap: Record<string, { demoName: string; demoPath: string }> = {};

export function genDemoByCode(
  md: MarkdownRenderer,
  env: any,
  path: string,
  code: string,
) {
  let { demoName = '', demoPath = '' } = codeFileMap[code] ?? {};

  if (!codeFileMap[code]) {
    while (true) {
      demoName = `demo-${fenceIndex++}.vue`;
      demoPath = join(dirname(path), 'dist', demoName);
      if (!fsExtra.existsSync(demoPath)) {
        break;
      }
    }

    fsExtra.createFileSync(demoPath);
    fsExtra.writeFileSync(demoPath, code);

    codeFileMap[code] = {
      demoName,
      demoPath,
    };
  }

  return getDemoComponent(md, env, {
    path: demoPath,
    code,
  });
}

function injectImportStatement(
  env: any, // TODO this should import from vitepress
  componentName: string,
  path: string,
) {
  const componentRegistStatement =
    `import ${componentName} from '${path}'`.trim();

  if (!env.sfcBlocks.scripts) {
    env.sfcBlocks.scripts = [];
  }
  // TODO type
  const tags = env.sfcBlocks.scripts as { content: string }[];

  const isUsingTS =
    tags.findIndex((tag) => scriptLangTsRE.test(tag.content)) > -1;
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return (
      scriptRE.test(tag.content) &&
      scriptSetupRE.test(tag.content) &&
      !scriptClientRE.test(tag.content)
    );
  });

  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex];
    tags[existingSetupScriptIndex].content = tagSrc.content.replace(
      scriptRE,
      `${componentRegistStatement}

      </script>`,
    );
  } else {
    tags.unshift({
      content: `
        <script ${isUsingTS ? 'lang="ts"' : ''} setup >
          ${componentRegistStatement}
        </script>
      `.trim(),
    });
  }
}

function normalizePath(path: string) {
  return path.split(sep).join('/');
}