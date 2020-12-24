<template>
  <div :class="'wallItem ' + options.type">
    <span v-if="options.type === 'people' && ns === 'up'">↑</span>
    <span v-if="options.type === 'people' && ns === 'down'">↓</span>
    <span v-if="options.type === 'people' && ns === 'left'">🏃</span>
    <span v-if="options.type === 'people' && ns === 'right'">→</span>
    <span v-if="options.type === 'boom'">💣</span>
    <span v-if="options.type === 'will'">⏹</span>
    <span v-if="options.type === 'closWill'">🔮</span>
  </div>
</template>

<script>
export default {
  name: 'wall',
  props: ['options','ns']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@keyframes boom
{
    from {transform: scale(1, 1); transform-origin: center;}
    to {transform: scale(3, 3); transform-origin: center; background: maroon;}
}

.wallItem{
  width: 30px;
  height: 30px;
  background: red;
  float: left;
}
.will{
  background: lightgreen;
}
.people{
  background:red;
}
.boom{
  background: lime;
  animation: boom 3s;
}
.closWill{
  background:lightsalmon;
}
.none{
  background: lemonchiffon;
}
</style>
