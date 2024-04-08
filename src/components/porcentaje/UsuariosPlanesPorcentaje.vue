<template>
  <div style="width: 100%;">
    <div>
      <div>
        <h6>Rango etario Usuarios que crean Planes</h6>
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
      barColors: ['primary', 'warning', 'secondary', 'accent'],
      allUsersAgeGroups: [0, 0, 0, 0],
      quedadas: [],
      allUsers: []
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    fetchUsers () {
      this.$api
        .get('all_user_admin')
        .then(response => {
          this.allUsers = response.data
          this.fetchQuedadas()
        })
        .catch(error => {
          console.error('Error al obtener los usuarios:', error)
        })
    },
    fetchQuedadas () {
      this.$api
        .get('all_quedadas_admin')
        .then(response => {
          this.quedadas = response
          const uniqueUserIds = [
            ...new Set(this.quedadas.map(quedada => quedada.user_id))
          ]
          const usersWithQuedadas = this.allUsers.filter(user =>
            uniqueUserIds.includes(user._id)
          )
          const ageGroupsCount = [0, 0, 0, 0]
          usersWithQuedadas.forEach(user => {
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
          const totalUsersWithQuedadas = usersWithQuedadas.length
          const percentages = ageGroupsCount.map(
            count => count / totalUsersWithQuedadas
          )
          this.allUsersAgeGroups = percentages
        })
        .catch(error => {
          console.error('Error al obtener las quedadas:', error)
        })
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
.text-grey {
  color: #777;
}
.width{
    width: 100%;
}
</style>
