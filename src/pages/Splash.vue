<template>
  <div style="width: 100vw; height:100vh;"  class="column content-center justify-center">
    <div class="splash_logo_container ">
      <img src="logo_final_png-02.png" alt="logo">
      <q-spinner-puff class="splash_spinner" color="red-7"></q-spinner-puff>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: ''
    }
  },
  mounted () {
  },
  methods: {
    ejecutar () {
      this.$router.push('/login')
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  created () {
    this.timer = setInterval(this.ejecutar, 8000)
  },
  cancelAutoUpdate () { clearInterval(this.timer) }
}
</script>
<style lang="scss" scoped>
  @import url(../scss/Splash.scss);
</style>
