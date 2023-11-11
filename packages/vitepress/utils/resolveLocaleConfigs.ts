import { resolveConfig } from '@vue-hooks-plus/vitepress';

export interface LocaleConfigs {
  defaultLang: string;
  langToPathMap: Record<string, string>;
}

export async function resolveLocaleConfigs(
  root = 'docs',
): Promise<LocaleConfigs> {
  const vitepressConfigs = await resolveConfig(root);

  const siteData = vitepressConfigs.site;

  const defaultLang = siteData.lang;

  const langToPathMap = Object.entries(siteData.locales).reduce(
    (map, [path, localeConfig]) => {
      map[localeConfig.lang] = path;
      return map;
    },
    {} as Record<string, string>,
  );

  return {
    defaultLang,
    langToPathMap,
  };
}
