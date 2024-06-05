<template>
  <div class="q-pa-lg">
    <h4>Gráficos</h4>
    <div class="q-pa-lg flex" style="gap: 10%">
      <h6>Porcentaje de Usuarios sin Género Específicado</h6>
      <q-circular-progress
        :value="undisclosedPercentage"
        size="320px"
        :thickness="1"
        color="cyan"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p class="absolute">
        Porcentaje sin género especificado
        {{ undisclosedPercentage.toFixed(1) }}%
      </p>
      <div style="width: 40%">
        <h6>Rango etario de Usuarios sin Género Específicado</h6>
        <div v-for="(value, index) in undisclosedAgeGroups" :key="index">
          <q-linear-progress
            size="20px"
            :value="value"
            :color="barColors[index]"
          />
          <p class="text-grey">{{ undisclosedAgeRanges[index] }}</p>
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
      undisclosedAgeRanges: ['0-18', '19-30', '31-50', '51+'],
      progressValues: [0, 0.1, 0.8, 0.2, 0.5, 0.8],
      barColors: ['cyan', 'cyan', 'cyan', 'cyan'],
      undisclosedPercentage: 0,
      undisclosedAgeGroups: [0, 0, 0, 0]
    }
  },
  created () {
    this.fetchUserStatistics()
  },
  methods: {
    fetchUserStatistics () {
      const undisclosedUsers = this.totalUsers.filter(
        user => user.gender === 'Prefiero no decirlo'
      )
      const totalUndisclosedUsers = undisclosedUsers.length

      const ageGroupsCount = [0, 0, 0, 0]

      undisclosedUsers.forEach(user => {
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

      // Calcula el porcentaje de usuarios no divulgados en cada grupo de edad
      const percentages = ageGroupsCount.map(
        count => count / totalUndisclosedUsers
      )

      // Asigna los porcentajes al array de grupos de edad
      this.undisclosedAgeGroups = percentages

      // no modifiques esto
      this.undisclosedPercentage =
        (totalUndisclosedUsers / this.totalUsers.length) * 100
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
  color:#00BCD4;
  font-size: 20px;
}
</style>
