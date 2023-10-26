<template>
  <div class="ScrollArrow_Container">
    <a
      v-if="target" 
      v-scroll-to="target"
      class="ScrollArrow">
      <span class="ScrollArrow_Icon" />
      <h4
        v-if="title"
        class="ScrollArrow_Title">
        {{ title }}
      </h4>
    </a>

    <span
      v-if="!target"
      class="ScrollArrow">
      <h4
        v-if="title"
        class="ScrollArrow_Title">
        {{ title }}
      </h4>
    </span>
  </div>
</template>

<script>
export default {
  name: "ScrollArrow",
  props: {
    title: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    }
  }
}
</script>