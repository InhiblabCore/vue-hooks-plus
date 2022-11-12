import renderHook from 'test-utils/renderHook'
import { sleep } from 'test-utils/sleep'
import useUpdate from '..'

describe('useUpdate', () => {
  const [{ update, setUpdate }] = renderHook(() => useUpdate())
  const prev = update.value

  it('should work', async () => {
    setUpdate()
    sleep(100)
    expect(update.value === prev).toBeFalsy()
  })
})
