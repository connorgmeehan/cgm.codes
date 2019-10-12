<template>
  <div class="Layout">
    <slot />
    <header class="Header_Wrapper">
      <div class="Header">
        <div class="Header_TextBlock">
          <span class="Header_Title">
            <g-link to="/">{{ $static.metadata.siteNameShort }}</g-link>
          </span>
        </div>
      </div>
    </header>
    
    <div class="Footer">
      <span class="Footer_Text">Builted with lots of 💓 using <a href="https://gridsome.org/">gridsome</a></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Layout",
}
</script>
<static-query>
query {
  metadata {
    siteName
    siteNameShort
    contactEmail
  }
}
</static-query>