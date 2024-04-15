<template>
  <div style="margin: 75px">
    <p style="font-size: 20px">Lista de usuarios para agregar insigna</p>

    <!-- Input de búsqueda -->
    <q-input
      style="width: 500px; margin: 20px 0"
      v-model="filtroCorreo"
      label="Buscar por correo electrónico"
      outlined
      dense
      clearable
    />

    <table v-if="usuarios.length > 0" class="custom-table">
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Planes creados</th>
          <th>Planes participó</th>
          <th>Tiempo conectado</th>
          <th>Agregar insigna</th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
      <tbody>
        <tr v-for="user in usuariosPaginados" :key="user._id">
          <td>{{ user.name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.creados ? user.creados : 0 }}</td>
          <td>{{ user.participo ? user.participo : 0 }}</td>
          <td>{{ user.tiempoWeb }}</td>
          <td>
            <button @click="openModal(user)">Agregar insigna</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Cargando usuarios...</div>

    <!-- Botones de paginación -->
    <div style="margin-top: 50px">
      <q-btn
        @click="paginaActual--"
        :disable="paginaActual === 1"
        label="Anterior"
        color="primary"
      />
      <span style="margin: 0 50px"
        >Página {{ paginaActual }} de {{ totalPaginas }}</span
      >
      <q-btn
        @click="paginaActual++"
        :disable="paginaActual === totalPaginas"
        label="Siguiente"
        color="primary"
      />
    </div>

    <!-- Modal -->
    <q-dialog ref="modal" v-model="showModal" persistent>
      <q-card>
        <q-card-section class="row items-center justify-center">
          <h5>Selecciona una Insignia para:</h5>
          <div style="width: 100%; height: 12px"></div>
          <p>
            {{ selectedUser ? selectedUser.name : 'N/A' }}
            {{ selectedUser ? selectedUser.last_name : 'N/A' }}
          </p>
        </q-card-section>
        <q-list bordered separator>
          <q-item
            v-for="(insignia, index) in insignias"
            :key="index"
            clickable
            @click="seleccionarInsignia(insignia)"
            :class="{
              'selected-insignia': insignia._id === selectedInsigniaId
            }"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="baseuInsigna + insignia.image" alt="Insignia" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ insignia.name }}</q-item-label>
              <q-item-label caption>{{ insignia.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Botones para cerrar el modal y agregar la insignia -->
        <q-card-actions align="right">
          <q-btn color="primary" label="Cerrar" @click="closeModal" />
          <!-- Mostrar el botón solo si se ha seleccionado una insignia -->
          <q-btn
            v-if="selectedInsignia"
            color="primary"
            label="Agregar Insignia"
            @click="agregarInsigna(selectedUserId, selectedInsigniaId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseuInsigna: '',
      showModal: false,
      usuarios: [],
      filtroCorreo: '', // Variable para filtrar por correo electrónico
      paginaActual: 1,
      tamañoPagina: 10,
      insignias: [],
      selectedUser: null,
      selectedInsignia: null,
      selectedUserId: null, // Nuevo: ID del usuario seleccionado
      selectedInsigniaId: null // Nuevo: ID de la insignia seleccionada
    }
  },
  mounted () {
    this.baseuInsigna = env.apiUrl + 'insigna_img/'
  },

  computed: {
    totalPaginas () {
      return Math.ceil(this.usuarios.length / this.tamañoPagina)
    },
    usuariosPaginados () {
      const indiceInicial = (this.paginaActual - 1) * this.tamañoPagina
      const indiceFinal = this.paginaActual * this.tamañoPagina
      return this.usuarios
        .filter(user => {
          // Filtrar por correo electrónico si hay un filtro aplicado
          if (this.filtroCorreo.trim() === '') {
            return true // Si no hay filtro, mostrar todos los usuarios
          } else {
            return user.email
              .toLowerCase()
              .includes(this.filtroCorreo.toLowerCase())
          }
        })
        .slice(indiceInicial, indiceFinal)
    }
  },
  created () {
    this.getAllUsers()
    this.fetchTraerInsignas() // Llama a fetchTraerInsignas al crear el componente
  },
  methods: {
    getAllUsers () {
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            this.usuarios = res.data.filter(user => user.deleted !== true)
          }
        })
        .catch(error => {
          console.error('Error al obtener usuarios:', error)
        })
    },
    fetchTraerInsignas () {
      try {
        this.$api
          .get('/insignas')
          .then(response => {
            this.insignias = response
            console.log('Insignias cargadas:', this.insignias)
          })
          .catch(error => {
            console.error('Error al obtener las insignias:', error)
          })
      } catch (error) {
        console.error('Error al obtener las insignias:', error)
      }
    },
    async agregarInsigna (userId, insignaId) {
      try {
        await this.$api.put(`/insignas/${insignaId}/usuarios/${userId}`)
        // Mostrar mensaje de éxito usando Quasar Notify
        this.$q.notify({
          color: 'positive',
          message: 'Insignia agregada correctamente',
          position: 'bottom',
          timeout: 2000 // Duración del mensaje en milisegundos
        })
        // Cerrar el modal después de agregar la insignia correctamente
        this.closeModal()
      } catch (error) {
        console.error('Error al agregar el usuario a la insignia:', error)
        // Mostrar mensaje de error usando Quasar Notify
        this.$q.notify({
          color: 'negative',
          message: 'Error al agregar la insignia',
          position: 'bottom',
          timeout: 2000 // Duración del mensaje en milisegundos
        })
      }
    },
    openModal (user) {
      // Nuevo: Asignar el ID del usuario seleccionado
      console.log(user)
      this.selectedUser = user
      this.selectedUserId = user._id
      this.showModal = true
    },
    closeModal () {
      // Nuevo: Restablecer los valores cuando se cierra el modal
      this.selectedUserId = null
      this.selectedInsigniaId = null
      this.selectedUser = null
      this.selectInsignia = null
      this.showModal = false
    },
    seleccionarInsignia (insignia) {
      // Nuevo: Asignar el ID de la id
      this.selectedInsignia = insignia
      this.selectedInsigniaId = insignia._id
      console.log('Insignia seleccionada:', insignia)
    }
  }
}
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.selected-insignia {
  background-color: lightblue;
}
</style>
