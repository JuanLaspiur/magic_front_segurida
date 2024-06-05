<template>
  <div class="q-pa-lg">
    <h4>Gráficos</h4>
    <div class="q-pa-lg flex" style="gap: 10%">
      <h6>Porcentaje de Mujeres</h6>
      <q-circular-progress
        :value="femalePercentage"
        size="320px"
        :thickness="1"
        color="purple-8"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p class="absolute">
        Porcentaje mujeres {{ femalePercentage.toFixed(1) }}%
      </p>
      <div style="width: 40%">
        <h6>Rango etario Mujeres</h6>
        <div v-for="(value, index) in femaleAgeGroups" :key="index">
          <q-linear-progress
            size="20px"
            :value="value"
            :color="barColors[index]"
          />
          <p class="text-grey">{{ femaleAgeRanges[index] }}años <span style="padding: 0  0 0 10px;">({{value.toFixed(1)*100}} %)</span> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalUsers: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      femaleAgeRanges: ['0-18', '19-30', '31-50', '51+'],
      progressValues: [0, 0.1, 0.8, 0.2, 0.5, 0.8],
      barColors: ['accent', 'accent', 'accent', 'accent'],
      femalePercentage: 0,
      femaleAgeGroups: [0, 0, 0, 0]
    }
  },
  created () {
    this.fetchUserStatistics()
  },
  methods: {
    fetchUserStatistics () {
      const femaleUsers = this.totalUsers.filter(
        user => user.gender === 'Mujer'
      )
      const totalFemaleUsers = femaleUsers.length

      const ageGroupsCount = [0, 0, 0, 0]

      femaleUsers.forEach(user => {
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

      // Calcula el porcentaje de usuarias femeninas en cada grupo de edad
      const percentages = ageGroupsCount.map(count => count / totalFemaleUsers)

      // No modifiques esta linea
      this.femalePercentage = (totalFemaleUsers / this.totalUsers.length) * 100

      // de aca en mas si. Que sea un porcentaje del 0 a 1
      this.femaleAgeGroups = percentages
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
  margin-top:20px;
  color: #777;
}
.absolute {
  position: absolute;
  top: 40%;
  font-size: 20px;
  color:#7B1FA2;
}
@media (width < 1850px){
  .absolute {
  top: 30%;
 right:10px;

}}
</style>
