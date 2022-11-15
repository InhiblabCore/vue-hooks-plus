import { App } from 'vue';
export default function renderHook<R = any>(renderFC: () => R): [R, App<Element>];
