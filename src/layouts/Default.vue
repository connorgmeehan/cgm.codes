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
    
    <div class="Footer" />

    <div
      id="CopySandbox_Notification"
      v-on:click="closeCopyEmail"
      class="CopySandbox_Wrapper">
      <input
        id="CopySandbox_Input"
        :value="$static.metadata.contactEmail"
        type="text">
      <div class="CopySandbox">
        <div class="CopySandbox_Content">
          {{ $static.metadata.contactEmail }} saved to clipboard
        </div>
        <div class="CopySandBox_Close" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Layout",
  methods: {
    copyEmail: function () {
      const textbox = document.getElementById("CopySandbox_Input");
      textbox.select();
      textbox.value = this.$static.metadata.contactEmail;
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
  metadata {
    siteName
    siteNameShort
    contactEmail
  }
}
</static-query>