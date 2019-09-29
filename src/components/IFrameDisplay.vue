<template>
  <div class="IFrameDisplay">
    <div class="IFrameDisplay_Button" v-on:click="open">View Running Example</div>

    <div v-if="isOpen" :class="{IFrameDisplay_Window: true, IFrameDisplay_Window__Fullscreen: fullscreen}">
      <div class="IFrameDisplay_CloseButton" v-on:click="close">
          <i class="icon-cancel" />
      </div>
      <iframe class="IFrameDisplay_Frame" :src="url"> </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IFrameDisplay',
  props: ['url', 'fullscreen'],
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