<template >
  <div>
    <div v-if="!muro" class="inicio_perfil">
        <q-avatar size="200px" class="bg-grey-5 q-mb-sm" style="z-index: 9">
          <q-img :src="user._id ? baseuPerfil + user._id : ''" style="height: 100%"/>
          <q-badge class="bg-transparent" floating style="border-radius: 100%; margin-top: 140px; width: 70px; height: 70px;">
          </q-badge>
          <div class="absolute-top" style="margin-left: -40px">
            <q-avatar size="100px" class="">
              <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
            </q-avatar>
          </div>
        </q-avatar>

        <q-card style="border-radius: 10px; margin-top: -50px; width:100%">
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
              **Nota: La calificación es otorgada por los participantes de un plan creado por ti.
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
              <div class="text-grey-8" v-if="user.comunidad">
                <div class="text-bold">Comunidad autónoma natal:</div>
                <div>{{user.comunidad}}</div>
              </div>
            </div>
            <div class="text-grey-8" v-if="user.description">
              <div class="row items-center">
                <div class="q-pr-sm"><b>Descripción: </b>{{user.description}}</div>
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
      </div>

      <q-card style="width:350px; height: 300px; border-radius: 10px;" class="q-my-lg  inicio_chat">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Mis Ultimas Conversaciones</div>
        </q-card-section>

        <q-card-actions class="q-pa-none" vertical align="left">
          <div v-if="chats.length" class="full-width">
            <q-scroll-area
              :thumb-style="thumbStyleScroll"
              style="height: 230px; width: 350px;"
            >
              <div v-for="(item, index) of chatsSorted" :key="index" class="q-mb-sm" >
                    <q-item  clickable v-ripple @click="$router.push('/chat/' + item._id)">
                        <q-item-section avatar>
                          <q-avatar size="50px">
                            <q-img :src="item.privado ? baseuPerfil + item.user_principal : baseuQuedada + item.evento_id" class="full-height"/>
                            </q-avatar>
                        </q-item-section>

                        <q-item-section >
                            <q-item-label class="text-subtitle1 text-bold ellipsis-2-lines">{{item.full_name}}</q-item-label>
                            <q-item-label class="text-grey-7 ellipsis">{{item.last_message}}</q-item-label>
                        </q-item-section>
                    </q-item>
              </div>
            </q-scroll-area>
          </div>
        </q-card-actions>
      </q-card>
  </div>
</template>
<script>
import env from '../../env'
import { mapMutations } from 'vuex'
export default {
  name: 'RightSidebar',
  props: {
    muro: Boolean
  },
  data () {
    return {
      thumbStyleScroll: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      slide: 1,
      autoplay: true,
      perfile: null,
      seguidores: 0,
      seguidos: 0,
      description: false,
      publicaciones: [],
      calificacion: 0,
      tabloide: null,

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
      allQuedadas: [],
      quedadas: [],
      buscadas: [],
      categorias: [],
      allChats: [],
      chats: [],
      chatsSorted: []
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.baseuTabloide = env.apiUrl + 'tabloide_img/'
    this.getUser()
    this.getQuedadas()
    this.getChats()
  },
  watch: {
    chats: {
      handler (newValue, old) {
        this.sortChats(newValue)
      }
    }
  },
  methods: {
    ...mapMutations('generals', ['logout']),
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
          this.getSeguidoresSeguidos(res._id)
          this.getPublicaciones(res._id)
          this.getCalificacion(res._id)
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
    getPublicaciones (id) {
      this.$api.get('publications_user/' + id).then(res => {
        if (res) {
          this.publicaciones = res
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
    sortChats (arr) {
      this.chatsSorted = [...arr]
      this.chatsSorted.sort((a, b) => {
        const dateA = new Date(a.updated_at)
        const dateB = new Date(b.updated_at)
        return dateB - dateA
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url(../../scss/user/Inicio.scss);
</style>
