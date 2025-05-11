import { defineComponent, PropType, computed, SlotsType, unref, watch } from "vue";
import useRequest from "../useRequest";
import type {
  UseRequestService,
  UseRequestOptions,
  UseRequestPlugin,
} from "../types";

// 泛型工厂
function createUseRequestQueryComponent<TData = any, TParams extends unknown[] = any[]>() {
  // 先定义组件
  const Comp = defineComponent({
    name: "UseRequest",
    props: {
      service: {
        type: Function as PropType<UseRequestService<TData, TParams>>,
        required: true,
      },

      initialData: {
        type: String,
        default: () => undefined,
      },
      ready: {
        // 支持 initialData
        type: Object as PropType<
          UseRequestOptions<TData, TParams>['ready']
        >,
        default: () => ({
          ready: false,
        }),
      },
      refreshDeps: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
      plugins: {
        type: Array as PropType<UseRequestPlugin<TData, TParams>[]>,
        default: () => [],
      },
    },
    slots: Object as SlotsType<{
      default: (props: Pick<ReturnType<typeof useRequest<TData, TParams>>, "data">) => any,
      loading: () => any,
      error: (props: { error: ReturnType<typeof useRequest<TData, TParams>>["error"]['value'] }) => any,
      target?: () => any
    }>,
    setup(props, { slots }) {

      // 支持响应式 props
      const service = computed(() => unref(props.service));
      const plugins = computed(() => unref(props.plugins));


      // 让 props 转为响应式
      const ready = computed(() => props.ready);
      const refreshDeps = computed(() => props.refreshDeps);


      // useRequest 的返回类型会自动推断
      const result = useRequest(service.value, {
        // @ts-ignore
        initialData: props.initialData,
        // @ts-ignore
        ready,
        // @ts-ignore
        refreshDeps,
      }, plugins.value);

      watch(
        refreshDeps,
        () => {
          result.refresh();
        },
        { immediate: true, deep: true }
      );

      return () => {
        if (result.loading.value && slots.loading) {
          return slots.loading();
        }
        if (result.error.value && slots.error) {
          return slots.error({ error: result.error.value });
        }
        if (!result.loading.value && !result.error.value && slots.default) {

          return slots.default({
            // @ts-ignore
            data: result.data.value
          });
        }
        return null;
      };
    },
  });

  // 用类型断言给组件加上 slots 类型声明
  return Comp
}

// 导出泛型组件工厂
export default createUseRequestQueryComponent;