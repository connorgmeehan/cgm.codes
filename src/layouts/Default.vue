<template>
  <div class= "Layout" :class="modifierClass">
    <header class="Header_Wrapper">
      <div class="Header">
        <div class="Header_TextBlock">
          <span class="Header_Title">
            <g-link to="/">{{ $static.metaData.siteNameShort }}</g-link>
          </span>
          <nav class="Header_Nav">
            <g-link to="/"><h3 class="Header_NavLink">Home</h3></g-link>
            <g-link to="/about"><h3 class="Header_NavLink">About</h3></g-link>
          </nav>
        </div>
      </div>
    </header>

    <slot/>
    
    <div class="Footer">
    </div>
  </div>
</template>
<script>
export default {
  name: "layout",
  props: ["pageContext"],
  computed: {
    modifierClass: function() {
      console.log(this);
      return this.pageContext ? `Layout--${this.pageContext}` : "";
    }
  }
}
</script>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>