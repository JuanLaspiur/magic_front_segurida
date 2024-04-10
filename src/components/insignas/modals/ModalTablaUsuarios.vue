<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-header>
        <span class="text-h6">Asignar Insignia</span>
        <q-icon @click="close" name="close" slot="icon" />
      </q-card-header>

      <q-card-main>
        <p>
          Selecciona la insignia que deseas asignar al usuario con correo
          electrónico {{ user?.email }}
        </p>
        <q-select
          v-model="selectedInsignia"
          :options="insignias"
          label="Seleccionar Insignia"
        >
          <template v-slot:option="{ value }">
            {{ value.nombre }}
          </template>
        </q-select>
        <br />
        <q-btn
          color="primary"
          label="Asignar Insignia"
          @click="assignInsignia"
        />
      </q-card-main>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    userId: Number, // Prop to receive the user ID
    close: Function // Prop to handle closing the modal (from parent)
  },
  data () {
    return {
      isOpen: false,
      user: null,
      insignias: [], // Array of available insignias
      selectedInsignia: null
    }
  },
  watch: {
    userId (newVal) {
      if (newVal) {
        // Fetch user data based on userId
        this.getUser(newVal)
      }
    }
  },
  methods: {
    getUser (userId) {
      // Replace with your logic to fetch user data based on userId
      console.log('Fetching user data for ID:', userId)
      // You can use this.$api.get(`user/${userId}`) or similar depending on your API
      this.user = { email: 'user@example.com' } // Example user data
    },
    assignInsignia () {
      if (this.selectedInsignia) {
        // Implement logic to assign the selected insignia to the user
        const insigniaId = this.selectedInsignia.id // Assuming 'id' property exists in insignias
        console.log('Assigning insignia', insigniaId, 'to user', this.userId)
        // You can use this.$api.post(`assign_insignia/${userId}`, { insigniaId }) or similar depending on your API
        this.close() // Close the modal after successful assignment (optional)
      } else {
        console.warn('No se ha seleccionado ninguna insignia.')
      }
    }
  },
  created () {
    // Fetch available insignias (if not done elsewhere)
    this.insignias = [
      { id: 1, nombre: 'Insignia de Oro' },
      { id: 2, nombre: 'Insignia de Plata' },
      { id: 3, nombre: 'Insignia de Bronce' }
    ] // Example insignias
  }
}
</script>

<style>
/* Optional styles for the modal */
</style>
