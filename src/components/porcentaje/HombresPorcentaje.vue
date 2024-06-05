<template>
  <div class="q-pa-lg">
    <h4>Gráficos</h4>
    <div class="flex" style="gap: 10%">
      <h6>Porcentaje de Hombres</h6>
      <q-circular-progress
        :value="malePercentage"
        size="320px"
        :thickness="1"
        color="primary"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p class="absolute">
        Porcentaje hombres {{ malePercentage.toFixed(1) }}%
      </p>

      <div style="width: 40%">
        <h6>Rango etario Hombres</h6>
        <div v-for="(value, index) in maleAgeGroups" :key="index">
          <q-linear-progress
            size="20px"
            :value="value"
            :color="barColors[index]"
          />
          <p class="text-grey">{{ maleAgeRanges[index] }}años <span style="padding: 0  0 0 10px;">({{value.toFixed(1)*100}} %)</span> </p>
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
      maleAgeRanges: ['0-18', '19-30', '31-50', '51+'],
      progressValues: [0, 0.1, 0.8, 0.2, 0.5, 0.8],
      barColors: ['primary', 'primary', 'primary', 'primary'],
      malePercentage: 0,
      maleAgeGroups: [0, 0, 0, 0]
    }
  },
  created () {
    this.fetchUserStatistics()
  },
  methods: {
    fetchUserStatistics () {
      const maleUsers = this.totalUsers.filter(user => user.gender === 'Hombre')
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
      const percentages = ageGroupsCount.map(count => count / totalMaleUsers)

      // No modifiques esta linea
      this.malePercentage = (totalMaleUsers / this.totalUsers.length) * 100

      // de aca en mas si. Que sea un porcentaje del 0 a 1
      this.maleAgeGroups = percentages
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
.absolute {
  position: absolute;
  top: 40%;
  color:blue;
  font-size: 20px;
}
@media (width < 1850px){
  .absolute {
  top: 30%;
 right:10px;

}
}

</style>
