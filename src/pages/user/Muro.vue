<template>
  <div class="inicio_container ">
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar :muro="true" />
      </div>
    </div>
    <div class="inicio column items-center ">
      <q-avatar size="200px" class="bg-grey-5 q-mb-sm" style="z-index: 9; margin-bottom: 20px;">
        <q-badge class="bg-transparent" floating style="border-radius: 100%;width: 200px;height: 200px;">
          <q-file class="bg-transparent cursor-pointer" borderless v-model="perfile" @input="changeImg()" accept=".jpg, image/*" style="z-index: 7; border-radius: 100%; width: 200px;height: 200px; font-size: 0px">
            <template v-slot:prepend>
              <div class="absolute-center" @click.stop>
                <!-- <q-icon color="white" size="35px" name="photo_camera" class="cursor-pointer"/> -->
              </div>
            </template>
          </q-file>
        </q-badge>
        <q-img :src="user._id ? baseuPerfil + user._id : ''" style="height: 100%"/>
        <q-badge class="bg-transparent" floating style="border-radius: 100%; margin-top: 140px; width: 70px; height: 70px;">
          <q-file class="bg-grey-5" borderless v-model="perfile" @input="changeImg()" accept=".jpg, image/*" style="z-index: 7; border-radius: 100%; width: 100px; font-size: 0px">
            <template v-slot:prepend>
              <div class="absolute-center" @click.stop>
                <q-icon color="white" size="35px" name="photo_camera" class="cursor-pointer"/>
              </div>
            </template>
          </q-file>
        </q-badge>
        <div class="absolute-top" style="margin-left: 75px; margin-top: -10px;">
          <q-avatar size="50px" class="">
            <q-img :src="medalla" style="border-radius: 100%; height: 100%"/>
          </q-avatar>
        </div>
        <div class="absolute-bottom" style="margin-left: 75px; margin-bottom: -25px;">
          <q-avatar size="50px" class="">
            <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
          </q-avatar>
        </div>
      </q-avatar>

      <q-card class="" style="border-radius: 10px; margin-top: -50px; width: 100%">
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

      <q-btn
          no-caps color="primary"
          label="Editar perfil"
          class="q-my-md full-width"
          style="border-radius: 10px;"
          @click="$router.push('/perfil/' + user._id)"
        />

      <q-card class="q-mb-md" style="border-radius: 10px; width: 100%">
        <div class="bg-primary q-py-sm">
          <div class="text-bold text-white text-center">Mis Planes</div>
        </div>
        <div class="row justify-around q-pa-sm">
          <q-img :src="medalla" class="q-mr-xs" style="height: 28px; width: 28px"/>
        </div>
        <div class="row justify-around q-pa-sm">
          <div style="width: 45%" class="row items-center justify-center text-center q-pr-sm">
            <div class="text-caption text-grey-7 text-bold q-px-sm">Planes <br> creados</div>
            <div class="text-h6 text-grey-7">{{allQuedadas.length}}</div>
          </div>
          <q-separator vertical />
          <div style="width: 45%" class="row items-center justify-center text-center q-pl-sm" @click="$router.push('/asistidos')">
            <div class="text-caption text-grey-7 text-bold q-px-sm">Planes <br> participados</div>
            <div class="text-h6 text-grey-7">{{asistidos.length}}</div>
          </div>
        </div>
      </q-card>
      <div class="full-width">
        <div class="text-h5 text-bold  text-grey-8">Mis planes activos</div>
        <div v-if="!activos.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes activos</div>
        <q-scroll-area v-else class="q-mb-xl" horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <!-- Aqui se muestran mis planes activos en las Cards Genericas -->
            <CardPlan
            v-for="(item, index) in activos" :key="index"
            :thumbStyleScroll="thumbStyleScroll"
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="user"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Mis planes organizados</div>
        <div class="q-px-md row items-center q-gutter-sm q-mt-sm">
          <q-btn rounded outline no-caps dense label="Activos" color="primary" class="q-px-sm text-body1" @click="filtrar(1)" />
          <q-btn rounded outline no-caps dense label="Finalizados" color="primary" class="q-px-sm text-body1" @click="filtrar(2)" />
          <q-btn rounded outline no-caps dense label="Todos" color="primary" class="q-px- text-body1" @click="filtrar(3)" />
        </div>
        <div v-if="!quedadas.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes actualmente</div>
        <q-scroll-area v-else class="q-mb-xl" horizontal style="height: 280px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <!-- Aqui se muestran Mis Planes Organizados en su correspondiente Card -->
            <MyPlanCards
            v-for="(item, index) in quedadas" :key="index"
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Mis planes asistidos</div>
        <div class="q-px-md text-caption text-grey-8">Tu historial de eventos asistidos</div>
        <div v-if="!asistidos.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 350px">Sin planes asistidos</div>
        <q-scroll-area v-else class="q-mb-xl" horizontal style="height: 260px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <!-- Aqui se muestran mis planes asistidos en las Cards Genericas -->
            <CardPlan
            v-for="(item, index) in asistidos" :key="index"
            :thumbStyleScroll="thumbStyleScroll"
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="user"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <q-list class="q-py-sm full-width" style="margin-bottom: 80px" >
        <div class="text-h5 text-bold text-grey-8">Mis publicaciones</div>
        <q-input borderless autogrow class="q-ma-md" v-model="publicacion" label="¿En qué estás pensando?">
          <template v-slot:prepend>
            <q-avatar size="60px">
              <q-img :src="user._id ? baseuPerfil + user._id : ''" class="full-height"/>
              <div class="absolute-bottom-right" style="margin-right: -10px">
                <q-avatar size="30px" class="">
                  <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                </q-avatar>
              </div>
            </q-avatar>
          </template>
          <template v-slot:append>
            <q-btn flat round icon="reply" style="transform: scaleX(-1);" @click="publicar()"/>
          </template>
        </q-input>
        <q-separator color="grey" class="q-mx-md q-mb-sm"/>
        <div v-if="!publicaciones.length" class="text-center q-py-lg">No hay publicaciones actualmente</div>
        <div v-for="(item, index) of publicaciones" :key="index" class="q-pt-md" >
          <q-item class="column" @click="publicidadSelec = item, item.totalReacciones ? verPublicacion = true : ''" clickable>
            <q-item class="q-pa-none q-mb-md">
              <q-item-section avatar>
                <q-avatar size="50px">
                  <q-img :src="baseuPerfil + user._id" class="full-height"/>
                  <div class="absolute-bottom-right" style="margin-right: -10px">
                    <q-avatar size="30px">
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
      <q-dialog v-model="showww">
        <div class="column">
          <cropper
            :src="perfileImg"
            @change="change"
            ref="cropperr"
            :stencil-props="{
              previewClass: 'circle-cropper__preview',
            }"
            class="circle-cropper"
            stencil-component="circle-stencil"
          />
          <q-btn @click="uploadImage()" color="primary" label="Cambiar" />
          <q-btn @click="showww = false, perfileImg = null, perfile = null" color="negative" label="Cancelar" />
        </div>
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
import moment from 'moment'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import CardPlan from '../../components/CardPlan.vue'
import MyPlanCards from '../../components/MyPlanCards.vue'
export default {
  components: { SideBar, RightSidebar, Cropper, CardPlan, MyPlanCards },
  data () {
    return {
      perfileImg: null,
      perfile: null,
      loading: false,
      verReacciones: false,
      verPublicacion: false,
      description: false,
      modal: false,
      baseuPerfil: '',
      baseuQuedada: '',
      publicacion: '',
      seguidores: 0,
      seguidos: 0,
      calificacion: 0,
      publicidadSelec: {},
      user: {},
      medalla: '',
      objectFilter: {
        zone: '',
        minimo: null,
        maximo: null,
        categorias: []
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      allQuedadas: [],
      quedadas: [],
      asistidos: [],
      activos: [],
      animales: [],
      publicaciones: [],
      catSelected: [],
      categorias: []
    }
  },
  async mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    await this.getUser()
    await this.getAnimales()
    await this.getMedalla()
  },
  methods: {
    uploadImage () {
      const { canvas } = this.$refs.cropperr.getResult()
      if (canvas) {
        this.$q.loading.show({
          message: 'Cambiando foto de perfil...'
        })
        const formData = new FormData()
        canvas.toBlob(async (blob) => {
          formData.append('files', blob)
          await this.$api.put('update_perfilImg', formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Foto actualizada correctamente',
                color: 'positive'
              })
            }
            location.reload()
            this.$q.loading.hide()
          })
        })
      }
    },
    changeImg () {
      if (this.perfile) {
        this.perfileImg = URL.createObjectURL(this.perfile)
        this.showww = true
      }
    },
    change ({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
    capitalizarPrimeraLetra (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
          if (this.user.first) {
            this.$api.put('update_user_info/' + this.user._id, { first: false })
            this.getCategories()
            this.modal = true
          }
          this.getQuedadas()
          this.getSeguidoresSeguidos(res._id)
          this.getPublicaciones(res._id)
          this.getCalificacion(res._id)
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
    getCalificacion (id) {
      this.$api.get('calificacion/' + id).then(v => {
        if (v) {
          this.calificacion = v
        }
      })
    },
    getQuedadas () {
      this.$api.get('quedadas_user/' + this.user._id).then(res => {
        if (res) {
          this.getAsistidos(this.user._id)
          this.allQuedadas = res.map(e => e)
          this.quedadas = this.allQuedadas
        }
      })
    },
    getAsistidos (id) {
      this.$api.get('evetos_asistidos/' + id).then(v => {
        if (v) {
          this.getActivos(this.user._id)
          this.asistidos = v
        }
      })
    },
    getActivos (id) {
      this.$api.get('evetos_activos/' + id).then(v => {
        if (v) {
          this.activos = v.map(e => e)
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
    deletCat (cat) {
      this.catSelected = this.catSelected.filter(v => v._id !== cat._id)
    },
    filtrarCat () {
      this.loading = true
      const filtrado = {
        zone: this.objectFilter.zone === 'Todas' ? '' : this.objectFilter.zone,
        minimo: this.objectFilter.minimo ? this.objectFilter.minimo : null,
        maximo: this.objectFilter.maximo ? this.objectFilter.maximo : null,
        categorias: this.catSelected
      }
      const text = JSON.stringify(filtrado)
      this.$router.push('/planes/' + text)
    },
    filtrar (val) {
      if (val === 1) {
        this.quedadas = this.allQuedadas.filter(v => {
          if (moment() < moment(v.date)) {
            return v
          } else {
            return false
          }
        })
      } else if (val === 2) {
        this.quedadas = this.allQuedadas.filter(v => {
          if (moment() > moment(v.date)) {
            return v
          } else {
            return false
          }
        })
      } else {
        this.quedadas = this.allQuedadas
      }
    },
    async changeProfile () {
      this.$q.loading.show({
        message: 'Cambiando foto de perfil...'
      })
      const formData = new FormData()
      formData.append('files', this.perfile)
      await this.$api.put('update_perfilImg', formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Foto actualizada correctamente',
            color: 'positive'
          })
        }
        location.reload()
        this.$q.loading.hide()
      })
    },
    reaccionar (data) {
      this.$q.loading.show({})
      this.$api.post('reaccionar/' + this.publicidadSelec._id, data).then(res => {
        if (res) {
          this.getPublicaciones(this.user._id)
          this.verReacciones = false
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async publicar () {
      if (this.publicacion !== '') {
        this.$q.loading.show({
          message: 'Publicando estado...'
        })
        await this.$api.post('register_publication', { user_id: this.user._id, description: this.publicacion }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Estado publicado con exito',
              color: 'positive'
            })
            this.publicacion = ''
            this.getPublicaciones(this.user._id)
          }
          this.$q.loading.hide()
        })
      }
    },
    getMedalla () {
      if ((this.allQuedadas.length >= 10 && this.allQuedadas.length < 25 && this.asistidos.length >= 5 && this.asistidos.length < 10) || (this.allQuedadas.length >= 25 && this.asistidos.length < 10) || (this.allQuedadas.length < 25 && this.asistidos.length >= 10)) {
        this.medalla = 'bronce.jpg'
        return this.medalla
      }
      if ((this.allQuedadas.length >= 25 && this.allQuedadas.length < 50 && this.asistidos.length >= 10 && this.asistidos.length < 20) || (this.allQuedadas.length >= 50 && this.asistidos.length < 20) || (this.allQuedadas.length < 50 && this.asistidos.length >= 20)) {
        this.medalla = 'plata.jpg'
        return this.medalla
      }
      if ((this.allQuedadas.length >= 50 && this.allQuedadas.length < 100 && this.asistidos.length >= 20 && this.asistidos.length < 50) || (this.allQuedadas.length >= 100 && this.asistidos.length < 50) || (this.allQuedadas.length < 100 && this.asistidos.length >= 50)) {
        this.medalla = 'oro.jpg'
        return this.medalla
      }
      if (this.allQuedadas.length >= 100 && this.asistidos.length >= 50) {
        this.medalla = 'platino.png'
        return this.medalla
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import url(../../scss/user/Muro.scss);
  @import url(../../scss/user/Inicio.scss);
  .cropper {
    height: 600px;
    width: 600px;
    background: #DDD;
  }
</style>
