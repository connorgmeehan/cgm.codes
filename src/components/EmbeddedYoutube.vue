<template>
  <div class="EmbeddedYoutube">
      <iframe :src="src" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
import {capitaliseFirstLetter} from '../helpers/utils';
const baseClass = 'EmbeddedYoutube';

export default {
  name: 'EmbeddedYoutube',
  props: {
    src: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      validator: (prop) => [
          'fullwidth',
          'halfwidth',
      ].includes(prop),
      default: 'fullwidth',
    },
  },
  methods: {
    getTypeModifier: function() { return `${baseClass}__${capitaliseFirstLetter(this.type)}` },
  }
}
</script>