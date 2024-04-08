<template>
  <div style="margin: 75px">
    <p style="font-size: 20px">Usuarios que solisitaron la baja del sistema</p>
    <p style="font-size: 16px">
      Estan dados de baja simbolicamente, en el lapso de 30 días se eliminan
      completamente de la base de datos si desea apurar dicho proseso
    </p>
    <table v-if="filterDeletedUsers.length > 0" class="custom-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Fecha de baja</th>
          <th>Dias de baja simbolica</th>
          <th>Eliminación definitiva</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filterDeletedUsers" :key="user._id">
          <td>{{ user.name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <th>{{ user.dateDeleted && convertirFecha(user.dateDeleted) }}</th>
          <td>
            {{
              user.dateDeleted &&
              calcularDiferenciaEnDias(convertirFecha(user.dateDeleted))
            }}
            dias
          </td>
          <td>
            <button @click="aprobarEliminacion(user._id)">Aprobar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Cargando usuarios...</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterDeletedUsers: [],
      columns: [
        { name: 'name', label: 'Nombre', align: 'center' },
        { name: 'email', label: 'Correo electrónico', align: 'center' },
        { name: 'password', label: 'Contraseña', align: 'center' }
      ]
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers () {
      this.$api
        .get('all_user_admin')
        .then(res => {
          if (res.success) {
            this.filterDeletedUsers = res.data.filter(
              user => user.deleted === true
            )
            console.log(this.filterDeletedUsers)
          }
        })
        .catch(error => {
          console.error('Error al obtener usuarios:', error)
        })
    },
    aprobarEliminacion (userId) {
      const confirmacion = window.confirm(
        '¿Está seguro de que desea eliminar este usuario? Esta acción es irreversible.'
      )

      if (confirmacion) {
        this.$api
          .delete('eliminarUsuario/' + userId)
          .then(res => {
            if (res.status >= 200 && res.status < 300) {
              alert('Usuario eliminado')
            } else {
              alert('Error al eliminar usuario')
            }
          })
          .catch(error => {
            console.error('Error al eliminar usuario:', error)
            alert('Error al eliminar usuario')
          })
      } else {
        alert('Operación cancelada. El usuario no fue eliminado.')
      }
    },
    convertirFecha (fecha) {
      const fechaObj = new Date(fecha)
      const dia = fechaObj.getDate().toString().padStart(2, '0')
      const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0')
      const año = fechaObj.getFullYear().toString()
      const fechaFormateada = `${dia}-${mes}-${año}`

      return fechaFormateada
    },
    calcularDiferenciaEnDias (fecha) {
      const partesFecha = fecha.split('-')
      const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`

      const fechaActual = new Date()
      const fechaProporcionada = new Date(fechaFormateada)

      const diferenciaMilisegundos =
        fechaActual.getTime() - fechaProporcionada.getTime()

      const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24))

      return dias
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
</style>
