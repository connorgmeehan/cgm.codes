<template>
  <div :class="['TextCabinet', useBodyFont ? 'TextCabinet__TitleFont' : '']">
    <h3 class="TextCabinet_Title">
      {{ title }}
    </h3>

    <div class="TextCabinet_Track">
      <span
        v-for="(el, i) in elements"
        :key="i"
        @mouseover="() => onHover(el)"
        @mouseleave="() => onLeave(el)">
        <a
          v-if="ifHasLink(el)"
          :class="['TextCabinet_Element', ifHasLink(el) ? 'TextCabinet_Element__Linked' : '']"
          :href="el.link">
          {{ el.name }}
        </a>
        <span
          v-if="!ifHasLink(el)"
          class="TextCabinet_Element">
          {{ el.name }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextCabinet",
    props: {
      title: {
        type: String,
        required: true,
      },
      elements: {
        type: Array,
        required: true,
      },
      useBodyFont: {
        type: Boolean,
        default: true,
      }   
    },  data: () => ({
    selectedName: '',
  }),
  methods: {
    onHover: function (el) {
      if (el.alt) {
        this.selectedName = el.alt;
      }
    },
    onLeave: function (el) {
      if (el.alt) {
        this.selectedName = '';
      }
    },
    ifHasLink(el) {
      return el.link !== '';
    }
  }
}
</script>