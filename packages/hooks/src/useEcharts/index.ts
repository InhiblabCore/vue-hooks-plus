import { Ref, onMounted, ref, onUnmounted, watchEffect } from "vue";
import * as echarts from "echarts";


import type { EChartsOption, EChartsType } from "echarts";
import useEventListener from "../useEventListener";

/**
 * 调用 echarts hook
 */
function useEcharts(options?: { defaultOptions?: EChartsOption }): {
  chart: Ref<echarts.ECharts | undefined>;
  container?: Ref<HTMLDivElement | null>;
} {
  const { defaultOptions } = options ?? {};
  const container = ref<HTMLDivElement | null>(null);
  const chart = ref<EChartsType>();
  const optionsRef = ref(defaultOptions);

  onMounted(() => {
    if (!container.value) {
      return;
    }
     
    const myEcharts = echarts.init(container.value);
    chart.value = myEcharts;
  });

  watchEffect(() => {
    if (optionsRef.value && chart.value) {
      chart.value?.setOption(optionsRef.value as any);
    }
  });

  onUnmounted(() => {
    chart.value?.dispose?.();
    chart.value?.off?.("*");
    chart.value = undefined;
  });

  useEventListener("resize", () => {
    requestAnimationFrame(() => {
      chart?.value?.resize?.();
    });
  });

   
  return { chart, container };
}

export default useEcharts;
