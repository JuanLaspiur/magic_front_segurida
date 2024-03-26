<template>
  <div class="inicio_container ">
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar />
      </div>
    </div>
    <div class="inicio">
      <div class="text-grey-8 text-h6 q-pa-sm">Búsqueda de Planes</div>
      <div class="q-px-md q-pb-md busquedas_planes">
        <div class=" col-5 full-width">
              <q-select outlined dense label="Zona" v-model="objectFilter.zone" :options="['Norte', 'Sur', 'Centro', 'Este', 'Oeste', 'Todas']"/>
        </div>
      </div>
      <div class="q-px-md row items-center" style="width:100%">
          <q-select outlined dense label="Selecciona las categorias" v-model="catSelected" :options="categorias"
          option-label="name" map-options multiple hide-selected class="col">
              <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label v-html="scope.opt.name"/>
                        <q-item-label class="text-grey-7">{{scope.opt.description}}</q-item-label>
                      </q-item-section>
                  </q-item>
              </template>
          </q-select>
          <div class="q-pl-sm">
              <q-btn rounded dense no-caps :loading="loading" color="primary" label="Buscar" class="q-px-sm" @click="filtrar()"/>
          </div>
      </div>
      <q-scroll-area horizontal class="q-mt-md" style="height: 30px; width: 100%;" :thumb-style="thumbStyle">
        <div class="row items-center no-wrap q-px-md">
          <div class="q-pr-sm" v-for="(item, index) in catSelected" :key="index">
              <q-chip
                  removable
                  dense
                  truncate
                  @remove="deletCat(item)"
                  color="primary"
                  text-color="white"
                  class="q-ma-none"
              >
                  {{ item.name }}
              </q-chip>
          </div>
        </div>
      </q-scroll-area>
      <div class="text-grey-8 text-bold q-pa-sm">Resultados de la búsqueda</div>
      <ContainerAll
        :chunck="quedadas"
        :thumbStyleScroll="null"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        v-if="quedadas.length"
        />
      <div v-else class="text-center q-py-lg">No hay resultados</div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import ContainerAll from '../../components/ContainerAll.vue'
export default {
  components: { SideBar, RightSidebar, ContainerAll },
  data () {
    return {
      loading: false,
      baseuQuedada: '',
      baseuPerfil: '',
      user: {},
      objectFilter: {
        zone: '',
        minimo: null,
        maximo: null,
        categorias: []
      },
      thumbStyle: {
        right: '5px',
        borderRadius: '50px',
        backgroundColor: '#027be3',
        width: '8px',
        opacity: 0
      },
      thumbStyle2: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      catSelected: [],
      allQuedadas: [],
      quedadas: [],
      categorias: []
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getUser()
    this.getQuedadas()
    this.getCategories()
    if (this.$route.params.obj) {
      this.objectFilter = JSON.parse(this.$route.params.obj)
      this.filtrar()
    }
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    getCategories () {
      this.$api.get('categories').then(res => {
        if (res) {
          this.categorias = res.filter(v => v.id !== 8)
        }
      })
    },
    getQuedadas () {
      this.$api.get('all_quedadas').then(res => {
        if (res) {
          this.allQuedadas = res.map(e => e)
          this.quedadas = res.map(e => e)
        }
      })
    },
    asistir (data, bool) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas asistir a este evento?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.post('asistir/' + data._id, { asistencia: bool }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Podras ver tus quedadas en el modulo de Asistidos',
              color: 'positive'
            })
            this.getQuedadas()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    deletCat (cat) {
      this.catSelected = this.catSelected.filter(v => v._id !== cat._id)
    },
    filtrar () {
      this.loading = true
      const filtrado = {
        zone: this.objectFilter.zone === 'Todas' ? '' : this.objectFilter.zone,
        minimo: this.objectFilter.minimo ? this.objectFilter.minimo : null,
        maximo: this.objectFilter.maximo ? this.objectFilter.maximo : null,
        categorias: this.catSelected
      }
      this.$api.post('filtrar', filtrado).then(res => {
        if (res) {
          this.quedadas = res
          this.loading = false
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .bordes {
    border: 3px solid $accent;
  }
  @import url(../../scss/user/Planes.scss);
  @import url(../../scss/user/Inicio.scss);
</style>
