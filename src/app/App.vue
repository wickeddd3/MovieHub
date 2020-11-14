<template>
  <div id="app">
    <Navbar></Navbar>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/app/layouts/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>