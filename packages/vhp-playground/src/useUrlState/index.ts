import { computed, onMounted, Ref, ref, watch, watchEffect } from "vue";

import { parse, stringify } from "query-string";
import type { ParseOptions, StringifyOptions } from "query-string";

type UrlState = Record<string, any>;

export interface Options {
  navigateMode?: "push" | "replace";
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
}

const baseParseConfig: ParseOptions = {
  parseNumbers: false,
  parseBooleans: false,
};

const baseStringifyConfig: StringifyOptions = {
  skipNull: false,
  skipEmptyString: false,
};

const useUrlState = <S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: Options
) => {
  type State = Partial<{ [key in keyof S]: any }>;

  const { parseOptions, stringifyOptions } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };

  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions,
  };

  const initialStateRef = ref(
    typeof initialState === "function"
      ? (initialState as () => S)()
      : initialState || {}
  );
  const state = ref(initialStateRef.value) as Ref<any>;

  const [path] = location.hash.slice(1).split("?");

  const queryFromUrl = computed(() => {
    return parse(location.search, mergedParseOptions);
  });

  const routerPushFn = (s: string) => (location.hash = s);

  const targetQuery = computed(() => ({
    ...initialStateRef.value,
    ...queryFromUrl.value,
  }));

  onMounted(() => {
    state.value = {
      ...initialStateRef.value,
      ...queryFromUrl.value,
    };
  });

  watchEffect(() => {
    state.value = {
      ...initialStateRef.value,
      ...queryFromUrl.value,
    };
  });

  const setState = (s: State | ((prev: any) => State)) => {
    const newQuery =
      typeof s === "function"
        ? s({
            ...targetQuery.value,
            ...state.value,
          })
        : s;
    state.value = {
      ...state.value,
      ...newQuery,
    };
  };

  watch(state, (curr) => {
    // console.log({
    //   ...initialStateRef.value,
    //   ...queryFromUrl.value,
    //   ...curr,
    // });
    routerPushFn(
      `${path}?${stringify(
        {
          ...initialStateRef.value,
          ...queryFromUrl.value,
          ...curr,
        },
        mergedStringifyOptions
      )}`
    );
  });
  return { state, setState };
};

export default useUrlState;
