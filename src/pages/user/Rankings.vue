<template>
    <div class="inicio_container">
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar :muro="true" />
      </div>
    </div>
    <div class="inicio q-mb-xl">
    <div class="text-center text-bold text-primary text-h5 q-mt-xl">Ranking de usuarios con mas planes creados</div>
    <q-separator />
    <q-table
      :data="usersByCreate.slice(0,5)"
      :columns="columnsForCreate"
      row-key="name"
      :pagination.sync="pagination"
      class="q-ma-md q-mt-lg"
      table-class="text-grey-9"
      table-header-class="text-black"
      no-data-label="No hay Usuarios"
      no-results-label="No hay Usuarios"
    >
      <template v-slot:body-cell-fullName="props">
        <q-td :props="props">
          <div class="row items-center no-wrap">
            <q-avatar size="40px">
              <q-img :src="baseuPerfil + props.row._id" class="full-height" />
            </q-avatar>
            <div class="q-pl-sm">
              {{ props.row.name ? props.row.name : "" }}
              {{ props.row.last_name ? props.row.last_name : "" }}
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-age="props">
        <q-td :props="props">
          <div class="text-caption">
            {{ calcularEdad(props.row.birthdate) }} años
          </div>
        </q-td>
      </template>
      <template  v-slot:body-cell-medallas="props">
        <q-td :props="props">
          <div v-if="props.row.participo && props.row.creados" >
            <div v-if="(props.row.participo >= 5 && props.row.creados >= 10 && props.row.participo < 10 && props.row.creados < 25) || (props.row.creados >= 25 && props.row.participo < 10 ) || (props.row.creados < 25 && props.row.participo >= 10) ">Bronce</div>
            <div v-else-if="(props.row.participo >= 10 && props.row.creados >= 25 && props.row.participo < 20 && props.row.creados < 50) || (props.row.creados >= 50 && props.row.participo < 20) || (props.row.creados < 50 && props.row.participo >= 20)">Plata</div>
            <div v-else-if="(props.row.participo >= 20 && props.row.creados >= 50 && props.row.participo < 50 && props.row.creados < 100) || (props.row.creados >= 100 && props.row.participo < 50) || (props.row.creados < 100 && props.row.participo >= 50)">Oro</div>
            <div v-else-if="props.row.participo >= 50 && props.row.creados >= 100">Platino</div>
            <div v-else >Aún no posee medalla!</div>
          </div>
          <div v-else >Aún no posee medalla</div>
        </q-td>
      </template>
      <template v-slot:body-cell-realizados="props">
        <q-td :props="props">
          <div v-if="props.row.eventosCreados.length">{{ props.row.eventosCreados.length }}</div>
          <div v-else>0</div>
        </q-td>
      </template>
    </q-table>
    <div class="text-center text-bold text-primary text-h5 q-mt-xl">Ranking de usuarios con mas asistencias</div>
    <q-separator />
    <q-table
      :data="usersByAsist.slice(0,5)"
      :columns="columnsForAsist"
      row-key="name"
      :pagination.sync="pagination"
      class="q-ma-md q-mt-lg"
      table-class="text-grey-9"
      table-header-class="text-black"
      no-data-label="No hay Usuarios"
      no-results-label="No hay Usuarios"
    >
      <template v-slot:body-cell-fullName="props">
        <q-td :props="props">
          <div class="row items-center no-wrap">
            <q-avatar size="40px">
              <q-img :src="baseuPerfil + props.row._id" class="full-height" />
            </q-avatar>
            <div class="q-pl-sm">
              {{ props.row.name ? props.row.name : "" }}
              {{ props.row.last_name ? props.row.last_name : "" }}
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-age="props">
        <q-td :props="props">
          <div class="text-caption">
            {{ calcularEdad(props.row.birthdate) }} años
          </div>
        </q-td>
      </template>
      <template  v-slot:body-cell-medallas="props">
        <q-td :props="props">
          <div v-if="props.row.participo && props.row.creados" >
            <div v-if="(props.row.participo >= 5 && props.row.creados >= 10 && props.row.participo < 10 && props.row.creados < 25) || (props.row.creados >= 25 && props.row.participo < 10 ) || (props.row.creados < 25 && props.row.participo >= 10) ">Bronce</div>
            <div v-else-if="(props.row.participo >= 10 && props.row.creados >= 25 && props.row.participo < 20 && props.row.creados < 50) || (props.row.creados >= 50 && props.row.participo < 20) || (props.row.creados < 50 && props.row.participo >= 20)">Plata</div>
            <div v-else-if="(props.row.participo >= 20 && props.row.creados >= 50 && props.row.participo < 50 && props.row.creados < 100) || (props.row.creados >= 100 && props.row.participo < 50) || (props.row.creados < 100 && props.row.participo >= 50)">Oro</div>
            <div v-else-if="props.row.participo >= 50 && props.row.creados >= 100">Platino</div>
            <div v-else >Aún no posee medalla!</div>
          </div>
          <div v-else >Aún no posee medalla</div>
        </q-td>
      </template>
      <template v-slot:body-cell-participados="props">
        <q-td :props="props">
          <div v-if="props.row.eventosAsistidos.length">{{ props.row.eventosAsistidos.length }}</div>
          <div v-else>0</div>
        </q-td>
      </template>
    </q-table>
    </div>
    </div>
