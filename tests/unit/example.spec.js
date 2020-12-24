import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('HelloWorld.vue', () => {
  it('测试例子', () => {
    const msg = 'new message'
    const wrapper = shallowMount(App)
    expect(wrapper.text()).toMatch(msg)
  })
})
