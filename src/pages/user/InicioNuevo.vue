<template>
  <div class="inicio_container q-px-sm">
    <div class="inicio q-my-md items-center justify-center">
      <div
        v-if="width < 500"
        class="shadow-1"
        style="
          border-radius: 10px;
          overflow: hidden;
          height: 200px;
          width: 100%;
        "
      >
        <q-carousel
          infinite
          :autoplay="true"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-type="flat"
          control-color="primary"
          v-model="slide"
          height="300px"
          v-if="tabloide.length > 0"
          style="width: 100%; height: 100%"
        >
          <q-carousel-slide
            @click="
              () => {
                openTabloide(t._id), irRuta(t.redirect)
              }
            "
            v-for="(t, index) of tabloide"
            :key="index"
            :name="index"
            :img-src="t.img ? baseuTabloide + t.img[0] : ''"
            class="verQuedada_carousel shadow-1 pointer"
            style="background-size: cover; background-repeat: no-repeat"
          >
            <div
              class="absolute-bottom full-height custom-caption column items-center justify-center"
              style="width: 100%; height: 100%"
            >
              <div class="text-h2">{{ t.name }}</div>
              <div class="text-subtitle1 text-wrap q-px-lg">
                {{ t.description }}
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div
        v-else
        class="shadow-1"
        style="border-radius: 10px; overflow: hidden"
      >
        <q-carousel
          infinite
          :autoplay="true"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-type="flat"
          control-color="primary"
          v-model="slide"
          height="300px"
          v-if="tabloide.length > 0"
        >
          <q-carousel-slide
            @click="
              () => {
                openTabloide(t._id), irRuta(t.redirect)
              }
            "
            v-for="(t, index) of tabloide"
            :key="index"
            :name="index"
            :img-src="t.img ? baseuTabloide + t.img[0] : ''"
            class="verQuedada_carousel shadow-1 pointer"
          >
            <div
              class="absolute-bottom full-height custom-caption column items-center justify-center"
            >
              <div class="text-h2">{{ t.name }}</div>
              <div class="text-subtitle1 text-wrap q-px-lg">
                {{ t.description }}
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <!-- Planes premiums -->
      <div class="text-grey-10 q-mt-md text-h6 q-py-sm text-bold q-pl-sm">
        Planes premiums
      </div>
      <div
        v-if="allQuedadasPremium.length && width < 500"
        class="q-mt-xs"
        style="margin-bottom: 10px"
      >
        <ContainerCards
          :chunck="allQuedadasPremium"
          :thumbStyleScroll="null"
          :baseuQuedada="baseuQuedada"
          :baseuPerfil="baseuPerfil"
          :user="user"
        />
      </div>
      <!-- Carousel de Cards de Ultimos planes agregados en modo tablet y PC -->
      <CarouselForLastPlans
        :chunck="chunckForPremium"
        :thumbStyleScroll="thumbStyleScroll"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        v-else-if="allQuedadasPremium.length && width >= 500"
      />
      <!-- Aviso si NO hay planes -->
      <div v-else class="text-center q-py-lg">No hay planes disponibles</div>
      <!-- Buscar un plan cercano -->
      <div class="text-grey-10 text-h6 q-py-sm q-pl-sm text-bold">
        Busca un plan cercano a ti
      </div>
      <div class="q-mb-sm q-mt-md q-px-sm">
        <q-select
          outlined
          dense
          label="Selecciona la zona donde quieres buscar"
          v-model="objectFilter.zone"
          :options="['Todas', 'Norte', 'Sur', 'Centro', 'Este', 'Oeste']"
          @input="filtrar()"
        />
      </div>
      <div class="text-grey-8 text-h7 q-mt-md q-pl-sm">
        Selecciona la categoría
      </div>
      <q-scroll-area
        :thumb-style="thumbStyleScroll"
        horizontal
        class="q-mt-sm row"
        style="height: 180px; width: 100%"
      >
        <div class="row items-start no-wrap">
          <div
            style="width: 80px"
            class="q-pr-sm q-mx-sm column"
            v-for="(item, index) in categorias"
            :key="index"
          >
            <q-avatar
              :title="item.name"
              tooltip-dir="left"
              :color="
                objectFilter.category
                  ? objectFilter.category.id === item.id
                    ? 'white'
                    : 'black'
                  : 'black'
              "
              :text-color="
                objectFilter.category
                  ? objectFilter.category.id === item.id
                    ? 'black'
                    : 'white'
                  : 'white'
              "
              size="80px"
              font-size="50px"
              class="bordes cursor-pointer"
              v-ripple
              @click=";(objectFilter.category = item), filtrar()"
            >
              <q-img class="absolute-center" :src="'categorias/' + item.icon" />
            </q-avatar>
            <div class="text-caption text-center">{{ item.name }}</div>
          </div>
        </div>
      </q-scroll-area>
      <EncuestaUsuario
        :ultimaEncuesta="ultimaEncuesta"
        :user="user"
        v-if="isAnchoSuficiente"
        style="max-width: 300px; width: max-content; margin: auto"
      />
      <!-- Aqui estan las cards resultantes del filtrado por zona en el contenedor Responsive -->
      <div class="text-grey-10 text-h6 q-py-sm q-pl-sm text-bold">
        Proximos planes
      </div>
      <ContainerAll
        :chunck="buscadas.slice(0, 8)"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        :thumbStyle="thumbStyle"
        v-if="buscadas.length"
      />
      <div v-else class="text-center q-py-lg">No hay resultados</div>
      <div style="display: flex; justify-content: center; align-items: center">
        <q-btn
          @click="$router.push('/planes')"
          color="primary"
          style="padding: 4px"
          >Ver todos los planes</q-btn
        >
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
          margin-bottom: 50px;
        "
      >
        <div>
          <!--  q-card style="padding: 0px 20px 10px 20px; border-radius: 5px">
            <q-card-section class="q-pa-md">
              <h5 style="text-align: center; margin-bottom: 20px">
                {{ ultimaEncuesta.pregunta }}
              </h5>
              <div>
                <div
                  v-for="(opcion, index) in opcionesUltimaEncuesta"
                  :key="index"
                >
                  <input
                    type="radio"
                    :id="'opcion_' + index"
                    :value="opcion._id"
                    v-model="opcionSeleccionada"
                    @change="actualizarSeleccion(index)"
                  />
                  <label :for="'opcion_' + index">{{ opcion.texto }}</label>
                </div>
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                color="primary"
                label="Enviar"
                @click="enviarEncuesta(opcionSeleccionada)"
              ></q-btn>
            </q-card-actions>
          </q-card> -->
        </div>
      </div>
      <div
        v-if="width < 500"
        class="row q-mt-xl justify-center items-center cursor-pointer shadow-1 inicio_banner"
        style="
          border-radius: 10px;
          overflow: hidden;
          height: 140px;
          width: 100%;
        "
      >
        <img
          src="banner_prueba.png"
          style="width: 100%; height: 100%; object-fit: cover"
          @click="irRuta('http://www.ultrareformas.es/')"
        />
      </div>
      <div
        v-else
        class="row justify-center items-center q-mt-xl cursor-pointer shadow-1 inicio_banner"
        style="border-radius: 10px; overflow: hidden"
      >
        <img
          src="banner_prueba.png"
          style="width: 100%"
          @click="irRuta('http://www.ultrareformas.es/')"
        />
      </div>
      <div class="text-grey-10 text-h6 q-mt-md q-pa-sm text-bold">
        Últimos planes agregados
      </div>
      <!-- Cards de Ultimos planes agregados en modo responsive para celulares -->
      <div
        v-if="quedadas.length && width < 500"
        class="q-mt-sm"
        style="margin-bottom: 10px"
      >
        <ContainerAll
          :chunck="quedadas"
          :thumbStyleScroll="null"
          :baseuQuedada="baseuQuedada"
          :baseuPerfil="baseuPerfil"
          :user="user"
        />
        <div class="fit row justify-evenly q-px-sm q-py-sm"></div>
      </div>
      <CarouselWithoutImg
        :chunck="chunck"
        :thumbStyleScroll="thumbStyleScroll"
        :baseuQuedada="baseuQuedada"
        :baseuPerfil="baseuPerfil"
        :user="user"
        v-else-if="quedadas.length && width >= 500"
      />
      <!-- Aviso si NO hay planes -->
      <div v-else class="text-center q-py-lg">No hay planes agregados</div>
      <div class="plan_button">
        <div class="text-grey-10 text-h6 q-py-sm text-bold">Crea un Plan</div>
        <div class="full-width row justify-center q-mb-xl">
          <q-btn
            v-if="user.quedadas"
            no-caps
            @click="$router.push('/nueva_quedada')"
            color="primary"
            class="text-h6"
            style="width: 95%; border-radius: 10px; margin: 0"
            >Nuevo plan</q-btn
          >
        </div>
      </div>
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar />
      </div>
    </div>

    <div class="inicio_col_left">
      <SideBar :ultimaEncuesta="ultimaEncuesta" />
      <EncuestaUsuario
        :ultimaEncuesta="ultimaEncuesta"
        :user="user"
        style="position: fixed; top: 70%"
      />
    </div>

    <!-- Corregir -->
    <ContenedorComponentes v-if="tutorial" :user="user" :key="tutorial" />
  </div>
