<template>
  <div style="width: 100%">
    <div>
      <div>
        <h6>Rango etario Usuarios</h6>
        <div v-for="(value, index) in allUsersAgeGroups" :key="index">
          <q-linear-progress
            size="20px"
            :value="value"
            :color="barColors[index]"
          />
          <p class="text-grey">{{ allUsersAgeRanges[index] }} años <span style="padding: 0  0 0 10px;">({{value.toFixed(1)*100}} %)</span> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalUsers: {
      type: Array, // Suponiendo que totalUsers es una lista de usuarios
      default: () => [] // Valor predeterminado de una lista vacía si no se proporciona
    }
  },
  data () {
    return {
      allUsersAgeRanges: ['0-18', '19-30', '31-50', '51+'],
      progressValues: [0, 0.1, 0.8, 0.2, 0.5, 0.8],
      barColors: ['warning', 'warning', 'warning', 'warning'],
      allUsersPercentage: 0,
      allUsersAgeGroups: [0, 0, 0, 0]
    }
  },
  created () {
    // No es necesario llamar a fetchUserStatistics() ya que los datos se proporcionan directamente en totalUsers
    this.calculateUserStatistics()
  },
  mounted () {
    this.calculateUserStatistics()
  },
  watch: {
    totalUsers: {
      handler: 'calculateUserStatistics', // Llama a calculateUserStatistics() cuando totalUsers cambia
      immediate: true // Activa el watcher inmediatamente después del montaje
    }
  },
  methods: {
    calculateUserStatistics () {
      const totalUsers = this.totalUsers

      if (totalUsers.length > 0) {
        const ageGroupsCount = [0, 0, 0, 0]

        totalUsers.forEach(user => {
          const age = this.calculateAge(user.birthdate)
          if (age >= 0 && age <= 18) {
            ageGroupsCount[0]++
          } else if (age >= 19 && age <= 30) {
            ageGroupsCount[1]++
          } else if (age >= 31 && age <= 50) {
            ageGroupsCount[2]++
          } else {
            ageGroupsCount[3]++
          }
        })

        const totalUsersCount = totalUsers.length

        // Calcula el porcentaje de usuarios en cada grupo de edad
        const percentages = ageGroupsCount.map(count => count / totalUsersCount)

        // Establece las estadísticas calculadas en los datos del componente
        this.allUsersPercentage = 100 // Se establece como 100 porque estamos mostrando todos los usuarios
        this.allUsersAgeGroups = percentages
      } else {
        console.error('Error: No hay usuarios para calcular estadísticas.')
      }
    },

    calculateAge (birthdate) {
      const today = new Date()
      const birthDate = new Date(birthdate)
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()

      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    }
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
.text-grey {
  color: #777;
}
</style>
