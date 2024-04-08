<template>
  <div class="q-pa-lg">
    <h4>Gráficos</h4>
    <div class="flex" style="gap:10%">
      <h6>Porcentaje de Hombres</h6>
      <q-circular-progress
        :value="malePercentage"
        size="320px"
        :thickness="1"
        color="grey-8"
        track-color="orange"
        class="q-ma-md"
      />
      <p class="absolute">Porcentaje hombres {{malePercentage.toFixed(1)}}%</p>

      <div style="width:40%">
        <h6>Rango etario Hombres</h6>
        <div v-for="(value, index) in maleAgeGroups" :key="index">
          <q-linear-progress
            size="20px"
            :value="value"
            :color="barColors[index]"
          />
          <p class="text-grey">{{ maleAgeRanges[index] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      maleAgeRanges: ['0-18', '19-30', '31-50', '51+'],
      progressValues: [0, 0.1, 0.8, 0.2, 0.5, 0.8],
      barColors: ['primary', 'warning', 'secondary', 'accent'],
      malePercentage: 0,
      maleAgeGroups: [0, 0, 0, 0]
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
            const maleUsers = res.data.filter(user => user.gender === 'Hombre')
            const totalMaleUsers = maleUsers.length

            const ageGroupsCount = [0, 0, 0, 0]

            maleUsers.forEach(user => {
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

            // Calcula el porcentaje de usuarios masculinos en cada grupo de edad
            const percentages = ageGroupsCount.map(
              count => count / totalMaleUsers
            )

            // No modifiques esta linea
            this.malePercentage = (totalMaleUsers / res.data.length) * 100

            // de aca en mas si. Que sea un porcentaje del 0 a 1
            this.maleAgeGroups = percentages.map(percentage => percentage)
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
.absolute{
  position: absolute;
  top: 40%;
}
</style>