</template>

<script>
import env from '../../env'
import { openURL, Platform } from 'quasar'
import { mapMutations } from 'vuex'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import CarouselForLastPlans from '../../components/CarouselForLastPlans.vue'
import CarouselWithoutImg from '../../components/CarouselWithoutImg.vue'
import ContainerCards from '../../components/ContainerCards.vue'
import ContainerAll from '../../components/ContainerAll.vue'
import EncuestaUsuario from '../../components/EncuestaUsuario.vue'
import ContenedorComponentes from '../../components/Tutorial/ContenedorComponentes'

export default {
  components: {
    SideBar,
    RightSidebar,
    CarouselForLastPlans,
    ContainerCards,
    ContainerAll,
    CarouselWithoutImg,
    EncuestaUsuario,
    ContenedorComponentes
  },
  data () {
    return {
      autoplay: true,
      perfile: null,
      seguidores: 0,
      seguidos: 0,
      description: false,
      publicaciones: [],
      calificacion: 0,
      tabloide: [],
      baseuTabloide: '',
      baseuQuedada: '',
      baseuPerfil: '',
      user: {},
      objectFilter: {
        category: null,
        zone: ''
      },
      thumbStyle: {
        right: '5px',
        borderRadius: '50px',
        backgroundColor: '#027be3',
        width: '8px',
        opacity: 0
      },
      thumbStyleScroll: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      allQuedadas: [],
      allQuedadasPremium: [],
      quedadas: [],
      buscadas: [],
      categorias: [],
      allChats: [],
      chats: [],
      chunck: [],
      chunckForBuscadas: [],
      chunckForPremium: [],
      width: '',
      height: '',
      tabloideForShow: [],
      slide: 1,
      indiceEncuestaActual: 0,
      ultimaEncuesta: [],
      opcionesUltimaEncuesta: [],
      opcionSeleccionada: null,
      tutorial: false
    }
  },
  computed: {
    isAnchoSuficiente () {
      return window.innerWidth <= 1080
    }
  },
  async mounted () {
    this.tabloide = await this.$api.get('tabloide')
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.baseuTabloide = env.apiUrl + 'tabloide_img/'
    await this.getUser()
    await this.getQuedadas()
    await this.getQuedadasPremiums()
    await this.getCategories()
    await this.getChats()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.objectFilter.zone = 'Todas'
    console.log(Platform, 'Platform')
    this.obtenerUltimaEncuesta()
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    quedadas: {
      async handler (newValue, old) {
        await this.chunckFromArray(newValue, 2)
      }
    },
    allQuedadasPremium: {
      async handler (newValue, old) {
        await this.chunckFromArrayPremium(newValue, 2)
      }
    },
    allQuedadas: {
      handler (newValue, old) {
        this.filtrar()
      }
    },
    buscadas: {
      async handler (newValue, old) {
        await this.chunckFromArrayBuscadas(newValue, 2)
      }
    },
    chunckForPremium: {
      handler (newValue, old) {
        console.log(newValue, 'NV')
      }
    },
    'user.tutorial': {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue === false) {
          this.tutorial = true
        }
      }
    },
    width: {
      async handler (newValue, old) {
        if (this.width < 800) {
          this.chunck = []
          this.chunckForBuscadas = []
          this.chunckForPremium = []
          this.chunckFromArray(this.quedadas, 1)
          this.chunckFromArrayBuscadas(this.buscadas, 1)
          this.chunckFromArrayPremium(this.allQuedadasPremium, 1)
        } else {
          this.chunck = []
          this.chunckForBuscadas = []
          this.chunckForPremium = []
          this.chunckFromArray(this.quedadas, 2)
          this.chunckFromArrayBuscadas(this.buscadas, 2)
          this.chunckFromArrayPremium(this.allQuedadasPremium, 2)
        }
      }
    }
  },
  methods: {
    isTutorial () {
      if (this.user.tutorial === false) {
        this.tutorial = false
      }
    },
    ...mapMutations('generals', ['logout']),
    test () {
      this.$api.get('user_info2').then(res => {
        if (res) {
          alert('enviado')
        }
      })
    },
    getChats () {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('all_chats').then(res => {
        if (res) {
          this.allChats = res
          this.chats = res
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
          this.isTutorial()
        }
      })
    },
    getCategories () {
      this.$api.get('categories').then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    getQuedadas () {
      this.$api.get('all_quedadas').then(res => {
        if (res) {
          this.allQuedadas = res
          this.quedadas = res
        }
      })
    },
    getQuedadasPremiums () {
      this.$api.get('all_quedadas_premium').then(res => {
        if (res) {
          this.allQuedadasPremium = res
        }
      })
    },
    irRuta (ruta) {
      openURL(ruta)
    },
    filtrar () {
      if (this.objectFilter.zone && this.objectFilter.category) {
        if (
          this.objectFilter.category.id === 8 &&
          this.objectFilter.zone === 'Todas'
        ) {
          this.buscadas = this.allQuedadas.map(e => e)
        } else if (
          this.objectFilter.category.id === 8 &&
          this.objectFilter.zone !== 'Todas'
        ) {
          this.buscadas = this.allQuedadas.filter(
            v => v.zone === this.objectFilter.zone
          )
        } else if (
          this.objectFilter.category.id !== 8 &&
          this.objectFilter.zone === 'Todas'
        ) {
          this.buscadas = this.allQuedadas.filter(
            v => v.category === this.objectFilter.category._id
          )
        } else {
          this.buscadas = this.allQuedadas.filter(
            v =>
              v.category === this.objectFilter.category._id &&
              v.zone === this.objectFilter.zone
          )
        }
      } else if (this.objectFilter.zone && !this.objectFilter.category) {
        if (this.objectFilter.zone === 'Todas') {
          this.buscadas = this.allQuedadas?.map(e => e)
        } else {
          this.buscadas = this.allQuedadas.filter(
            v => v.zone === this.objectFilter.zone
          )
        }
      } else if (!this.objectFilter.zone && this.objectFilter.category) {
        if (this.objectFilter.category.id === 8) {
          this.buscadas = this.allQuedadas.map(e => e)
        } else {
          this.buscadas = this.allQuedadas.filter(
            v => v.category === this.objectFilter.category._id
          )
        }
      }
    },
    chunckFromArray (array, size) {
      const newArray = [...array]
      for (let i = 0; i < newArray.length; i += size) {
        this.chunck.push(newArray.slice(i, i + size))
      }
    },
    chunckFromArrayBuscadas (array, size) {
      const newArray = [...array]
      for (let i = 0; i < newArray.length; i += size) {
        this.chunckForBuscadas.push(newArray.slice(i, i + size))
      }
    },
    chunckFromArrayPremium (array, size) {
      const newArray = [...array]
      for (let i = 0; i < newArray.length; i += size) {
        this.chunckForPremium.push(newArray.slice(i, i + size))
      }
    },
    handleResize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    openTabloide (id) {
      this.$api.put(`view_tabloide/${id}`).then(res => {
        if (res) {
          console.log(res)
        }
      })
    },
    siguienteEncuesta () {
      this.indiceEncuestaActual =
        (this.indiceEncuestaActual + 1) % this.encuestas.length
    },
    obtenerUltimaEncuesta () {
      this.$api
        .get('/encuestas-admin')
        .then(response => {
          // Asignar la última encuesta a ultimaEncuesta
          this.ultimaEncuesta =
            response.length > 0 ? response[response.length - 1] : []

          // Llamar a obtenerOpcionesEncuesta dentro de la promesa
          this.obtenerOpcionesEncuesta(this.ultimaEncuesta._id)
        })
        .catch(error => {
          console.error('Error al obtener todas las encuestas:', error)
        })
    },
    obtenerOpcionesEncuesta (enuestaId) {
      this.$api
        .get('opciones_admin123/id/' + enuestaId)
        .then(response => {
          // Asignar la última encuesta a ultimaEncuesta
          this.opcionesUltimaEncuesta = response
        })
        .catch(error => {
          console.error('Error al obtener todas las opciones:', error)
        })
    },
    actualizarSeleccion (index) {
      // Desmarcar todas las opciones
      this.opcionesUltimaEncuesta.forEach((opcion, i) => {
        if (i !== index) {
          opcion.seleccionada = false
        }
      })
    },
    enviarEncuesta (idOpcion) {
      const data = {
        opcionId: idOpcion,
        usuarioId: this.user._id
      }
      this.$api
        .post('opciones_admin123/votar', data)
        .then(response => {
          this.opcionesUltimaEncuesta = response.data
          this.$q.notify({
            message: 'Encuesta enviada',
            color: 'positive'
          })
        })
        .catch(error => {
          console.error('Error al enviar la encuesta:', error)
          alert('No se pudo enviar su respuesta.. intente más tarde')
        })
    },
    isRespondioTrue () {
      if (!this.opcionesUltimaEncuesta) {
        return false
      }

      for (const option of this.opcionesUltimaEncuesta) {
        console.error(option.usuario_ids)
        if (option.usuario_ids) {
          const usuarioIds = option.usuario_ids
            .replace(/["[\]]/g, '')
            .split(',')
          console.error('Usuarios filtrados  ' + usuarioIds)
          if (usuarioIds.includes(this.user_id)) {
            console.log('Respuesta es true')
            return true
          }
        }
      }

      console.log('Respuesta es false')

      if (!this.isRespondioTrue) {
        this.obtenerUltimaEncuesta()
      }

      return false
    }
  }
}
</script>
<style scoped lang="scss">
.bordes {
  border: 3px solid $accent;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.plan_button {
  display: inline;
  @media (min-width: 1080px) {
    display: none;
  }
}
.ocultar {
  opacity: 0;
}

@import url(../../scss/user/Inicio.scss);
</style>

/*Falta hacer que cuando se envie la respuesta, se muestre gracias por su
respuesta. */
