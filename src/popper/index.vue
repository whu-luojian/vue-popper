<template>
  <div class="xui-popper"
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
    v-click-outside:touchstart.capture="onClickOutside"
  >
    <div ref="reference" @click="handleReferenceClick" class="xui-popper-reference">
      <slot name="reference">
      </slot>
    </div>
    <transition name="transition-drop">
      <Drop
        ref="popperdown"
        v-show="dropVisible"
        :data-transfer="appendToBody"
        :transfer="appendToBody"
        :placement="placement"
        v-transfer-dom
      >
        <slot>
        </slot>
      </Drop>
    </transition>
  </div>
</template>

<script>
import Drop from './drop.vue'
import TransferDom from '../utils/transfer-dom'
import { directive as clickOutside } from 'v-click-outside-x'
export default {
  name: 'XPopper',
  directives: {
    TransferDom,
    clickOutside
  },
  components: {
    Drop
  },
  props: {
    // 是否添加到body
    appendToBody: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },
  data () {
    return {
      dropVisible: false
    }
  },
  methods: {
    handleReferenceClick () {
      this.toggleMenu(!this.dropVisible)
    },
    toggleMenu (visible) {
      this.dropVisible = visible
      if (this.dropVisible) {
        this.$refs.popperdown.update()
        this.$emit('show')
      } else {
        this.$refs.popperdown.destroy()
        this.$emit('hide')
      }
    },
    hide () {
      this.toggleMenu(false)
    },
    show () {
      this.toggleMenu(true)
    },
    update () {
      this.$refs.popperdown.update()
    },
    onClickOutside () {
      if (this.dropVisible) {
        if (this.appendToBody) {
          const { $el } = this.$refs.popperdown
          if ($el === event.target || $el.contains(event.target)) {
            return
          }
        }
        event.preventDefault()
        this.toggleMenu(false)
      }
    }
  }
}
</script>

<style lang="less">
.xui-popper {
  position: relative;
  display: inline-block;
  .xui-popper-reference {
    cursor: pointer;
  }
}

.transition-drop-enter-active, .transition-drop-appear {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-name: xuiTransitionDropIn;
  animation-timing-function: ease-in-out
}

.transition-drop-leave-active {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-name: xuiTransitionDropOut;
  animation-timing-function: ease-in-out
}

@keyframes xuiTransitionDropIn {
  0% {
      opacity: 0;
      transform: scaleY(0.8);
  }
  100% {
      opacity: 1;
      transform: scaleY(1);
  }
}

@keyframes xuiTransitionDropOut {
  0% {
      opacity: 1;
      transform: scaleY(1);
  }
  100% {
      opacity: 0;
      transform: scaleY(0.8);
  }
}
</style>
