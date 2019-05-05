<template>
  <div>
    <canvas v-if="shouldDisplayWebGl" class="Title" id="canvas"></canvas>
    <div v-if="!shouldDisplayWebGl" class="Title">
      <h1 class="Title_Text" id="canvas-fallback">{{bigTitle}}</h1>
    </div>
    <div class="Content">
      <header class="Header">
        <g-link to="/" class="Header_Logo">
          <h2>{{ $static.metaData.siteName }}</h2>
        </g-link>
        <nav class="Header_Nav end">
          <g-link class="Header_NavLink" to="/">Home</g-link>
          <g-link class="Header_NavLink" to="/about">About</g-link>
        </nav>
      </header>
      <slot/>
    </div>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
import WebGLTitle from '~/assets/WebGLTitle.js'
import fontData from '../assets/font.json';

export default {
  data: function () {
    return {
      shouldDisplayWebGl: false
    }
  },
  props: ["bigTitle"],
  beforeMount: function () {
    console.log(`DefaultLayout::methods.beforeMount() -> shouldDisplayWebGl: ${this.shouldDisplayWebGl}`)
    if(true && !this.shouldDisplayWebGl) { // TODO: if gl is supported
      this.shouldDisplayWebGl = true;
    } else if (false && this.shouldDisplayWebGl) {
      this.shouldDisplayWebGl = false
    }
  },

  mounted: function () {
    console.log(`DefaultLayout::methods.updated() -> shouldDisplayWebGl: ${this.shouldDisplayWebGl}`)
    if(this.shouldDisplayWebGl) {
      var canvas = document.getElementById('canvas')
      var title = new WebGLTitle(canvas, this.bigTitle, fontData)
    }
  },
}
</script>


<style lang="scss">

.Title {
  width: 100%;
  height: $title-height-xs;
  
  &_Text {
    font-size: 15em;
    margin: 0;
    overflow: hidden;
  }

  @media #{$breakpoint-sm-up} {
    height: $title-height-sm;
  }

  @media #{$breakpoint-md-up} {
    height: $title-height-md;
  }

  @media #{$breakpoint-lg-up} {
    height: $title-height-lg;
  }
}

.Content {
  width: $layout-width-xs;
  margin: 0 auto;
}

.Header {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &_Nav {
    display: flex;
    align-items: center;

    &Link {
      margin-left: 15px;
    }
  }
}

</style>
