<template>
    <div>
      <q-btn dense class=" bg-primary text-white " style=" display: absolute; top: 10px; margin-left: 10px; "  @click=" descargaExcel() " >Exportar usuarios</q-btn>
      <div class="text-center text-h6 q-my-sm">Usuarios</div>
      <q-separator />
      <div class="q-px-md q-py-md">
        <q-input v-model="filter" dense rounded outlined bg-color="grey-3" placeholder="Buscar usuario..."
        @input="filterFn(filter)">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-table
        :data="users.filter((persona) => persona.enable === true)"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
        class="q-ma-md"
        table-class="text-grey-9"
        table-header-class="text-black"
        no-data-label="No hay Usuarios"
        no-results-label="No hay Usuarios"
      >
        <template v-slot:body-cell-fullName="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="40px">
                <q-img :src="baseu + props.row._id" class="full-height"/>
              </q-avatar>
              <div class="q-pl-sm">{{props.row.name? props.row.name : ''}} {{props.row.last_name? props.row.last_name : ''}}</div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-animalImg="props">
          <q-td :props="props">
            <q-avatar size="40px">
              <q-img :src="'animales/' + props.row.animalInfo.img" class="full-height"/>
            </q-avatar>
          </q-td>
        </template>
        <template v-slot:body-cell-contraseña="props">
          <q-td :props="props">
            <q-avatar size="40px">
              <q-btn round flat dense icon="edit" color="primary" v-model="props.row.editContraseña" :val="!props.row.editContraseña"
                  @click="editarContraseña(props.row)" />
            </q-avatar>
          </q-td>
        </template>
        <template v-slot:body-cell-age="props">
          <q-td :props="props">
            <div>{{ props.row.birthdate }}</div>
            <div class="text-caption">{{calcularEdad(props.row.birthdate)}} años</div>
          </q-td>
        </template>
        <template v-slot:body-cell-comunidadInfo="props">
          <q-td :props="props">
            <div>{{ props.row.comunidad? props.row.comunidad.name : '' }}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-tiempo="props">
          <q-td :props="props">
            <div v-if="props.row.tiempoWeb">{{props.row.tiempoWeb}}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-participados="props">
          <q-td :props="props">
            <div v-if="props.row.participo">{{props.row.participo}}</div>
            <div v-else >0</div>
          </q-td>
        </template>
        <template  v-slot:body-cell-realizados="props">
          <q-td :props="props">
            <div v-if="props.row.creados" >{{props.row.creados}}</div>
            <div v-else >0</div>
          </q-td>
        </template>
        <template  v-slot:body-cell-medallas="props">
          <q-td :props="props">
          <div v-if="props.row.participo && props.row.creados" >
            <div v-if="(props.row.participo >= 5 && props.row.creados >= 10 && props.row.participo < 10 && props.row.creados < 25) || (props.row.creados >= 25 && props.row.participo < 10 ) || (props.row.creados < 25 && props.row.participo >= 10) ">Bronce</div>
            <div v-if="(props.row.participo >= 10 && props.row.creados >= 25 && props.row.participo < 20 && props.row.creados < 50) || (props.row.creados >= 50 && props.row.participo < 20) || (props.row.creados < 50 && props.row.participo >= 20)">Plata</div>
            <div v-if="(props.row.participo >= 20 && props.row.creados >= 50 && props.row.participo < 50 && props.row.creados < 100) || (props.row.creados >= 100 && props.row.participo < 50) || (props.row.creados < 100 && props.row.participo >= 50)">Oro</div>
            <div v-if="props.row.participo >= 50 && props.row.creados >= 100">Platino</div>
            <div v-else >Aún no posee medalla</div>
          </div>
          <div v-else >Aún no posee medalla</div>
        </q-td>
        </template>
        <template v-slot:body-cell-direccion="props">
          <q-td :props="props">
            <div>{{ props.row.ciudad.name }}</div>
            <div class="text-caption">Zona {{ props.row.zone }}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-description="props">
          <q-td :props="props">
            <div class="row no-wrap justify-center q-gutter-xs">
              <q-btn round flat dense icon="visibility" color="primary"
              @click="form = props.row, verUser = true" />
            </div>
          </q-td>
        </template>
        <template v-slot:header-cell-quedadas="props">
          <q-th :props="props">
            <div>Habilitar usuario <br> para crear planes</div>
          </q-th>
        </template>
        <template v-slot:body-cell-quedadas="props">
          <q-td :props="props">
            <div class="row no-wrap justify-center q-gutter-xs">
              <q-toggle dense color="primary" v-model="props.row.quedadas" :val="!props.row.quedadas" @input="actualizarQuedada(props.row)" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-opcion="props">
          <q-td :props="props">
            <div class="row no-wrap justify-center q-gutter-xs">
              <q-btn round flat dense icon="edit" color="primary"
              @click="$router.push('/perfil/' + props.row._id)" />
              <q-toggle
                v-if="rol === 1"
                v-model="props.row.enable"
                checked-icon="lock_open"
                color="green"
                unchecked-icon="lock"
                @input="habilitarUsuario(props.row)"
              />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-eliminar="props">
          <q-td :props="props">
            <q-btn round flat dense icon="delete" color="primary" v-model="props.row.eliminar" :val="!props.row.eliminar"
                @click="eliminarUsuario(props.row)" />
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="verUser">
        <q-card class="q-px-md q-py-lg text-grey-9" style="width: 100%; border-radius:15px">
          <q-btn flat round dense icon="clear" color="grey-9" class="absolute-top-right" v-close-popup />
          <div class="text-subtitle1 text-bold text-primary q-pb-sm">Breve descripción sobre {{form.name}}</div>
          <div>{{form.description}}</div>
        </q-card>
      </q-dialog>
    </div>
  </template>
