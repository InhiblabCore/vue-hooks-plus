import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useLongPress from '../index'
import renderHook from 'test-utils/renderHook'

describe('useLongPressStatus tests', () => {
  let targetMock: HTMLElement
  const mouseDownEvent: PointerEvent = new PointerEvent('pointerdown')
  const mouseUpEvent: PointerEvent = new PointerEvent('pointerup')
  const mouseMoveEvent: PointerEvent = new PointerEvent('pointermove')
  beforeEach(() => {
    targetMock = document.createElement('div')
    vi.useFakeTimers({
      toFake: [ 'setTimeout', 'setInterval' ],
    });
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('should change isPressed status when user longPress in 500ms', async () => {
    const [ result ] = renderHook(() => useLongPress(targetMock))

    targetMock.dispatchEvent(mouseDownEvent);

    expect(result.isPressing.value).toBeFalsy()

    vi.advanceTimersByTime(500);

    expect(result.isPressing.value).toBeTruthy()
  });

  it('should record pressed every 100ms', () => {
    const [ result ] = renderHook(() => useLongPress(targetMock))
    targetMock.dispatchEvent(mouseDownEvent);

    expect(result.pressingTime.value).toBe(0);

    vi.advanceTimersByTime(500);
    expect(result.pressingTime.value).toBe(0);

    vi.advanceTimersByTime(100);
    expect(result.pressingTime.value).toBe(100);

    vi.advanceTimersByTime(100);
    expect(result.pressingTime.value).toBe(200);
  });

  it('should reset pressingTime and isPressing when user mouseUp', async () => {
    const [ result ] = renderHook(() => useLongPress(targetMock))

    targetMock.dispatchEvent(mouseDownEvent);
    vi.advanceTimersByTime(600);

    expect(result.pressingTime.value).toBe(100);
    expect(result.isPressing.value).toBeTruthy()

    targetMock.dispatchEvent(mouseUpEvent)

    expect(result.pressingTime.value).toBe(0);
    expect(result.isPressing.value).toBeFalsy()
  });

  it('should reset pressingTime and isPressing when user mouseMove', async () => {
    const [ result ] = renderHook(() => useLongPress(targetMock))

    targetMock.dispatchEvent(mouseDownEvent);
    vi.advanceTimersByTime(600);

    expect(result.pressingTime.value).toBe(100);
    expect(result.isPressing.value).toBeTruthy()

    targetMock.dispatchEvent(mouseMoveEvent);

    expect(result.pressingTime.value).toBe(0);
    expect(result.isPressing.value).toBeFalsy()
  });
  //
  it('should not cancel event on mouseLeave when cancelOnMove toggle is false', async () => {
    const [ { pressingTime, isPressing } ] = renderHook(() => useLongPress(targetMock, {
      cancelOnMove: false,
    }))

    targetMock.dispatchEvent(mouseDownEvent);

    vi.advanceTimersByTime(600);
    expect(pressingTime.value).toBe(100);
    expect(isPressing.value).toBeTruthy()

    targetMock.dispatchEvent(mouseMoveEvent);

    expect(pressingTime.value).toBe(100);
    expect(isPressing.value).toBeTruthy()
  });

  it('should stop all event listener when component unmounted', async () => {
    const elementRemoveEventListenerSpy = vi.spyOn(targetMock, 'removeEventListener');
    const [ , app ] = renderHook(() => useLongPress(targetMock))

    app.unmount()

    expect(elementRemoveEventListenerSpy).toHaveBeenCalledWith(mouseDownEvent.type, expect.any(Function));
    expect(elementRemoveEventListenerSpy).toHaveBeenCalledWith(mouseUpEvent.type, expect.any(Function));
    expect(elementRemoveEventListenerSpy).toHaveBeenCalledWith(mouseMoveEvent.type, expect.any(Function));
  });
});
