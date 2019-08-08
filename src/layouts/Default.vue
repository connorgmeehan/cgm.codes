<template>
  <div class= "Layout" :class="modifierClass">
     <slot/>

     <header class="Header_Wrapper">
      <div class="Header">
        <div class="Header_TextBlock">
          <span class="Header_Title">
            <g-link to="/">{{ $static.metaData.siteNameShort }}</g-link>
          </span>
          <nav class="Header_Nav">
            <g-link to="/"><h3 class="Header_NavLink">home</h3></g-link>
            <a href="#" v-on:click="copyEmail"><h3 class="Header_NavLink">email me</h3></a>
          </nav>
        </div>
      </div>
    </header>
    
    <div class="Footer">
    </div>

    <div class="CopySandbox_Wrapper" id="CopySandbox_Notification" v-on:click="closeCopyEmail">
      <input type="text" :value="$static.metaData.contactEmail" id="CopySandbox_Input">
      <div class="CopySandbox">
        <div class="CopySandbox_Content">
          {{$static.metaData.contactEmail}} saved to clipboard
        </div>
        <div class="CopySandBox_Close">
        </div>
      </div>
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
  },
  methods: {
    copyEmail: function () {
      const textbox = document.getElementById("CopySandbox_Input");
      textbox.select();
      textbox.value = this.$static.metaData.contactEmail;
      document.execCommand("copy");

      const notification = document.getElementById("CopySandbox_Notification");
      notification.classList.add('CopySandbox_Wrapper__display');
    },
    closeCopyEmail: function () {
      const notification = document.getElementById("CopySandbox_Notification");
      notification.classList.remove('CopySandbox_Wrapper__display');
    }
  }
}
</script>

<static-query>
query {
  metaData {
    siteName
    siteNameShort
    contactEmail
  }
}
</static-query>