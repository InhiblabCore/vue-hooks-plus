const base = process.env.NODE_ENV === "production" ? "/web-blog" : "";
const { getRouterConfig } = require("./router");
const { kebabCase } = require("lodash");
const { resolve } = require("path");

module.exports = {
  title: "Yong_Git  的博客",
  head: [
    // 设置 favor.ico，.vuepress/public 下
    ["link", { rel: "icon", href: "/images/logo.svg" }],
  ],
  description: "",
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ["./packages/hooks/src"],
  alias: {
    [`web-blog`]: resolve("packages/hooks/src"),
  },
  base,
  themeConfig: {
    nav: [
      { text: "指南", link: "/" },
      { text: "hooks文档", link: `/${kebabCase("useSize")}/` },
    ],
    sidebar: getRouterConfig(),
    lang: "zh-CN",
    search: {
      searchMaxSuggestions: 10,
    },
    repo: "NelsonYong/web-blog",
    repoLabel: "Github",
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
};
