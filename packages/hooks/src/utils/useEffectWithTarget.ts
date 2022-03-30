import { watchEffect } from "vue";
import createEffectWithTarget from "./createEffectWithTarget";

const useEffectWithTarget = createEffectWithTarget(watchEffect);

export default useEffectWithTarget;
