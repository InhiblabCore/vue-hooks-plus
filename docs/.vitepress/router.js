const { kebabCase } = require('lodash');

const Router = {
  Request: ['useRequest', 'useRequestBasic'],
  Dom: ['useSize', 'useEventListener', 'useTitle'],
  State: ['useBoolean', 'useMap'],
  Effect: ['useDebounceFn', 'useLockFn', 'useUpdate'],
  Scene: ['useEcharts', 'useVirtualList'],
};

function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: langPrefix === '/' ? 'Getting started' : '介绍',
      link: `${langPrefix}`,
    },
    ...Object.entries(Router).map(([text, children]) => ({
      text,
      children: children.map((hookName) => ({
        link: `${langPrefix}${kebabCase(hookName)}/`,
        text: hookName,
      })),
    })),
  ];
}

module.exports = {
  getRouterConfig,
};
