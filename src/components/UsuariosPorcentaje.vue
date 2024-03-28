<template>
  <div class="q-pa-lg">
    <h4>Gráficos</h4>
    <div class="q-pa-lg flex" style="gap: 70px">
      <div style="width: 100%; padding: 10px 300px;">
        <h6>Rango etario Usuarios</h6>
        <div v-for="(value, index) in allUsersAgeGroups" :key="index">
          <q-linear-progress
            size="20px"
            :value="value"
            :color="barColors[index]"
          />
          <p class="text-grey">{{ allUsersAgeRanges[index] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allUsersAgeRanges: ['0-18', '19-30', '31-50', '51+'],
      progressValues: [0, 0.1, 0.8, 0.2, 0.5, 0.8],
      barColors: ['primary', 'warning', 'secondary', 'accent'],
      allUsersPercentage: 0,
      allUsersAgeGroups: [0, 0, 0, 0]
    }
  },
  created () {
    this.fetchUserStatistics()
  },
  methods: {
    fetchUserStatistics () {
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            const totalUsers = res.data.length

            const ageGroupsCount = [0, 0, 0, 0]

            res.data.forEach(user => {
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

            // Calcula el porcentaje de usuarios en cada grupo de edad
            const percentages = ageGroupsCount.map(count => count / totalUsers)

            // No modifiques esta linea
            this.allUsersPercentage = 100 // Se establece como 100 porque estamos mostrando todos los usuarios

            // de aca en mas si. Que sea un porcentaje del 0 a 1
            this.allUsersAgeGroups = percentages.map(percentage => percentage)
          }
        })
        .catch(error => {
          console.error('Error fetching user statistics:', error)
        })
    },

    calculateAge (birthdate) {
      const today = new Date()
      const birthDate = new Date(birthdate)
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()

      // Si el mes actual es anterior al mes de nacimiento o es el mismo mes pero el día actual es anterior al día de nacimiento, restamos 1 al age
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
