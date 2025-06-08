import renderHook from 'test-utils/renderHook'
import useFocusWithin from '..'

describe('useFocusWithin', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should return false initially', () => {
    const [state] = renderHook(() => useFocusWithin(container))
    expect(state.value).toBe(false)
  })

  it('should call onFocus and onChange(true) when focusin event is triggered', () => {
    const onFocus = vitest.fn()
    const onChange = vitest.fn()
    renderHook(() => useFocusWithin(container, { onFocus, onChange }))
    const event = new FocusEvent('focusin', { bubbles: true })
    container.dispatchEvent(event)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('should call onBlur and onChange(false) when focusout event is triggered and relatedTarget is outside', () => {
    const onBlur = vitest.fn()
    const onChange = vitest.fn()
    renderHook(() => useFocusWithin(container, { onBlur, onChange }))
    // First focusin to set state to true
    container.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    // Then focusout with relatedTarget outside
    const event = new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body })
    Object.defineProperty(event, 'currentTarget', { value: container })
    container.dispatchEvent(event)
    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('should not call onBlur if relatedTarget is inside container', () => {
    const onBlur = vitest.fn()
    const onChange = vitest.fn()
    renderHook(() => useFocusWithin(container, { onBlur, onChange }))
    // First focusin to set state to true
    container.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    // Create a child element and set as relatedTarget
    const child = document.createElement('div')
    container.appendChild(child)
    const event = new FocusEvent('focusout', { bubbles: true, relatedTarget: child })
    Object.defineProperty(event, 'currentTarget', { value: container })
    container.dispatchEvent(event)
    expect(onBlur).not.toHaveBeenCalled()
    // onChange(false) should not be called either
    expect(onChange).not.toHaveBeenCalledWith(false)
  })
})
