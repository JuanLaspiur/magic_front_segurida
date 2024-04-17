<template>
  <button id="googleSignInBtn">Iniciar sesión con Google</button>
</template>

<script>
export default {
  mounted () {
    const clientId =
      '332911755528-lmj2pjok3iu8vrvt5316mm7h7sh1s0tm.apps.googleusercontent.com'
    const scope = 'profile email'

    const googleSignInBtn = document.getElementById('googleSignInBtn')

    googleSignInBtn.addEventListener('click', async () => {
      const redirectUri = 'http://localhost:8080'
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
      window.location.href = url
    })

    this.handleAuthorizationCode()
  },

  methods: {
    async handleAuthorizationCode () {
      console.log('Entré en handleAuthorizationCode')

      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        console.log('Código de autorización:', code)

        const clientId =
          '332911755528-lmj2pjok3iu8vrvt5316mm7h7sh1s0tm.apps.googleusercontent.com'
        const redirectUri = 'http://localhost:8080'

        const tokenUrl =
          'https://cors-anywhere.herokuapp.com/https://oauth2.googleapis.com/token'
        const tokenParams = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
          })
        }

        console.log('Enviando solicitud de token de acceso')

        try {
          const response = await fetch(tokenUrl, tokenParams)
          console.log('Respuesta de la solicitud de token de acceso:', response)

          if (response.ok) {
            const data = await response.json()
            console.log('Token de acceso:', data.access_token)
          } else {
            console.error(
              'Error al solicitar el token de acceso:',
              response.status
            )
          }
        } catch (error) {
          console.error('Error en la solicitud de token de acceso:', error)
        }
      } else {
        console.log('No hay código de autorización en la URL')
      }
    }
  }
}
</script>
