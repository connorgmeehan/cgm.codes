<template>
  <div :class="`IconCabinet ${selectedName ? 'IconCabinet__selected' : ''}`">
    <h3 class="IconCabinet_Title">
      {{ title }}
    </h3>
    <h3 class="IconCabinet_TechnologyTitle">
      {{ selectedName }}
    </h3>
    <div class="IconCabinet_Track">
      <a
        v-for="(el, i) in data"
        :key="i"
        @mouseover="selectedName = el.name"
        @mouseleave="selectedName = ''"
        :href="el.link"
        class="IconCabinet_Icon">
        <i :class="el.icon" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      }        
    },
    data() {
      return {
        selectedName: ''
      }
    }
}
</script>