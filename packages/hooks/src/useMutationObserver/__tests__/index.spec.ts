
import renderHook from 'test-utils/renderHook';
import useMutationObserver from '../index';

const options: MutationObserverInit = { attributes: true, childList: true };
const waitForMutation = () => new Promise(resolve => setTimeout(resolve, 0));

describe('useMutationObserver', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });


  it('should call the callback when the target element is mutated', async () => {
    const callback = vitest.fn();
    renderHook(() => useMutationObserver(callback, container, options));

    container.setAttribute('data-test', 'test');
    await waitForMutation();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when the target element is not mutated', () => {
    const callback = vitest.fn();
    renderHook(() => useMutationObserver(callback, container, options));
    expect(callback).not.toHaveBeenCalled();
  });

  it('should callback work when target node tree be changed', async () => {
    const callback = vitest.fn();
    renderHook(() => useMutationObserver(callback, () => container, options));
    const paraEl = document.createElement('p');
    container.appendChild(paraEl);
    await waitForMutation();
    expect(callback).toHaveBeenCalled();
  });

  it('should not work when target is null', async () => {
    const callback = vitest.fn();
    renderHook(() => useMutationObserver(callback, null, options));
    container.style.backgroundColor = '#000';
    expect(callback).not.toHaveBeenCalled();
  });

});
