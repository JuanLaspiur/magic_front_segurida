<template>
  <button @click="handleGoogleSignIn">Inicia sesión con Google</button>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

export default {
  data () {
    return {
      auth: null,
      provider: null,
      app: null,
      analytics: null
    }
  },
  mounted () {
    const firebaseConfig = {
      apiKey: 'AIzaSyAK_E5ru1awuJxyIha1NUlIyc3oDmSQV2U',
      authDomain: 'magic2024-fa5f2.firebaseapp.com',
      projectId: 'magic2024-fa5f2',
      storageBucket: 'magic2024-fa5f2.appspot.com',
      messagingSenderId: '332911755528',
      appId: '1:332911755528:web:54f56ae8ba95c4e5486cbd',
      measurementId: 'G-D982V0N5EP'
    }
    this.app = initializeApp(firebaseConfig)
    console.error('Esta aplicación    ' + this.app)
    this.auth = getAuth(this.app)
    this.provider = new GoogleAuthProvider()
    this.analytics = getAnalytics(this.app)
  },
  methods: {
    async handleGoogleSignIn () {
      try {
        const result = await signInWithPopup(this.auth, this.provider)
        // Acceder a la información del usuario y al token desde el resultado
        console.log('Usuario autenticado:', result)
      } catch (error) {
        console.error('Error al iniciar sesión con Google:', error)
      }
    }
  }
}
</script>
