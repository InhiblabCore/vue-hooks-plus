import { defineComponent, PropType, computed, SlotsType, unref, watch } from "vue";
import useRequest from "../useRequest";
import type {
  UseRequestService,
  UseRequestOptions,
  UseRequestPlugin,
} from "../types";
import { isEqual } from "lodash-es";

// type UnwrapRefProps<T> = {
//   [K in keyof T]: T[K] extends (...args: any[]) => any
//   ? T[K]
//   : T[K] extends Readonly<Ref<infer V>>
//   ? V
//   : T[K] extends object
//   ? UnwrapRefProps<T[K]>
//   : T[K]
// }

// 泛型工厂
function createUseRequestComponent<
  TServiceData = any,
  TParams extends unknown[] = any[],
  TFormatResult = TServiceData
>() {
  // 先定义组件
  const Comp = defineComponent({
    name: "UseRequest",
    props: {
      service: {
        type: Function as PropType<UseRequestService<TServiceData, TParams>>,
        required: true,
      },
      manual: {
        type: Boolean,
        default: false,
      },
      ready: {
        type: Object as PropType<
          UseRequestOptions<TServiceData, TParams>["ready"]
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
        type: Array as PropType<UseRequestPlugin<TServiceData, TParams>[]>,
        default: () => [],
      },
      formatResult: {
        type: Function as PropType<(res: TServiceData) => TFormatResult>,
        default: undefined,
      },
    },
    slots: Object as SlotsType<{
      default: (props: ReturnType<typeof useRequest<TFormatResult, TParams>>) => any,
      loading: () => any,
      error: (props: { error: ReturnType<typeof useRequest<TFormatResult, TParams>>["error"]['value'] }) => any,
      target?: () => any
    }>,
    setup(props, { slots }) {
      // 支持响应式 props
      const service = computed(() => unref(props.service));
      const plugins = computed(() => unref(props.plugins));

      const manual = props.manual
      const ready = computed(() => props.ready);
      const refreshDeps = computed(() => props.refreshDeps);

      // useRequest 的返回类型会自动推断
      const options = {
        ready,
        refreshDeps,
        manual: props.manual,
        formatResult: props.formatResult,
      };
      const result = useRequest(
        service.value,
        // @ts-ignore
        options,
        plugins.value
      );


      watch(refreshDeps, (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) return;
        if (!manual) {
          result?.refresh()
        }
      })

      return () => {
        if (result.loading.value && slots.loading) {
          return slots.loading();
        }
        if (result.error.value && slots.error) {
          return slots.error({ error: result.error.value });
        }
        if (slots.default) {
          return slots.default(computed(() => result).value as any);
        }
        return null;
      };
    },
  });

  // 用类型断言给组件加上 slots 类型声明
  return Comp;
}

// 导出泛型组件工厂
export default createUseRequestComponent;