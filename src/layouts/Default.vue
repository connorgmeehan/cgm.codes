<template>
  <div class="Layout">
    <slot />
    <header class="Header_Wrapper">
      <div
        :class="{
          Header: true,
          Header__Open: isNavOpen
        }">
        <div class="Header_TextBlock">
          <span class="Header_Title">
            <g-link to="/">{{ $static.metadata.siteNameShort }}</g-link>
          </span>
          <div class="Header_NavLinkContainer">
            <g-link
              class="Header_NavLink"
              to="/#about">
              about
            </g-link>
            <g-link
              class="Header_NavLink"
              to="/#work">
              work
            </g-link>
            <a 
              class="Header_NavLink"
              href="https://docs.google.com/document/d/1_2ZPFByC7vNtfa4bk4kTMDWpCkOgG_7pYNeWm0qb40U/edit?usp=sharing">
              resume
            </a>
            <IconCabinet
              :data="$static.metadata.socials"
              base-class-modifier="Navbar" />
          </div>
          <div 
            v-on:click="isNavOpen = !isNavOpen"
            :class="`Header_NavLinkMenu hamburger hamburger--vortex ${isNavOpen ? 'is-active' : ''}`">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </div>
        </div>
      </div>
    </header>
    
    <div class="Footer">
      <span class="Footer_Text">Builted with lots of 💓 using <a href="https://gridsome.org/">gridsome</a></span>
    </div>
  </div>
</template>
<script>
import IconCabinet from '../components/IconCabinet';

export default {
  name: "Layout",
  components: {
    IconCabinet
  },
  data: () => ({
    isNavOpen: false,
  })
}
</script>
<static-query>
query {
  metadata {
    siteName
    siteNameShort
    contactEmail
    socials {
      name
      icon
      link
    }
  }
}
</static-query>