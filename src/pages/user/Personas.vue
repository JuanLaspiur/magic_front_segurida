<template>
  <div class="inicio_container">
    <div class="inicio_col_left">
      <SideBar/>
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar />
      </div>
    </div>
    <div class="inicio">
      <div class="q-mb-sm q-mt-md">
        <q-select outlined dense label="Selecciona el tipo de amigo" v-model="people" :options="['Seguidos', 'No Seguidos', 'Todos los amigos']"
        @input="filterFromSelect()"/>
      </div>
      <div class="q-py-md">
        <q-input v-model="filter" dense outlined placeholder="Buscar persona..."
        @input="filterFn(filter)">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-list v-if="people.length" class="q-py-sm full-width">
        <div v-for="(item, index) of personasOrdenadas" :key="index" class="q-mb-sm" >
          <q-item clickable>
              <q-item-section avatar @click="$router.push('/muro_usuario/' + item._id)">
                <q-avatar size="50px">
                  <q-img :src="baseuPerfil + item._id" class="full-height"/>
                  <div class="absolute-bottom-right" style="margin-right: -10px">
                    <q-avatar size="30px" class="">
                      <q-img :src="item.animalInfo ? 'animales/' + item.animalInfo.img : ''" style="border-radius: 100%; height: 100%"/>
                    </q-avatar>
                  </div>
                </q-avatar>
              </q-item-section>

              <q-item-section @click="$router.push('/muro_usuario/' + item._id)">
                <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.name}} {{item.last_name}}</q-item-label>
                <q-item-label class="text-grey-7 ellipsis"><b>{{item.age}}</b> años - de <b>{{item.city_name}}</b></q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn no-caps dense :label="item.seguidoBool ? 'Seguido' : 'Seguir'" :text-color="item.seguidoBool ? 'white' : 'primary'" :color="item.seguidoBool ? 'green' : 'blue-2'" class="q-px-sm"
                @click="seguir(item)"/>
              </q-item-section>
          </q-item>
        </div>
      </q-list>
      <div v-else>
        <div v-for="(item, index) of examplePersons.slice(0,5)" :key="index" class="q-mb-sm" >
          <q-item clickable>
              <q-item-section avatar @click="$router.push('/muro_usuario/' + item._id)">
                <q-avatar size="50px">
                  <q-img :src="baseuPerfil + item._id" class="full-height"/>
                  <div class="absolute-bottom-right" style="margin-right: -10px">
                    <q-avatar size="30px" class="">
                      <q-img :src="item.animalInfo ? 'animales/' + item.animalInfo.img : ''" style="border-radius: 100%; height: 100%"/>
                    </q-avatar>
                  </div>
                </q-avatar>
              </q-item-section>

              <q-item-section @click="$router.push('/muro_usuario/' + item._id)">
                <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.name}} {{item.last_name}}</q-item-label>
                <q-item-label class="text-grey-7 ellipsis"><b>{{item.age}}</b> años - de <b>{{item.city_name}}</b></q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn no-caps dense :label="item.seguidoBool ? 'Seguido' : 'Seguir'" :text-color="item.seguidoBool ? 'white' : 'primary'" :color="item.seguidoBool ? 'green' : 'blue-2'" class="q-px-sm"
                @click="seguir(item)"/>
              </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
export default {
  components: { SideBar, RightSidebar },
  data () {
    return {
      filter: '',
      baseuPerfil: '',
      allPersonas: [],
      personas: [],
      personasOrdenadas: [],
      examplePersons: [],
      zonas: ['Todos', 'Norte', 'Sur', 'Centro', 'Este', 'Oeste'],
      people: ''
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.getPersonas()
  },
  watch: {
    personas: {
      async handler (newValue, old) {
        this.sortPersonas(newValue)
      }
    }
  },
  methods: {
    async getPersonas () {
      this.$q.loading.show({
        message: 'Buscando personas...'
      })
      await this.$api.get('no_seguidos').then(res => {
        if (res) {
          this.examplePersons = res
          const random = res.sort(() => Math.random() - 0.5)
          this.allPersonas = random
          this.personas = random
          this.$q.loading.hide()
        }
      })
    },
    async seguir (item) {
      const text = item.seguidoBool ? 'dejar de' : ''
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas ${text} seguir a ${item.name + ' ' + item.last_name}?`,
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        const data = {
          seguido: item._id
        }
        this.$api.post('seguir_user', data).then(res => {
          if (res) {
            this.getPersonas()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    filterFn (val) {
      if (val === '') {
        this.personas = this.allPersonas
      } else {
        const needle = val.toLowerCase()
        this.personas = this.allPersonas.filter(v => (v.name.toLowerCase() + (v.last_name ? ' ' + v.last_name.toLowerCase() : '')).startsWith(needle))
      }
    },
    filterZone (val) {
      if (val === 'Todos') {
        this.personas = this.allPersonas
      } else {
        this.personas = this.allPersonas.filter(v => v.zone === val)
      }
    },
    compararSeguidoBool  (a, b) {
      if (a.seguidoBool && !b.seguidoBool) {
        return -1
      } else if (!a.seguidoBool && b.seguidoBool) {
        return 1
      } else {
        return 0
      }
    },
    sortPersonas (array) {
      const newArray = [...array]
      this.personasOrdenadas = newArray.sort(this.compararSeguidoBool)
    },
    filterFromSelect () {
      if (this.people === 'Seguidos') {
        this.personasOrdenadas = [...this.personas].filter((persona) => persona.seguidoBool)
      }
      if (this.people === 'No Seguidos') {
        this.personasOrdenadas = [...this.personas].filter((persona) => !persona.seguidoBool)
      }
      if (this.people === 'Todos los amigos') {
        this.sortPersonas(this.personas)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import url(../../scss/user/Personas.scss);
  @import url(../../scss/user/Inicio.scss);
</style>
