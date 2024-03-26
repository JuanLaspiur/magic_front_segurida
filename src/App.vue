<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export default {
  name: 'App',

  created () {
    const vm = this
    if (this.$q.platform.is.mobile) {
      this.getDeviceToken()
      universalLinks.subscribe('ul_recuperar', function (eventData) {
        if (eventData.params.codigo) {
          vm.$router.push('/recuperacion/' + eventData.params.codigo)
        }
      })
      const customChannel = {
        id: 'general_channel',
        name: 'General',
        sound: 'blackberry',
        vibration: [300, 200, 300],
        light: true,
        lightColor: '0xFF0000FF',
        importance: 4,
        badge: true,
        visibility: 1
      }
      FirebasePlugin.createChannel(customChannel,
        function () {
          // alert('customChannel created: ' + customChannel.id)
        },
        function (error) {
          console.log('Create channel error: ' + error)
        }
      )
    }
    const session = JSON.parse(localStorage.getItem('SESSION_INFO'))
    if (session) {
      this.$api.get('user_info').then(v => {
        if (v && session.roles[0] === 2) {
          this.$router.push('/inicio')
        } else {
          this.$router.push('/login')
        }
      })
    }
  },

  methods: {
    getDeviceToken () {
      const vm = this
      FirebasePlugin.getToken(function (token) {
        vm.form.deviceToken = token
        // alert('Got FCM token: ' + token)
        if (token === null) {
          vm.getDeviceToken()
        } else {
          vm.$q.localStorage.set('dT', token)
        }
      }, function (error) {
        vm.getDeviceToken()
        console.log('Failed to get FCM token', error)
      })
    }
  }
}
</script>