</template>
<script>
import env from '../../env'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import moment from 'moment'
export default {
  components: { SideBar, RightSidebar },
  data () {
    return {
      pagination: {
        rowsPerPage: 5
      },
      users: [],
      usersByTime: [],
      usersByCreate: [],
      usersByAsist: [],
      baseuPerfil: '',
      className12: 'column items-center q-mt-xl',
      className6: 'column items-center q-mt-xl',
      columnsForTime: [
        {
          name: 'fullName',
          label: 'Usuario',
          align: 'center',
          field: 'fullName',
          sortable: true
        },
        { name: 'age', label: 'Edad', align: 'center', field: 'age' },
        {
          name: 'tiempoWeb',
          label: 'Tiempo web',
          align: 'center',
          field: 'tiempoWeb'
        }
      ],
      columnsForCreate: [
        {
          name: 'fullName',
          label: 'Usuario',
          align: 'center',
          field: 'fullName',
          sortable: true
        },
        { name: 'age', label: 'Edad', align: 'center', field: 'age' },
        { name: 'medallas', label: 'Medalla', align: 'center', field: 'medallas' },
        {
          name: 'realizados',
          label: 'Planes realizados',
          align: 'center',
          field: 'realizados'
        }
      ],
      columnsForAsist: [
        {
          name: 'fullName',
          label: 'Usuario',
          align: 'center',
          field: 'fullName',
          sortable: true
        },
        { name: 'age', label: 'Edad', align: 'center', field: 'age' },
        { name: 'medallas', label: 'Medalla', align: 'center', field: 'medallas' },
        {
          name: 'participados',
          label: 'Planes participados',
          align: 'center',
          field: 'participados'
        }
      ]
    }
  },
  async mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    await this.getUsers()
  },
  methods: {
    getTiempo (userId, index, array) {
      const tiempoEnSegundos = array[index].tiempoWeb
      const horas = Math.floor(tiempoEnSegundos / 3600)
      const minutos = Math.floor((tiempoEnSegundos % 3600) / 60)
      const segundos = Math.floor(tiempoEnSegundos % 60)
      let tiempoFormateado = `${horas}Hs ${minutos}Ms ${segundos}Sg`
      if (tiempoFormateado === 'NaNHs NaNMs NaNSg') {
        tiempoFormateado = '0Hs 0Ms 0Sg'
      }
      array[index].tiempoWeb = tiempoFormateado
    },
    async getUsers () {
      this.$api.get('all_user?order=1?creados=1?asistidos=1').then((res) => {
        if (res) {
          this.users = res
          this.usersByTime = res.usersByTime
          this.usersByCreate = res.usersByCreate
          this.usersByAsist = res.usersByAsist
          for (let i = 0; i < this.usersByTime.length; i++) {
            this.getTiempo(res.usersByTime[i]._id, i, res.usersByTime)
          }
        }
      }).catch(error => console.log(error))
    },
    calcularEdad (fecha) {
      const age = moment().diff(moment(fecha), 'years')
      return age
    }
  }
}
</script>
