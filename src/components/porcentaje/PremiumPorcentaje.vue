<template>
  <div class="q-pa-lg">
    <h6>Porcentaje Usuarios Premium</h6>
    <div class="q-pa-lg flex" style="display: flex; flex-direction: row">
      <div>
        <q-circular-progress
          :value="premiumPercentage"
          size="320px"
          :thickness="1"
          color="grey-8"
          track-color="orange"
          class="q-ma-md"
        />
      </div>
      <div class="q-pl-md" style="width:max-content; padding: 0 50px;">
       <h6>{{ premiumPercentage.toFixed(1) }} % de usuarios premium</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      premiumPercentage: 0 // Inicialmente establecemos el porcentaje en 0
    }
  },
  mounted () {
    // Llamada a la API para obtener los datos de los usuarios
    this.fetchPremiumPercentage()
  },
  methods: {
    fetchPremiumPercentage () {
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            // Calculamos el porcentaje de usuarios premium
            const totalUsers = res.data.length
            const premiumUsers = res.data.filter(user => user.premium).length
            this.premiumPercentage = (premiumUsers / totalUsers) * 100
          }
        })
        .catch(error => {
          console.error('Error fetching premium percentage:', error)
        })
    }
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
