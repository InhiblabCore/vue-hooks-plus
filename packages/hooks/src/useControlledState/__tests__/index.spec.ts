import { ref, nextTick } from 'vue';
import { useControlledState } from '../index';
// NOTE: These tests are for Vitest. Ensure 'vi' is available globally.

describe('useControlledState', () => {
  it('should use defaultValue when uncontrolled', () => {
    const value = ref(undefined);
    const [state, setValue] = useControlledState(value, 1);
    expect(state.value).toBe(1);
    setValue(2);
    expect(state.value).toBe(2);
  });

  it('should use value when controlled', () => {
    const value = ref(5);
    const [state, setValue] = useControlledState(value, 1);
    expect(state.value).toBe(5);
    setValue(10);
    // Should not update state, still controlled by value
    expect(state.value).toBe(5);
    value.value = 8;
    expect(state.value).toBe(8);
  });

  it('should call onChange when value changes (uncontrolled)', () => {
    const value = ref(undefined);
    const onChange = vi.fn();
    const setValue = useControlledState(value, 1, onChange)[1];
    setValue(3);
    expect(onChange).toHaveBeenCalledWith(3);
    setValue(3);
    // Should not call onChange again for same value
    expect(onChange).toHaveBeenCalledTimes(1);
    setValue(4);
    expect(onChange).toHaveBeenCalledWith(4);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should call onChange when value changes (controlled)', () => {
    const value = ref(2);
    const onChange = vi.fn();
    useControlledState(value, 1, onChange)[1](5);
    expect(onChange).toHaveBeenCalledWith(5);
    expect(value.value).toBe(2);
    value.value = 6;
    expect(value.value).toBe(6);
  });

  it('should warn and call onChange for function callback', () => {
    const value = ref(undefined);
    const onChange = vi.fn();
    const [state, setValue] = useControlledState(value, 1, onChange);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
    setValue((prev: number) => prev + 1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Function callbacks are not supported.'
    );
    expect(state.value).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
    warnSpy.mockRestore();
  });

  it('should warn when switching between controlled and uncontrolled', async () => {
    const value = ref<number | undefined>(undefined);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
    useControlledState(value, 1);
    value.value = 10;
    await nextTick();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('WARN: Component changed from uncontrolled to controlled')
    );
    value.value = undefined;
    await nextTick();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('WARN: Component changed from controlled to uncontrolled')
    );
    warnSpy.mockRestore();
  });
});
