<template>
<div>
  <x-popper style="margin-left: 200px" placement="bottom-start">
    <template v-slot:reference>
      下拉菜单
    </template>
    <div class="demo-dropdown-content">
      下拉展示的内容
    </div>
  </x-popper>
  <x-popper style="margin-left: 200px" placement="bottom-end">
    <template v-slot:reference>
      下拉菜单
    </template>
    <div class="demo-dropdown-content">
      下拉展示的内容
    </div>
  </x-popper>
</div>
</template>

<script>
// import Popper from '../src/index.js' // 组件打包后可引入lib中的文件测试
import Popper from '../lib/vue-popper.min.js'

export default {
  components: {
    'x-popper': Popper
  }
}
</script>

<style lang='less' scoped>
.demo-dropdown-content {
  width: 200px;
  height: 200px;
}
</style>
