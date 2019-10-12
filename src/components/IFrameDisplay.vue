<template>
  <div class="IFrameDisplay">
    <div
      v-on:click="open"
      class="IFrameDisplay_Button">
      View Running Example
    </div>
    <div 
      v-if="isOpen" 
      :class="{IFrameDisplay_Window: true, IFrameDisplay_Window__Fullscreen: fullscreen}">
      <div 
        v-on:click="close"
        class="IFrameDisplay_CloseButton">
        <i class="icon-cancel" />
      </div>
      <iframe
        :src="url"
        class="IFrameDisplay_Frame" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IFrameDisplay',
  props: {
    url: {
      type: String,
      required: true,
      default: '',
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    open () {
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
    }
  }
}
</script>