import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App init 渲染测试', () => {

  describe('地图', () => {
    it('initMap 总数一致', () => {
      const wrapper = shallowMount(App)
      const renderLength = wrapper.vm.map.length * wrapper.vm.map[0].length
      expect(renderLength).toBe(32 * 22)
    })
    it('initPeople 位置不为初始值', () => {
      const wrapper = shallowMount(App)
      expect(wrapper.vm.people.x !== 0 && wrapper.vm.people.y !== 0).toBe(true)
    })
    it('DOM数量', () => {
      const wrapper = shallowMount(App)
      const row = wrapper.vm.map.length
      const clo = wrapper.vm.map[0].length
      expect(wrapper.findAllComponents({name:'wall'}).length).toBe(row * clo)
    })

    it('renderWillBox 外墙渲染', () => {
      const wrapper = shallowMount(App)
      expect(wrapper.vm.willBox.length !== 0).toBe(true)
    })

    it('randomWill 随机墙渲染', () => {
      const wrapper = shallowMount(App)
      expect(wrapper.vm.wills.length !== 0).toBe(true)
    })

    it('bindKeyCode 事件绑定', () => {
      const wrapper = shallowMount(App)
      expect(wrapper.vm.wills.length !== 0).toBe(true)
    })

  })


  describe('寻路算法', () => {
    // it('行渲染', () => {
    //   const wrapper = shallowMount(App)
    //   expect(wrapper.vm.map.length).toBe(22)
    // })
    // it('列渲染', () => {
    //   const wrapper = shallowMount(App)
    //   expect(wrapper.vm.map[0].length).toBe(32)
    // })

    // it('DOM数量', () => {
    //   const wrapper = shallowMount(App)
    //   expect(wrapper.vm.map[0].length).toBe(32)
    // })
  })

  // it('外墙渲染正常', () => {
  //   const wrapper = shallowMount(App)
  //   expect(wrapper.html()).toBe(false)
  // })
  // it('人物渲染正常', () => {
  //   const wrapper = shallowMount(App)
  //   expect(wrapper.find('.people').exists()).toBe(true)
  // })
  // it('随机墙渲染正常', () => {
  //   const wrapper = shallowMount(App)
  //   expect(wrapper.find('.people').exists()).toBe(true)
  // })
  // it('渲染正常', () => {
  //   const wrapper = shallowMount(App)
  //   expect(wrapper.find('.people').exists()).toBe(true)
  // })
  // it('keyCode绑定成功', () => {
  //   const wrapper = shallowMount(App)
  //   expect(wrapper.find('.people').exists()).toBe(true)
  // })
})
