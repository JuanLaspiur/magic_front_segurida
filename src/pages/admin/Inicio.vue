<template>
  <div style="padding: 50px 70px">
    <q-btn
      dense
      class="bg-primary text-white"
      style="display: absolute; top: 10px; margin-left: 10px"
      @click="descargaExcel()"
      >Exportar usuarios</q-btn
    >
    <div class="text-center text-h6 q-my-sm">Usuarios</div>
    <q-separator />
    <q-separator />
    <!-- -->
    <!-- -->
    <div class="q-px-md q-py-md" style="padding: 50px">
      <p>Filtro de Usuarios</p>
      <div class="row q-gutter-md p-4 m-4">
        <q-radio
          v-model="selectedOption"
          val="option1"
          label="Por Usuario"
          color="primary"
          dense
        />
        <q-radio
          v-model="selectedOption"
          val="option2"
          label="Por Género"
          color="primary"
          dense
        />
        <q-radio
          v-model="selectedOption"
          val="option3"
          label="Por Edad"
          color="primary"
          dense
        />
        <q-radio
          v-model="selectedOption"
          val="option4"
          label="Por Día de Registro"
          color="primary"
          dense
        />
        <q-radio
          v-model="selectedOption"
          val="option5"
          label="Por Plataforma"
          color="primary"
          dense
        />
      </div>

      <div v-if="selectedOption === 'option1'">
        <q-input
          style="padding: 25px 500px 30px 500px"
          v-model="filter"
          dense
          rounded
          outlined
          bg-color="grey-3"
          placeholder="Buscar usuario..."
          @input="filterFn()"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div v-if="selectedOption === 'option2'">
        <div
          class="row q-gutter-md p-4 m-4"
          style="width: max-content; margin:auto"
        >
          <q-radio
            v-model="selectedGender"
            val="Hombre"
            label="Hombre"
            color="primary"
            dense
          />
          <q-radio
            v-model="selectedGender"
            val="Mujer"
            label="Mujer"
            color="primary"
            dense
          />
          <q-radio
            v-model="selectedGender"
            val="Prefiero no decirlo"
            label="Prefiero no decirlo"
            color="primary"
            dense
          />
          <q-radio
            v-model="selectedGender"
            val="No binario"
            label="No binario"
            color="primary"
            dense
          />
        </div>
      </div>

      <div v-if="selectedOption === 'option3'">
        <q-input
          type="number"
          style="padding: 25px 500px 30px 500px"
          v-model="age"
          dense
          rounded
          outlined
          bg-color="grey-3"
          placeholder="Ingresa tu edad"
          @input="filterFn"
        >
        </q-input>
      </div>

      <div v-if="selectedOption === 'option4'">
        <div
          class="row q-gutter-md p-4 m-4"
          style="padding: 25px 500px 30px 500px"
        >
          <q-input
            type="number"
            v-model="day"
            label="Día"
            style="width: 100px"
            dense
            rounded
            outlined
            bg-color="grey-3"
          />
          <q-input
            type="number"
            v-model="month"
            label="Mes"
            style="width: 100px"
            dense
            rounded
            outlined
            bg-color="grey-3"
          />
          <q-input
            type="number"
            v-model="year"
            label="Año"
            style="width: 100px"
            dense
            rounded
            outlined
            bg-color="grey-3"
          />
        </div>
      </div>

      <div v-if="selectedOption === 'option5'">
        <div
          class="row q-gutter-md p-4 m-4"
          style="padding: 25px 500px 30px 500px"
        >
          <q-radio
            v-model="selectedPlatform"
            val="web"
            label="Web"
            color="primary"
            dense
          />
          <q-radio
            v-model="selectedPlatform"
            val="android"
            label="Android"
            color="primary"
            dense
          />
          <q-radio
            v-model="selectedPlatform"
            val="ios"
            label="iOS"
            color="primary"
            dense
          />
        </div>
      </div>
    </div>

    <!-- -->
    <!-- -->

    <q-table
      :data="users.filter(persona => persona.enable === true)"
      :columns="columns"
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
            <div class="q-pl-sm">
              {{ props.row.name ? props.row.name : '' }}
              {{ props.row.last_name ? props.row.last_name : '' }}
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-animalImg="props">
        <q-td :props="props"> </q-td>
      </template>
      <template v-slot:body-cell-contraseña="props">
        <q-td :props="props">
          <q-avatar size="40px">
            <q-btn
              round
              flat
              dense
              icon="edit"
              color="primary"
              v-model="props.row.editContraseña"
              :val="!props.row.editContraseña"
              @click="editarContraseña(props.row)"
            />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-age="props">
        <q-td :props="props">
          <div>{{ props.row.birthdate }}</div>
          <div class="text-caption">
            {{ calcularEdad(props.row.birthdate) }} años
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-comunidadInfo="props">
        <q-td :props="props">
          <div>{{ props.row.comunidad ? props.row.comunidad.name : '' }}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-tiempo="props">
        <q-td :props="props">
          <div v-if="props.row.tiempoWeb">{{ props.row.tiempoWeb }}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-participados="props">
        <q-td :props="props">
          <div v-if="props.row.participo">{{ props.row.participo }}</div>
          <div v-else>0</div>
        </q-td>
      </template>
      <template v-slot:body-cell-realizados="props">
        <q-td :props="props">
          <div v-if="props.row.creados">{{ props.row.creados }}</div>
          <div v-else>0</div>
        </q-td>
      </template>
      <template v-slot:body-cell-medallas="props">
        <q-td :props="props">
          <div v-if="props.row.participo && props.row.creados">
            <div
              v-if="
                (props.row.participo >= 5 &&
                  props.row.creados >= 10 &&
                  props.row.participo < 10 &&
                  props.row.creados < 25) ||
                (props.row.creados >= 25 && props.row.participo < 10) ||
                (props.row.creados < 25 && props.row.participo >= 10)
              "
            >
              Bronce
            </div>
            <div
              v-if="
                (props.row.participo >= 10 &&
                  props.row.creados >= 25 &&
                  props.row.participo < 20 &&
                  props.row.creados < 50) ||
                (props.row.creados >= 50 && props.row.participo < 20) ||
                (props.row.creados < 50 && props.row.participo >= 20)
              "
            >
              Plata
            </div>
            <div
              v-if="
                (props.row.participo >= 20 &&
                  props.row.creados >= 50 &&
                  props.row.participo < 50 &&
                  props.row.creados < 100) ||
                (props.row.creados >= 100 && props.row.participo < 50) ||
                (props.row.creados < 100 && props.row.participo >= 50)
              "
            >
              Oro
            </div>
            <div v-if="props.row.participo >= 50 && props.row.creados >= 100">
              Platino
            </div>
            <div v-else>Aún no posee medalla</div>
          </div>
          <div v-else>Aún no posee medalla</div>
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
            <q-btn
              round
              flat
              dense
              icon="visibility"
              color="primary"
              @click=";(form = props.row), (verUser = true)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:header-cell-quedadas="props">
        <q-th :props="props">
          <div>
            Habilitar usuario <br />
            para crear planes públicos
          </div>
        </q-th>
      </template>
      <template v-slot:body-cell-quedadas="props">
        <q-td :props="props">
          <div class="row no-wrap justify-center q-gutter-xs">
            <q-toggle
              dense
              color="primary"
              v-model="props.row.quedadas"
              :val="!props.row.quedadas"
              @input="actualizarQuedada(props.row)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:header-cell-quedadasPriv="props">
        <q-th :props="props">
          <div>
            Habilitar usuario <br />
            para crear planes privados
          </div>
        </q-th>
      </template>
      <template v-slot:body-cell-quedadasPriv="props">
        <q-td :props="props">
          <div class="row no-wrap justify-center q-gutter-xs">
            <q-toggle
              dense
              color="primary"
              v-model="props.row.quedadasPriv"
              :val="!props.row.quedadasPriv"
              @input="actualizarQuedadaPrivada(props.row)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:header-cell-premium="props">
        <q-th :props="props">
          <div>
            Habilitar usuario <br />
            premium
          </div>
        </q-th>
      </template>
      <template v-slot:body-cell-premium="props">
        <q-td :props="props">
          <div class="row no-wrap justify-center q-gutter-xs">
            <q-toggle
              dense
              color="primary"
              v-model="props.row.premium"
              :val="!props.row.premium"
              @input="actualizarUsuarioPremium(props.row)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-opcion="props">
        <q-td :props="props">
          <div class="row no-wrap justify-center q-gutter-xs">
            <q-btn
              round
              flat
              dense
              icon="edit"
              color="primary"
              @click="$router.push('/perfil/' + props.row._id)"
            />
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
          <q-btn
            round
            flat
            dense
            icon="delete"
            color="primary"
            v-model="props.row.eliminar"
            :val="!props.row.eliminar"
            @click="eliminarUsuario(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="verUser">
      <q-card
        class="q-px-md q-py-lg text-grey-9"
        style="width: 100%; border-radius: 15px"
      >
        <q-btn
          flat
          round
          dense
          icon="clear"
          color="grey-9"
          class="absolute-top-right"
          v-close-popup
        />
        <div class="text-subtitle1 text-bold text-primary q-pb-sm">
          Breve descripción sobre {{ form.name }}
        </div>
        <div>{{ form.description }}</div>
      </q-card>
    </q-dialog>

     <q-btn
      dense
      class="bg-primary text-white"
      style="display: absolute; top: 10px; margin-left: 10px"
      @click="datosGraficos()"
      >
      Datos Gráficos
    </q-btn>
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
        {
          name: 'fullName',
          label: 'Usuario',
          align: 'center',
          field: 'fullName',
          sortable: true
        },
        {
          name: 'animalImg',
          label: 'Animal',
          align: 'center',
          field: 'animalImg'
        },
        {
          name: 'email',
          label: 'Correo electrónico',
          align: 'center',
          field: 'email'
        },
        {
          name: 'contraseña',
          label: 'Contraseña',
          align: 'center',
          field: 'contraseña'
        },
        { name: 'age', label: 'Edad', align: 'center', field: 'age' },
        { name: 'gender', label: 'Género', align: 'center', field: 'gender' },
        { name: 'phone', label: 'Teléfono', align: 'center', field: 'phone' },
        {
          name: 'tiempoWeb',
          label: 'Tiempo web',
          align: 'center',
          field: 'tiempoWeb'
        },
        {
          name: 'participados',
          label: 'Planes participados',
          align: 'center',
          field: 'participados'
        },
        {
          name: 'realizados',
          label: 'Planes realizados',
          align: 'center',
          field: 'realizados'
        },
        {
          name: 'medallas',
          label: 'Medalla',
          align: 'center',
          field: 'medallas'
        },
        {
          name: 'cargo',
          label: 'Cargo o profesión',
          align: 'center',
          field: 'cargo'
        },
        {
          name: 'comunidadInfo',
          label: 'Comunidad',
          align: 'center',
          field: 'comunidadInfo'
        },
        {
          name: 'direccion',
          label: 'Ciudad',
          align: 'center',
          field: 'direccion'
        },
        {
          name: 'bornCountry',
          label: 'País de nacimiento',
          align: 'center',
          field: 'bornCountry'
        },
        {
          name: 'description',
          label: 'Reseña',
          align: 'center',
          field: 'description'
        },
        {
          name: 'quedadas',
          label: 'Habilitar usuario para crear quedadas',
          align: 'center',
          field: 'quedadas'
        },
        {
          name: 'quedadasPriv',
          label: 'Habilitar usuario para crear quedadas privadas',
          align: 'center',
          field: 'quedadasPriv'
        },
        {
          name: 'premium',
          label: 'Habilitar usuario premium',
          align: 'center',
          field: 'premium'
        },
        { name: 'opcion', label: 'Acciones', align: 'center', field: 'opcion' },
        {
          name: 'eliminar',
          label: 'Eliminar',
          align: 'center',
          field: 'eliminar'
        }
      ],
      selectedOptions: [],
      filterOptions: [
        // Opciones de filtro
        { label: 'Por Usuario', value: 'option1' },
        { label: 'Por Genero', value: 'option2' },
        { label: 'Por Edad', value: 'option3' },
        { label: 'Por Dia de Registro', value: 'option4' },
        { label: 'Por Plataforma', value: 'option5' }
      ],
      selectedOption: 'option1',
      selectedPlatform: '',
      platforms: [
        { value: 'web', label: 'Web' },
        { value: 'android', label: 'Android' },
        { value: 'ios', label: 'iOS' }
      ],
      selectedGender: ''
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
      this.$api.get('all_user_admin').then(res => {
        if (res.success) {
          this.allUser = res.data
          this.users = res.data
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
      this.$api
        .get('exportar-a-excel', { responseType: 'arraybuffer' })
        .then(response => {
          // Crear objeto Blob
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
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
      this.$q
        .dialog({
          title: 'Confirma',
          message: `¿Seguro deseas ${
            item.enable ? 'desbloquear' : 'bloquear'
          } este usuario? ${
            !item.enable
              ? 'Este usuario no podrá iniciar sesión en la aplicación'
              : ''
          }`,
          cancel: { label: 'Cancelar' },
          persistent: true
        })
        .onOk(() => {
          this.$api
            .put('update_user_info/' + item._id, { enable: item.enable })
            .then(res => {
              if (res) {
                this.$q.notify({
                  message: `Usuario ${
                    item.enable ? 'desbloqueado' : 'bloqueado'
                  }`,
                  color: item.enable ? 'positive' : 'negative'
                })
                this.getUsers()
              }
            })
        })
        .onCancel(() => {
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

      this.$q
        .dialog({
          title: 'Contraseña',
          message: 'Ingrese la nueva contraseña:',
          prompt: prompt,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const newPassword = prompt.model
          this.$api
            .put('actualizarPassword', {
              id: propiedad._id,
              password: newPassword
            })
            .then(res => {
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
      this.$q
        .dialog({
          title: 'Confirma',
          message: `¿Seguro deseas ${
            itm.quedadas ? 'habilitar' : 'deshabilitar'
          } los planes de este usuario?`,
          cancel: { label: 'Cancelar' },
          persistent: true
        })
        .onOk(() => {
          this.$api
            .put('update_user_info/' + itm._id, { quedadas: itm.quedadas })
            .then(res => {
              if (res) {
                this.$q.notify({
                  message: `Planes ${
                    itm.quedadas ? 'habilitados' : 'deshabilitados'
                  }`,
                  color: itm.quedadas ? 'positive' : 'negative'
                })
                this.getUsers()
              }
            })
        })
        .onCancel(() => {
          itm.quedadas = !itm.quedadas
        })
    },
    actualizarQuedadaPrivada (itm) {
      this.$q
        .dialog({
          title: 'Confirma',
          message: `¿Seguro deseas ${
            itm.quedadasPriv ? 'habilitar' : 'deshabilitar'
          } los planes de este usuario?`,
          cancel: { label: 'Cancelar' },
          persistent: true
        })
        .onOk(() => {
          this.$api
            .put('update_user_info/' + itm._id, {
              quedadasPriv: itm.quedadasPriv
            })
            .then(res => {
              if (res) {
                this.$q.notify({
                  message: `Planes ${
                    itm.quedadasPriv ? 'habilitados' : 'deshabilitados'
                  }`,
                  color: itm.quedadasPriv ? 'positive' : 'negative'
                })
                this.getUsers()
              }
            })
        })
        .onCancel(() => {
          itm.quedadasPriv = !itm.quedadasPriv
        })
    },
    actualizarUsuarioPremium (itm) {
      this.$q
        .dialog({
          title: 'Confirma',
          message: `¿Seguro deseas ${
            itm.premium ? 'habilitar' : 'deshabilitar'
          } el usuario premium?`,
          cancel: { label: 'Cancelar' },
          persistent: true
        })
        .onOk(() => {
          this.$api
            .put('update_user_info/' + itm._id, { premium: itm.premium })
            .then(res => {
              if (res) {
                this.$q.notify({
                  message: `Usuario premium ${
                    itm.premium ? 'habilitado' : 'deshabilitado'
                  }`,
                  color: itm.premium ? 'positive' : 'negative'
                })
                this.getUsers()
              }
            })
        })
        .onCancel(() => {
          itm.premium = !itm.premium
        })
    },
    eliminarUsuario (itm) {
      this.$q
        .dialog({
          title: 'Confirma',
          message: '¿Seguro deseas eliminar este usuario?',
          cancel: { label: 'Cancelar' },
          persistent: true
        })
        .onOk(() => {
          this.$api.delete('eliminar_moderador/' + itm._id).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Usuario eliminado',
                color: 'positive'
              })
              this.getUsers()
            }
          })
        })
        .onCancel(() => {
          itm.eliminar = !itm.eliminar
        })
    },
    calcularEdad (fecha) {
      const age = moment().diff(moment(fecha), 'years')
      return age
    },
    handleGenderChange () {
      this.filterFn() // Llama a la función de filtro después de actualizar selectedGender
    },
    filterFn () {
      if (this.selectedOption === 'option1') {
        if (this.filter === '') {
          this.users = this.allUser
        } else {
          const needle = this.filter.toLowerCase()
          this.users = this.allUser.slice().filter(v => {
            const fullName =
              v.name.toLowerCase() +
              (v.last_name ? ' ' + v.last_name.toLowerCase() : '')
            return fullName.includes(needle)
          })
        }
      } else if (
        this.selectedOption === 'option2' &&
        this.selectedGender !== ''
      ) {
        // Filtrar por género si se ha seleccionado uno
        const filteredUsers = this.allUser.filter(
          user => user.gender === this.selectedGender
        )
        this.users = filteredUsers
      } else if (this.selectedOption === 'option3' && this.age !== '') {
        // Filtrar por edad si se ha ingresado una edad
        const targetAge = parseInt(this.age)
        this.users = this.allUser.filter(user => {
          const userAge = this.calcularEdad(user.birthdate)
          return userAge === targetAge
        })
      } else {
        // Cuando se cambia a otra opción de filtro y no se ha seleccionado un género o edad, mostrar todos los usuarios
        this.users = this.allUser
      }
    },
    datosGraficos () {
      this.$router.push('/datos_graficos')
    }
  },
  watch: {
    // Observador para cambios en selectedGender
    selectedGender: {
      handler: 'handleGenderChange', // Llama al método de manejo de cambios de género
      immediate: true // Llama al observador inmediatamente cuando se monta el componente
    },
    selectedOption: {
      handler: 'handleGenderChange', // Llama al método de manejo de cambios de género
      immediate: true
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
