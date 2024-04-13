declare module 'vue' {
  export interface GlobalComponents {
    VhpButton: typeof import('./.vitepress/components/button/button.vue')['default']
  }
}

export { }
