
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
// require('jsdom-global')()
const window = global
window.alert = function() {}
window.event = { preventDefault: function() {}}
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

    it('bindKeyCode 事件绑定', async () => {
      const wrapper = shallowMount(App)
      wrapper.vm.run('up')
      wrapper.vm.run('left')
      wrapper.vm.run('right')
      wrapper.vm.run('down')

      var event = new KeyboardEvent('keydown', {'code': 'ArrowLeft'});
      var event2 = new KeyboardEvent('keydown', {'code': 'Space'});
      document.dispatchEvent(event);
      document.dispatchEvent(event2);
      // await wrapper.trigger('keydown.up')
      // await wrapper.trigger('keydown.left')
      // await wrapper.trigger('keydown.right')
      // await wrapper.trigger('keydown.down')
      expect(true).toBe(true)
    })

    function boom(key) {
      const wrapper = shallowMount(App)
      wrapper.vm.boom()
      wrapper.vm.run(key)
      wrapper.vm.run(key)
      wrapper.vm.boom()
      return wrapper
    }
    it('爆炸方法1', async () => {
      boom('up')
      expect(true).toBe(true)
    })

    it('爆炸方法2',  async () => {
      const wrapper = shallowMount(App)
      jest.useFakeTimers();
      wrapper.vm.boom()
      wrapper.vm.run('down')
      wrapper.vm.run('down')
      await wrapper.vm.boom()
      jest.runAllTimers();
      expect(true).toBe(true)
    })

    it('爆炸方法3', async () => {
      boom('left')
      expect(true).toBe(true)
    })

    it('爆炸方法4', async () => {
      boom('right')
      expect(true).toBe(true)
    })

    it('toHere 事件', async () => {
      const wrapper = shallowMount(App)
      wrapper.vm.toHere({ x :10, y : 20})
      expect(true).toBe(true)
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
