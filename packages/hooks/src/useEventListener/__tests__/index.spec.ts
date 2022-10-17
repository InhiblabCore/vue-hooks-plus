import useEventListener from '..'

describe('useEventListener', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })
  it('test on click listener', async () => {
    let state = 0
    const onClick = () => {
      state++
    }
    useEventListener('click', onClick, { target: () => container })

    document.body.click()
    expect(state).toEqual(0)
    container.click()
    expect(state).toEqual(1)
    document.body.click()
    expect(state).toEqual(1)
  })
})