<script>
import env from '../../env'
import moment from 'moment'
export default {
  data () {
    return {
      pagination: {
        rowsPerPage: 10
      },
      usersF: [],
      verUser: false,
      rol: 0,
      baseu: '',
      filter: '',
      form: {},
      allUser: [],
      users: [],
      data: [],
      columns: [
        { name: 'fullName', label: 'Usuario', align: 'center', field: 'fullName', sortable: true },
        { name: 'animalImg', label: 'Animal', align: 'center', field: 'animalImg' },
        { name: 'email', label: 'Correo electrónico', align: 'center', field: 'email' },
        { name: 'contraseña', label: 'Contraseña', align: 'center', field: 'contraseña' },
        { name: 'age', label: 'Edad', align: 'center', field: 'age' },
        { name: 'gender', label: 'Género', align: 'center', field: 'gender' },
        { name: 'phone', label: 'Teléfono', align: 'center', field: 'phone' },
        { name: 'tiempoWeb', label: 'Tiempo web', align: 'center', field: 'tiempoWeb' },
        { name: 'participados', label: 'Planes participados', align: 'center', field: 'participados' },
        { name: 'realizados', label: 'Planes realizados', align: 'center', field: 'realizados' },
        { name: 'medallas', label: 'Medalla', align: 'center', field: 'medallas' },
        { name: 'cargo', label: 'Cargo o profesión', align: 'center', field: 'cargo' },
        { name: 'comunidadInfo', label: 'Comunidad', align: 'center', field: 'comunidadInfo' },
        { name: 'direccion', label: 'Ciudad', align: 'center', field: 'direccion' },
        { name: 'bornCountry', label: 'País de nacimiento', align: 'center', field: 'bornCountry' },
        { name: 'description', label: 'Reseña', align: 'center', field: 'description' },
        { name: 'quedadas', label: 'Habilitar usuario para crear quedadas', align: 'center', field: 'quedadas' },
        { name: 'opcion', label: 'Acciones', align: 'center', field: 'opcion' },
        { name: 'eliminar', label: 'Eliminar', align: 'center', field: 'eliminar' }
      ]
    }
  },
  beforeMount () {
    this.baseu = env.apiUrl + 'perfil_img/'
    this.getUsers()
    this.getInfo()
  },
  methods: {
    getRealizados (id, i) {
      this.$api.get('quedadas_user/' + id).then(res => {
        if (res) {
          this.users[i].realizados = res.length
        }
      })
      this.$api.get('evetos_asistidos/' + id).then(res => {
        if (res) {
          this.users[i].participados = res.length
        }
      })
    },
    getTiempo (userId, index) {
      const tiempoEnSegundos = this.users[index].tiempoWeb
      const horas = Math.floor(tiempoEnSegundos / 3600)
      const minutos = Math.floor((tiempoEnSegundos % 3600) / 60)
      const segundos = Math.floor(tiempoEnSegundos % 60)
      let tiempoFormateado = `${horas}Hs ${minutos}Ms ${segundos}Sg`
      if (tiempoFormateado === 'NaNHs NaNMs NaNSg') {
        tiempoFormateado = '0Hs 0Ms 0Sg'
      }
      this.users[index].tiempoWeb = tiempoFormateado
    },
    getUsers () {
      this.$api.get('all_user').then(res => {
        if (res) {
          this.allUser = res.filter((people) => people.online === true)
          this.users = res.filter((people) => people.online === true)
          for (let i = 0; i < this.users.length; i++) {
            this.getRealizados(res[i]._id, i)
          }
          for (let i = 0; i < this.users.length; i++) {
            this.getTiempo(res[i]._id, i)
          }
        }
      })
    },
    getInfo () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
        }
      })
    },
    descargaExcel () {
      this.$api.get('exportar-a-excel', { responseType: 'arraybuffer' })
        .then(response => {
          // Crear objeto Blob
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          // Crear URL para descargar archivo
          const url = URL.createObjectURL(blob)
          // Crear enlace de descarga y hacer clic en él
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'users.xlsx')
          document.body.appendChild(link)
          link.click()
          // Liberar recursos
          URL.revokeObjectURL(url)
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log(error)
        })
    },
    habilitarUsuario (item) {
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas ${item.enable ? 'desbloquear' : 'bloquear'} este usuario? ${!item.enable ? 'Este usuario no podrá iniciar sesión en la aplicación' : ''}`,
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        this.$api.put('update_user_info/' + item._id, { enable: item.enable }).then(res => {
          if (res) {
            this.$q.notify({
              message: `Usuario ${item.enable ? 'desbloqueado' : 'bloqueado'}`,
              color: item.enable ? 'positive' : 'negative'
            })
            this.getUsers()
          }
        })
      }).onCancel(() => {
        item.enable = !item.enable
      })
    },
    editarContraseña (propiedad) {
      const prompt = {
        model: '',
        type: 'text',
        attrs: {
          placeholder: 'Contraseña',
          autocomplete: 'off' // Evita el autocompletado automático
        }
      }

      this.$q.dialog({
        title: 'Contraseña',
        message: 'Ingrese la nueva contraseña:',
        prompt: prompt,
        cancel: true,
        persistent: true
      })
        .onOk(() => {
          const newPassword = prompt.model
          this.$api.put('actualizarPassword', { id: propiedad._id, password: newPassword }).then(res => {
            if (res) {
              this.$q.notify({
                color: 'positive',
                message: 'Contraseña cambiada.'
              })
            } else {
              this.$q.notify({
                color: 'positive',
                message: 'Contraseña cambiada.'
              })
            }
          })
            .catch(error => console.log(error))
        })
    },
    actualizarQuedada (itm) {
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas ${itm.quedadas ? 'habilitar' : 'deshabilitar'} los planes de este usuario?`,
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        this.$api.put('update_user_info/' + itm._id, { quedadas: itm.quedadas }).then(res => {
          if (res) {
            this.$q.notify({
              message: `Planes ${itm.quedadas ? 'habilitados' : 'deshabilitados'}`,
              color: itm.quedadas ? 'positive' : 'negative'
            })
            this.getUsers()
          }
        })
      }).onCancel(() => {
        itm.quedadas = !itm.quedadas
      })
    },
    eliminarUsuario (itm) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar este usuario?',
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        this.$api.delete('eliminar_moderador/' + itm._id).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Usuario eliminado',
              color: 'positive'
            })
            this.getUsers()
          }
        })
      }).onCancel(() => {
        itm.eliminar = !itm.eliminar
      })
    },
    calcularEdad (fecha) {
      const age = moment().diff(moment(fecha), 'years')
      return age
    },
    filterFn (val) {
      if (val === '') {
        this.users = this.allUser
      } else {
        const needle = val.toLowerCase()
        // this.users = this.allUser.filter(v => v.name.toLowerCase().indexOf(needle) > -1 || v.last_name.toLowerCase().indexOf(needle) > -1)
        this.users = this.allUser.filter(v => (v.name.toLowerCase() + (v.last_name ? ' ' + v.last_name.toLowerCase() : '')).startsWith(needle))
      }
    }
  }
}
</script>
  <style scoped lang="scss">
  .boton-exportar {
    text-align: center;
    margin-top: 5px;
    cursor: pointer;
    top: 0px;
    right: 0px;
    width: 140px;
    margin-right: 10px;
    background-color: gray;
  }
  .foto-medalla {
    width: 30px;
    height: 30px;
  }
  </style>
