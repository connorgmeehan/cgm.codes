<template>
  <div :class="getBaseClass()">
    <h3
      v-if="title"
      class="IconCabinet_Title">
      {{ title }}
    </h3>
    <h3
      v-if="title"
      class="IconCabinet_TechnologyTitle">
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
        required: false,
        default: null,
      },
      data: {
        type: Array,
        required: true,
      },
      baseClassModifier: {
        type: String,
        required: false,
        default: null,
      }
    },
    data() {
      return {
        selectedName: ''
      }
    },
    methods: {
      getBaseClass: function() {
        const baseClass='IconCabinet';
        let result = baseClass;
        if(this.selectedName) {
          result += ` ${baseClass}__Selected`;
        }
        if(this.baseClassModifier) {
          result += ` ${baseClass}__${this.baseClassModifier}`;
        }
        return result;
      }
    }
}
</script>