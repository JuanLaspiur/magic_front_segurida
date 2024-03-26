<template>
  <div class="inicio_container">
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar />
      </div>
    </div>
    <div class="inicio column items-center q-py-lg">
      <q-avatar size="200px" class="bg-grey-5 q-mb-sm" style="z-index: 9; margin-bottom: 20px">
        <q-img :src="user._id ? baseuPerfil + user._id : ''" style="height: 100%"/>
        <q-badge class="bg-positive" floating style="border-radius: 100%; margin-top: 150px; width: 50px; height: 50px;"
        @click="seguir(user)">
          <div class="absolute-center">
              <q-icon :color="user.seguido ? 'white' : 'white'" size="35px" :name="user.seguido ? 'done' : 'add'"/>
          </div>
        </q-badge>
        <div class="absolute-top" style="margin-left: 75px; margin-top: -10px;">
            <q-avatar size="50px" class="">
              <q-img :src="(quedadas.length < 10 && quedadas.length >= 0 && asistidos.length < 5 && asistidos.length >= 0) || (quedadas.length >= 10 && asistidos.length < 5) || (quedadas.length < 10 && asistidos.length >= 5) ? 'cobre.jpg' : (quedadas.length >= 10 && quedadas.length < 25 && asistidos.length >= 5 && asistidos.length < 10) || (quedadas.length >= 25 && asistidos.length < 10) || (quedadas.length < 25 && asistidos.length >= 10) ? 'bronce.jpg' : (quedadas.length < 50 && quedadas.length >= 25 && asistidos.length < 20 && asistidos.length >= 10) || (quedadas.length >= 50 && asistidos.length < 20) || (quedadas.length < 50 && asistidos.length >= 20) ? 'plata.jpg' : (quedadas.length < 100 && quedadas.length >= 50 && asistidos.length < 50 && asistidos.length >= 20) || (quedadas.length >= 100 && asistidos.length < 50) || (quedadas.length < 100 && asistidos.length >= 50) ? 'oro.jpg' : quedadas.length >= 100 && asistidos.length >= 50 ? 'platino.png' : ''" style="border-radius: 100%; height: 100%"/>
            </q-avatar>
          </div>
          <div class="absolute-bottom" style="margin-left: 75px; margin-bottom: -25px;">
            <q-avatar size="50px" class="">
              <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
            </q-avatar>
          </div>
      </q-avatar>

      <q-card style="border-radius: 10px; margin-top: -50px; width: 100%">
        <div class="bg-primary" style="padding-top: 50px">
          <div class="text-h6 text-white text-center">{{user.name}} {{user.last_name}}</div>
        </div>
        <div v-if="user.quedadas && calificacion>0" class="row justify-center q-py-xs">
          <q-rating
            v-model="calificacion"
            readonly
            size="2em"
            color="orange"
            icon="star"
          />
          <q-tooltip  content-style="font-size: .8rem" :offset="[10, 10]">
            Calificación {{calificacion}} estrellas <br/>
            **Nota: Para obtener calificación debes crear un plan.
          </q-tooltip>
        </div>
        <div class="q-px-md q-py-md">
          <div class="row justify-between">
            <div>
              <div class="row text-grey-8">
                <div class="text-bold q-pr-xs">Edad:</div>
                <div>{{user.age}} años</div>
              </div>
              <div class="row text-grey-8">
                <div class="text-bold q-pr-xs">Género:</div>
                <div>{{user.gender}}</div>
              </div>
            </div>
            <div class="text-grey-8 " v-if="user.comunidad">
              <div class="text-bold">Comunidad autónoma natal:</div>
              <div>{{user.comunidad}}</div>
            </div>
          </div>
          <div class="text-grey-8" v-if="user.description">
            <div class="row items-center">
              <div class="q-pr-sm"><b>Descripción: </b>{{user.description}}</div>
            </div>
          </div>
          <div class="text-grey-8" v-if="user.peliculas">
            <div class="row items-center">
              <div class="q-pr-sm"><b>Películas favoritas: </b>{{user.peliculas}}</div>
            </div>
          </div>
          <div class="text-grey-8" v-if="user.artista">
            <div class="row items-center">
              <div class="q-pr-sm"><b>Artista y estilo musical favorito: </b>{{user.artista}}</div>
            </div>
          </div>
          <div class="text-grey-8" v-if="user.deportes">
            <div class="row items-center">
              <div class="q-pr-sm"><b>Deportes favoritos: </b>{{user.deportes}}</div>
            </div>
          </div>
        </div>
        <q-separator inset />
        <div class="row justify-center">
          <div class="text-center q-pt-sm q-pr-sm">
            <div class="text-caption text-grey-7 text-bold">Publicaciones</div>
            <div class="text-h6 text-grey-7">{{publicaciones.length}}</div>
          </div>
          <q-separator vertical />
          <div class="text-center q-px-md q-pt-sm" @click="$router.push('/seguidores/' + user._id)">
            <div class="text-caption text-grey-7 text-bold">Seguidores</div>
            <div class="text-h6 text-grey-7">{{seguidores}}</div>
          </div>
          <q-separator vertical />
          <div class="text-center q-pt-sm q-pl-sm" @click="$router.push('/seguidos/' + user._id)">
            <div class="text-caption text-grey-7 text-bold">Seguidos</div>
            <div class="text-h6 text-grey-7">{{seguidos}}</div>
          </div>
        </div>
      </q-card>

      <q-card class="q-my-md" style="border-radius: 10px; width:100%">
        <div class="bg-primary q-py-sm">
          <div class="text-bold text-white text-center">Planes</div>
        </div>
        <div class="row justify-around q-pa-sm">
          <q-img :src="(quedadas.length < 10 && quedadas.length >= 0 && asistidos.length < 5 && asistidos.length >= 0) || (quedadas.length >= 10 && asistidos.length < 5) || (quedadas.length < 10 && asistidos.length >= 5) ? 'cobre.jpg' : (quedadas.length >= 10 && quedadas.length < 25 && asistidos.length >= 5 && asistidos.length < 10) || (quedadas.length >= 25 && asistidos.length < 10) || (quedadas.length < 25 && asistidos.length >= 10) ? 'bronce.jpg' : (quedadas.length < 50 && quedadas.length >= 25 && asistidos.length < 20 && asistidos.length >= 10) || (quedadas.length >= 50 && asistidos.length < 20) || (quedadas.length < 50 && asistidos.length >= 20) ? 'plata.jpg' : (quedadas.length < 100 && quedadas.length >= 50 && asistidos.length < 50 && asistidos.length >= 20) || (quedadas.length >= 100 && asistidos.length < 50) || (quedadas.length < 100 && asistidos.length >= 50) ? 'oro.jpg' : quedadas.length >= 100 && asistidos.length >= 50 ? 'platino.png' : ''" class="q-mr-xs" style="height: 28px; width: 28px"/>
        </div>
        <div class="row justify-around q-pa-sm">
          <div style="width: 45%" class="row items-center justify-center text-center q-pr-sm">
            <div class="text-caption text-grey-7 text-bold q-px-sm">Planes <br> creados</div>
            <div class="text-h6 text-grey-7">{{quedadas.length}}</div>
          </div>
          <q-separator vertical />
          <div style="width: 45%" class="row items-center justify-center text-center q-pl-sm" @click="$router.push('/asistidos')">
            <div class="text-caption text-grey-7 text-bold q-px-sm">Planes <br> participados</div>
            <div class="text-h6 text-grey-7">{{asistidos.length}}</div>
          </div>
        </div>
      </q-card>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Planes activos</div>
        <div v-if="!activos.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes activos</div>
        <q-scroll-area v-else class="q-mb-xl" horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <CardPlan
            v-for="(item, index) in activos" :key="index"
            :thumbStyleScroll=null
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="logueado"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Planes organizados</div>
        <div v-if="!quedadas.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes actualmente</div>
        <q-scroll-area class="q-mb-xl" v-else horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <CardPlan
            v-for="(item, index) in quedadas" :key="index"
            :thumbStyleScroll=null
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="logueado"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Planes asistidos</div>
        <div class="q-px-md text-caption text-grey-8">Historial de eventos asistidos</div>
        <div v-if="!asistidos.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes asistidos</div>
        <q-scroll-area class="q-mb-xl" v-else horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <CardPlan
            v-for="(item, index) in asistidos" :key="index"
            :thumbStyleScroll=null
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="logueado"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <q-list class="full-width">
        <div class="text-h5 text-bold text-grey-8">Publicaciones</div>
        <div v-if="!publicaciones.length" class="text-center q-py-lg">No hay publicaciones actualmente</div>
        <div v-for="(item, index) of publicaciones" :key="index" class="q-pt-md" >
          <q-item class="column" @click="publicidadSelec = item, item.totalReacciones > 0 ? verPublicacion = true : ''" clickable>
            <q-item class="q-pa-none q-mb-md">
              <q-item-section avatar>
                <q-avatar size="50px">
                  <q-img :src="user._id ? baseuPerfil + user._id : ''" class="full-height"/>
                  <div class="absolute-bottom-right" style="margin-right: -10px">
                    <q-avatar size="30px" class="">
                      <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                    </q-avatar>
                  </div>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1 text-bold">{{user.name}} {{user.last_name}}</q-item-label>
                <q-item-label class="text-grey">{{item.date}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item-section class="q-mb-sm">
              <q-item-label class="text-grey-8" lines="3">{{item.description}}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-pl-sm">
            <q-btn flat dense no-caps color="primary" icon="pets" label="Reacciones"
            @click="publicidadSelec = item, verReacciones = true">
              <q-badge v-if="item.totalReacciones > 0" outline color="primary" floating transparent>
                {{item.totalReacciones}}
              </q-badge>
            </q-btn>
          </div>
          <q-separator color="grey" class="q-mx-md q-mb-sm"/>
        </div>
      </q-list>
      <q-page-sticky v-if="showChat" position="bottom-right" :offset="[10, 25]">
        <q-btn round flat size="25px" color="white" style="background: linear-gradient(to top, #0065d8, #d80048);"
        @click="goChat()">
          <q-avatar size="42px">
            <img src="chat3 2.png">
          </q-avatar>
        </q-btn>
      </q-page-sticky>

      <q-dialog v-model="verPublicacion">
        <q-card class="q-pa-sm" style="width:100%">
          <div class="text-center text-h6 q-pb-sm">Reacciones de la publicación</div>
          <div class="row justify-around">
            <q-avatar v-for="(item, index) of publicidadSelec.reacciones" :key="index" size="90px" clickable v-ripple>
              <img :src="'animales/' + item.img" style="border-radius: 100%; height:100%" />
              <q-badge color="primary" floating transparent>
                {{item.total}}
              </q-badge>
            </q-avatar>
          </div>
        </q-card>
      </q-dialog>

      <q-dialog v-model="verReacciones">
        <q-card class="q-pa-sm" style="width:100%">
          <div class="text-center text-h6 q-pb-sm">Reacciona con estos</div>
          <div class="row justify-around">
            <q-avatar v-for="(item, index) of animales" :key="index" size="90px" clickable v-ripple
            @click="reaccionar(item)">
              <img :src="'animales/' + item.img" style="border-radius: 100%; height:100%" />
            </q-avatar>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import CardPlan from '../../components/CardPlan.vue'
export default {
  components: { SideBar, RightSidebar, CardPlan },
  data () {
    return {
      verReacciones: false,
      verPublicacion: false,
      description: false,
      baseuPerfil: '',
      baseuQuedada: '',
      buscar: '',
      seguidores: 0,
      seguidos: 0,
      calificacion: 0,
      user: {},
      logueado: {},
      publicidadSelec: {},
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      quedadas: [],
      asistidos: [],
      activos: [],
      animales: [],
      publicaciones: [],
      showChat: false
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getUserById(this.$route.params.id)
    this.getlogueado()
    this.getAnimales()
    this.getQuedadas(this.$route.params.id)
    this.getSeguidoresSeguidos(this.$route.params.id)
    this.getPublicaciones(this.$route.params.id)
    this.getCalificacion(this.$route.params.id)
    this.followsVerificator(this.$route.params.id)
  },
  methods: {
    getlogueado () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.logueado = res
        }
      })
    },
    getUserById (id) {
      this.$api.get('user_by_id/' + id).then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    getCalificacion (id) {
      this.$api.get('calificacion/' + id).then(v => {
        if (v) {
          this.calificacion = v
        }
      })
    },
    getAsistidos (id) {
      this.$api.get('evetos_asistidos/' + id).then(v => {
        if (v) {
          this.getActivos(this.$route.params.id)
          this.asistidos = v
        }
      })
    },
    getActivos (id) {
      this.$api.get('evetos_activos/' + id).then(v => {
        if (v) {
          this.activos = v
        }
      })
    },
    getPublicaciones (id) {
      this.$api.get('publications_user/' + id).then(res => {
        if (res) {
          this.publicaciones = res
        }
      })
    },
    async getAnimales () {
      await this.$api.get('animales').then(res => {
        if (res) {
          this.animales = res
        }
      })
    },
    getSeguidoresSeguidos (id) {
      this.$api.get('seguidores_seguidos/1/' + id).then(res => {
        if (res) {
          this.seguidores = res.length
        }
      })
      this.$api.get('seguidores_seguidos/2/' + id).then(res => {
        if (res) {
          this.seguidos = res.length
        }
      })
    },
    getQuedadas (id) {
      this.$api.get('quedadas_user/' + id).then(res => {
        if (res) {
          this.getAsistidos(this.$route.params.id)
          this.quedadas = res
        }
      })
    },
    reaccionar (data) {
      this.$q.loading.show({})
      this.$api.post('reaccionar/' + this.publicidadSelec._id, data).then(res => {
        if (res) {
          this.getPublicaciones(this.$route.params.id)
          this.verReacciones = false
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async seguir (item) {
      const text = item.seguido ? 'dejar de' : ''
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas ${text} seguir a ${item.name + ' ' + (item.last_name ? item.last_name : '')}?`,
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'positive' },
        persistent: true
      }).onOk(() => {
        const data = {
          seguido: item._id
        }
        this.$api.post('seguir_user', data).then(res => {
          if (res) {
            this.getUserById(this.$route.params.id)
            this.getSeguidoresSeguidos(this.$route.params.id)
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    asistir (data, bool) {
      const text = bool ? 'asistir a' : 'cancelar para'
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas ' + text + ' este evento?',
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.$api.post('asistir/' + data._id, { asistencia: bool }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Podras ver tus quedadas en el modulo de Asistidos',
              color: 'positive'
            })
            this.getQuedadas(this.$route.params.id)
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    followsVerificator (id) {
      this.$api.get('follow_verificator/' + id).then(res => {
        if (res.status === 200) {
          this.showChat = true
        }
      }).catch((error) => console.log(error, 'error'))
    },
    goChat () {
      this.$api.post('chat_privado/' + this.user._id).then(res => {
        if (res) {
          this.$router.push('/chat/' + res._id)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import url(../../scss/user/Inicio.scss);
</style>
