import { ref } from 'vue';

const query = window.matchMedia('(prefers-color-scheme: dark)');

const isDark = ref(query.matches);

query.onchange = () => {
  isDark.value = query.matches;
};

export function useTheme() {
  return {
    isDark,
  };
}
