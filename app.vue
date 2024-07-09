<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <naive-config>
      <n-message-provider>
        <n-loading-bar-provider>
          <NuxtLayout>
            <NuxtPage/>
          </NuxtLayout>
        </n-loading-bar-provider>
      </n-message-provider>
    </naive-config>
  </n-config-provider>
</template>

<style>
img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}
</style>

<!-- <style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style> -->


<script setup>

const themeOverrides = {
    common: {
      primaryColor: '#002749',
      primaryColorHover: '#2B4257',
      infoColor: '#F3F4F6',
      infoColorHover: '#E5E7EB',
      infoColorPressed: "#E5E7EB",
    },
    Input: {
    borderHover: `1px solid #002749`,
    borderFocus: `1px solid #002749`,
    textColor: '#002749',
  },
    Button: {
      textColor: '#002749',
      borderHover: `1px solid #94A3B8`,
      borderFocus: `1px solid #94A3B8`,
    },
    InternalSelection: {
      borderHover: `1px solid #002749`,
      borderFocus: `1px solid #002749`
    },
    // ...
  }

</script>