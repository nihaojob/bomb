<template>
  <div id="app" v-on:keyup.left="run('left')" v-on:keyup.up="run('up')" v-on:keyup.right="run('right')" v-on:keyup.down="run('down')">
    <div class="row" :key="i" v-for="(item, i) in map">
      <MapItem :key="i + j" :ns="ns" :options="{...wall, x: j, y: i}" @click="toHere" v-for="(wall, j) in item" />
    </div>
    <div class="direction">
      <table>
        <tr>
          <td></td>
          <td><button @click="run('up')">上</button></td>
          <td></td>
        </tr>
        <tr>
          <td><button @click="run('left')">左</button></td>
          <td><button @click="boom">boom</button></td>
          <td><button @click="run('right')">右</button></td>
        </tr>
        <tr>
          <td></td>
          <td><button @click="run('down')">下</button></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MapItem from './components/mapItem.vue'
// import { getF } from './utils/index.js'
export default {
  name: 'App',
  data() {
    return {
      map: [],
      willBox: [],
      wills: [],
      booms: [],
      people: { x:0, y:0 },
      ns:'up'
    }
  },
  components: {
    MapItem
  },
  created() {
    this.initMap(30, 20)
    this.initPeople()
    this.renderWillBox()
    this.randomWill()
    this.bindKeyCode()
  },
  methods: {
    initMap(row = 10, clo = 10) {
      row = row + 2
      clo = clo + 2
      const mapArr = []
      for (let i = 0; i < clo; i++) {
        const rowArr = []
        for (let j = 0; j < row ; j++) {
          rowArr.push({ type: 'none' })
        }
        mapArr.push(rowArr)
      }
      this.map = mapArr
    },
    bindKeyCode(){
      document.onkeydown = e => {
        const key = e.code;
        const config = {
          ArrowLeft:'left',
          ArrowRight:'right',
          ArrowUp:'up',
          ArrowDown:'down',
          Space:'bomm'
        }
        if(config[key]) {
          window.event.preventDefault()
          const eventType = config[key]
          if(eventType === 'bomm') return this.boom()
          this.run(eventType)
        }
      };
    },
    boom(){
      const { x, y } = this.people
      const type = this.ns
      let newY = y, newX = x
      const events = {
        up:() => newY = y+1,
        down:() => newY = y-1,
        left:() => newX = x+1,
        right:() => newX = x-1
      }
      events[type] && events[type]()
      const boom = {x:newX, y:newY}
      if(this.noItem(boom)){
        this.booms.push(boom)
        this.renderItem(boom,'boom')

        const scope = [
          [{x: newX-1, y: newY - 1}, {x: newX, y: newY -1}, {x: newX + 1, y: newY -1}],
          [{x: newX-1, y: newY    }, {x: newX, y: newY    },  {x: newX + 1, y: newY }],
          [{x: newX-1, y: newY + 1}, {x: newX, y:newY + 1}, {x: newX + 1, y: newY +1 }]
        ]
        setTimeout(() => {
          scope.forEach(item => {
            item.forEach(({ x, y} )=> {
              if(this.map[y] && this.map[y][x] && this.map[y][x].type) {
                const itemtype = this.map[y][x].type
                if(itemtype === 'people') return alert('游戏结束')
                if(itemtype === 'closWill') {
                  this.renderItem({x, y},'none')
                  this.wills.forEach((willItem, i) => {
                    if(JSON.stringify(willItem) === JSON.stringify({ x, y})) {
                      this.wills.splice(i, 1)
                    }
                  })
                }
              }
            })
          })

          this.booms.forEach((item, i) => {
            if(JSON.stringify(item) === JSON.stringify(boom)) {
              this.booms.splice(i, 1)
            }
          })
          this.renderItem(boom,'none')
        }, 3000);
      }
    },
    randomWill() { // 渲染随机墙
      const clo = this.map.length
      const row = this.map[0].length
      const ratio = 0.2
      const willLength = (row -2) * (clo -2) * ratio
      const willArr = []
      const willBoxlist = this.willBox.map(item => `${item.x},${item.y}`)
      while (willLength > willArr.length) {
        const will = this.getCoords()
        const willArrList  = willArr.map(item => `${item.x},${item.y}`)
        const itemStr = `${will.x},${will.y}`
        if( !willArrList.includes(itemStr) && !willBoxlist.includes(itemStr) && (itemStr !== `${this.people.x},${this.people.y}`)) {
          const type = ['will', 'closWill']
          const typeStr = type[Math.floor((Math.random()*type.length))]
          this.renderItem(will,typeStr)
          willArr.push(will)
        }
      }
      this.wills = willArr
    },
    renderWillBox(){ // 渲染外墙
      const willBoxList = this.getWillBox()
      willBoxList.forEach(item => {
        this.renderItem(item,'will')
      })
      this.willBox = willBoxList
    },
    initPeople(){ // 初始化人物
      const people = this.getCoords()
      this.renderItem(people, 'people')
      this.people = people
    },
    renderItem({x = 0, y = 0}, type) { // 修改渲染元素
      this.map[y][x].type = type
    },
    noItem({x = 0, y = 0 }){
      const willBoxList = this.willBox.map((item) => `${item.x},${item.y}`)
      const willsList = this.wills.map((item) => `${item.x},${item.y}`)
      const boomsList = this.booms.map((item) => `${item.x},${item.y}`)
      const str = `${x},${y}`
      return !willBoxList.includes(str) && !willsList.includes(str) && !boomsList.includes(str)
    },
    getWillBox(){ // 获取外墙坐标
      const row = this.map.length
      const clo = this.map[0].length
      const willBox = []
      for(let y = 0; y < row; y++) {
        for(let x = 0; x < clo; x++) {
          if(y === 0 || x === 0 || y === row-1 || x === clo-1) {
            willBox.push({x, y})
          }
        }
      }
      return willBox
    },
    getCoords(){ // 获取随机数
      const clo = this.map.length
      const row = this.map[0].length
      const y = Math.floor(Math.random()*(clo-2)+1);
      const x = Math.floor(Math.random()*(row-2)+1);
      return {x, y}
    },
    run(type){ // 任务运动
      if (type !== this.ns) return this.ns = type
      const { x, y } = this.people
      let newY = y
      let newX = x
      const events = {
        up:() => newY = y-1,
        down:() => newY = y+1,
        left:() => newX = x-1,
        right:() => newX = x+1
      }
      events[type] && events[type]()
      const people = { x:newX, y:newY }
      if(this.noItem(people)) {
        this.people = people
        this.renderItem(people,'people')
        this.renderItem({x, y},'none')
      }
    },
    toHere(end) {
      const start = this.people
      const This = this
      // 不确定列表
      const openArr = [start]
      // 确定列表
      const closeArr = []
      doPath()
      function doPath(){
          if(openArr.length === 0) return alert('失败')
          // 当前
          let now = openArr.shift()
          // 结束
          if(toS(now) === toS(end)) return showLine(now)
          // 获取当前节点的其他反向元素
          const spaces = getSpace(now)
          // eslint-disable-next-line no-debugger
          // debugger
          for (let index = 0; index < spaces.length; index++) {
            const element = spaces[index];
            if(noInList(element,'close')){
              const H = Math.abs(end.x - element.x) * 10 + Math.abs(end.y - element.y) * 10
              const G = 10;
              // 不在开启列表
              if(noInList(element,'open')) {
                // This.map[element.y][element.x].type = ''
                element.h = H
                element.g = G
                element.f = H + G
                element.p = now
                openArr.push(element)
              } else {
                if((H + G) < element.f) {
                  console.log(22222)
                  element.p = now
                  element.g = G
                  element.f = G + element.h
                }
              }
            }
          }
          // 标记为已完成
          closeArr.push(now)
          openArr.sort(function(li1, li2) { 
            return li1.f - li2.f
          })
          doPath()
      }

      function showLine(now){
        This.map[now.y][now.x].type !== 'people' && (This.map[now.y][now.x].type = '')
        now.p && showLine(now.p)
      }

      function noInList(itemInfo, type = 'open'){
        const sourceArr = type === 'open' ? openArr : closeArr
        const arr = sourceArr.map(itemInfos => toS(itemInfos))
        return !arr.includes(toS(itemInfo))
      }

      function toS(data){
        const {x =0,y=0} = data
        return String(x+','+y)
      }
      function getSpace({x =0,y=0}){
        // 上左右下
        const scope = [{x, y: y -1},{x: x-1, y: y},{x: x + 1, y: y },{x: x, y:y + 1}]
        const result = scope.filter(itemInfo => This.map[itemInfo.y] && This.map[itemInfo.y][itemInfo.x] && ('type' in This.map[itemInfo.y][itemInfo.x]) && ['none','','people'].includes(This.map[itemInfo.y][itemInfo.x].type))
        return result
      }
    }
  }
}
</script>

<style>
.row {
  /* overflow: hidden; */
  clear: both;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
