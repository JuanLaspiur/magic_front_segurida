<template>
  <div class="container">
    <div class="colum_2">
      <q-carousel class="window-height" animated v-model="slide" infinite>
        <q-carousel-slide :name="1"  class="q-pa-none">
          <q-layout view="lHh Lpr lFf">
            <q-page-container>
              <div class="q-px-md q-mb-md">
                <div class="text-h6 text-bold q-mt-lg">Admin: Editar evento</div>
                <q-item class="q-px-none q-mb-sm">
                  <q-item-section avatar>
                    <q-avatar size="60px">
                      <q-img :src="user._id ? baseu + user._id : ''" class="full-height"/>
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-bold">{{user.name}} {{user.last_name}}</q-item-label>
                    <q-item-label class="text-grey">{{user.email}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-input outlined class="q-mb-sm" v-model="form.name" label="Nombre del evento" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
                <q-input outlined readonly class="q-mb-sm" v-model="dateOriginal" label="Fecha y hora de inicio" error-message="Este campo es requerido" :error="$v.form.dateTime.$error" @blur="$v.form.dateTime.$touch()" @click="dateTime(1)">
                  <template v-slot:append>
                    <q-icon name="event" @click.stop>
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date :locale="myLocale" v-model="form.date" mask="YYYY/MM/DD HH:mm" @input="dateTime(2)"/>
                      </q-popup-proxy>
                      <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
                        <q-time v-model="form.date" mask="YYYY/MM/DD HH:mm" @input="dateTime(3)"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input outlined class="q-mb-sm" v-model="form.description" type="textarea" label="Descripción del plan" error-message="Este campo es requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
                <q-select outlined label="Zona" v-model="form.zone" :options="['Norte', 'Sur', 'Centro', 'Este', 'Oeste']" error-message="Este campo es requerido" :error="$v.form.zone.$error" @blur="$v.form.zone.$touch()"/>
                <q-input outlined class="q-mb-sm" v-model="form.location" label="Ubicación" error-message="Este campo es requerido" :error="$v.form.location.$error" @blur="$v.form.location.$touch()">
                  <template v-slot:append>
                    <q-icon name="room"/>
                  </template>
                </q-input>
                <q-input outlined class="q-mb-sm" v-model.number="form.limit" type="number" label="Límite de personas" :rules="[val => val > 0]" error-message="Este campo es requerido" :error="$v.form.limit.$error" @blur="$v.form.limit.$touch()"/>
                <q-select outlined class="q-mb-sm" label="Categoría" v-model="form.category" :options="categorias" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.category.$error" @blur="$v.form.category.$touch()">
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label v-html="scope.opt.name"/>
                        <q-item-label class="text-grey-7">{{scope.opt.description}}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-select outlined class="q-mb-sm" label="Privacidad" v-model="form.privacy" :options="['Público']" error-message="Este campo es requerido" :error="$v.form.privacy.$error" @blur="$v.form.privacy.$touch()"/>
              </div>
              <div class="q-px-md q-pb-lg">
                <q-btn no-caps color="primary" text-color="white" label="Siguiente" @click="siguiente()" class="full-width q-py-xs"/>
                <q-btn no-caps color="negative" text-color="white" label="Cancelar" @click="$router.go(-1)" class="full-width q-my-sm q-py-xs"/>
              </div>
            </q-page-container>
          </q-layout>
        </q-carousel-slide>

        <q-carousel-slide :name="2" class="q-pa-none">
          <q-layout view="lHh Lpr lFf">

            <q-page-container class="">
              <q-img :src="quedadaImg" class="bg-grey-7" style="height: 250px; width: 100%;">
                <q-file borderless v-model="img" @input="changeImg()" accept=".jpg, image/*" class="absolute-center" style="background: #616263bb; border-radius: 15px; border: 3px solid #a7a7a7; width: 230px; font-size: 0px">
                  <template v-slot:prepend>
                    <div class="row items-center no-wrap q-px-md" @click.stop>
                      <q-icon :color="!$v.img.$error ? 'grey-5' : 'negative'" size="40px" name="photo"/>
                      <div :class="`q-px-xs text-h6 text-${!$v.img.$error ? 'grey-5' : 'negative'} text-no-wrap`">AGREGAR FOTO</div>
                    </div>
                  </template>
                </q-file>
              </q-img>
              <div class="q-pa-md">
                <div>
                  <div class="text-primary">{{form.dateTime ? form.dateTime.charAt(0).toUpperCase() + form.dateTime.slice(1) : ''}}</div>
                  <div class="text-bold text-h6">{{form.name}}</div>
                  <div class="row text-grey-10">
                    <div class="q-mr-xs">Organizado por</div>
                    <div class="text-bold text-black">{{user.name}} {{user.last_name? user.last_name : ''}}</div>
                  </div>
                </div>
                <q-separator color="grey" class="q-my-md"/>
                <q-list class="text-prymary">
                  <q-item class="q-px-none">
                    <q-item-section top avatar>
                      <q-icon color="primary" name="edit" size="40px"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-subtitle1 text-bold text-primary">Descripción</q-item-label>
                      <q-item-label class="">{{form.description}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-px-none">
                    <q-item-section avatar>
                      <q-icon color="primary" name="room" size="40px"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-subtitle1 text-bold text-primary">Ubicación</q-item-label>
                      <q-item-label class="">{{form.location}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-px-none">
                    <q-item-section avatar>
                      <q-icon color="primary" name="dangerous" size="40px"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-subtitle1 text-bold text-primary">Límite de personas</q-item-label>
                      <q-item-label class="">{{form.limit}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-px-none">
                    <q-item-section avatar>
                      <q-icon color="primary" name="lock" size="40px"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-subtitle1 text-bold text-primary">Privacidad del plan</q-item-label>
                      <q-item-label class="">{{form.privacy}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="q-px-md q-pb-lg">
                <q-btn no-caps color="primary" text-color="white" :label="!edit ? 'Crear Plan' : 'Guardar Plan'" :loading="loading" @click="!edit ? saveQuedada() : actualizar(false)" class="full-width q-py-xs">
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-center" />
                    Guardando...
                  </template>
                </q-btn>
                <q-btn no-caps color="negative" text-color="white" label="Volver" :loading="loading" @click="slide = 1" class="full-width q-my-sm q-py-xs"></q-btn>
                </div>
            </q-page-container>
          </q-layout>
        </q-carousel-slide>

        <q-carousel-slide :name="3" class="q-pa-md">
            <div class="text-center text-h6 q-mb-sm">Enviar invitaciones</div>
            <q-btn round flat icon="done" color="positive" class="absolute-top-right q-pa-sm" @click="actualizar(true)" />
            <q-separator />
            <div class="q-px-md q-py-md">
              <q-input v-model="filter" dense rounded outlined bg-color="grey-3" placeholder="Buscar usuario..."
              @input="filterFn(filter)">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>

            <q-item class="q-mb-sm">
              <q-item-section avatar>
                <q-avatar size="60px">
                  <q-img :src="baseu + user._id" class="full-height"/>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-input borderless v-model="form.nota" class="text-h6" placeholder="Agrega una nota..."/>
              </q-item-section>
            </q-item>

            <q-list class="q-py-sm">
              <div class="text-h6">Sugerencias</div>
              <q-item v-for="(item, index) of users" :key="index" v-ripple>
                <q-item-section avatar>
                  <q-avatar size="60px">
                    <q-img :src="baseu + item.seguido" class="full-height"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-subtitle1 text-bold">{{ item.seguidoInfo.name }} {{ item.seguidoInfo.last_name }}</q-item-label>
                  <q-item-label class="text-grey-7 ellipsis"><b>({{item.seguidoInfo.age}}</b> años)</q-item-label>
                </q-item-section>

                <q-item-section side >
                  <q-btn no-caps dense :disable="(asistentes.length < form.limit) || asistentes.find(v => v.user_id === item.seguido) ? false : true"
                    :label="asistentes.find(v => v.user_id === item.seguido) ? 'Invitado' : 'Invitar'"
                    :text-color="asistentes.find(v => v.user_id === item.seguido) ? 'white' : 'primary'"
                    :color="asistentes.find(v => v.user_id === item.seguido) ? 'positive' : 'blue-2'" class="q-px-sm"
                    @click="invitar(item.seguido, asistentes.find(v => v.user_id === item.seguido) ? false : true)"/>
                </q-item-section>
              </q-item>
            </q-list>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <q-dialog v-model="showCropper">
      <div class="column">
        <cropper
          :src="quedadaImg"
          ref="cropperr"
          :stencil-props="{
            aspectRatio: 6/2,
          }"
          class="circle-cropper"
        />
        <q-btn @click="saveImg" color="primary" label="Cambiar" />
        <q-btn @click="showCropper = false, quedadaImg = imgRespaldo, img = null" color="negative" label="Cancelar" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
import moment from 'moment'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  components: { Cropper },
  data () {
    return {
      showCropper: false,
      imgRespaldo: null,
      loading: false,
      edit: false,
      img: null,
      dateOriginal: null,
      quedadaImg: null,
      baseu: '',
      baseuQuedada: '',
      evento_id: '',
      filter: '',
      slide: 1,
      user: {},
      form: {},
      categorias: [],
      allUser: [],
      users: [],
      asistentes: [],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  validations: {
    form: {
      name: { required },
      dateTime: { required },
      description: { required },
      zone: { required },
      location: { required },
      limit: { required },
      category: { required },
      privacy: { required }
    },
    img: { required }
  },
  async mounted () {
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.baseu = env.apiUrl + 'perfil_img/'
    this.getCategories()
    this.getDataAdmin()
  },
  methods: {
    changeImg () {
      if (this.img) {
        this.quedadaImg = URL.createObjectURL(this.img)
        this.showCropper = true
      }
    },
    saveImg () {
      const { canvas } = this.$refs.cropperr.getResult()
      canvas.toBlob(blob => {
        this.img = blob
        this.quedadaImg = URL.createObjectURL(blob)
      })
      this.showCropper = false
    },
    getDataAdmin () {
      if (this.$route.params.id) {
        this.edit = true
        this.getQuedada(this.$route.params.id)
        this.getUser(this.$route.params.user_id)
      }
    },
    getUser (id) {
      this.$api.get('user_by_id/' + id).then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    getQuedada (id) {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('quedada_by_id/' + id).then(res => {
        if (res) {
          this.form = res
          this.dateOriginal = res.dateTime
          this.asistentes = res.asistentes
          this.evento_id = res._id
          this.quedadaImg = this.baseuQuedada + res._id
          this.imgRespaldo = this.quedadaImg
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    getInvitados () {
      this.$api.get('seguidores_seguidos/2/' + this.user._id).then(res => {
        if (res) {
          this.allUser = res
          this.users = res
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
    dateTime (idx) {
      if (idx === 1) {
        this.$refs.qDateProxy.show()
        this.$refs.qTimeProxy.hide()
      } else if (idx === 2) {
        this.$refs.qDateProxy.hide()
        this.$refs.qTimeProxy.show()
      } else {
        this.dateOriginal = moment(this.form.date).locale('Es').format('dddd DD MMM YYYY, HH:mm')
        this.form.dateTime = this.dateOriginal
        this.$refs.qTimeProxy.hide()
      }
    },
    siguiente () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.slide = 2
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    async saveQuedada () {
      this.$v.form.$touch()
      this.$v.img.$touch()
      if (!this.$v.img.$error && !this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.asistentes = []
        this.form.user_id = this.user._id
        const formData = new FormData()
        formData.append('file', this.img)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register_quedada', formData, {
          headers: { 'Content-Type': undefined }
        }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.evento_id = res._id
            this.$q.notify({
              message: 'Plan guardado con exito',
              color: 'positive'
            })
            if (this.form.privacy === 'Público') {
              this.$router.go(-1)
            } else {
              this.getInvitados()
              this.slide = 3
            }
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    async actualizar (bool) {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.asistentes = this.asistentes
        await this.$api.put('edit_quedada/' + this.evento_id, this.form).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.changeProfile()
            this.$q.loading.hide()
            if (!bool && this.form.privacy === 'Privado') {
              this.getInvitados()
              this.slide = 3
            } else {
              this.getDataAdmin()
              this.$router.go(-1)
            }
          } else {
            this.$q.loading.hide()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    invitar (id, bool) {
      this.$api.post('invitar/' + this.evento_id, { invitado: { user_id: id, asistencia: false, rating_id: null }, invitar: bool }).then(res => {
        if (res) {
          this.asistentes = res
        }
      })
    },
    async changeProfile () {
      this.$q.loading.show({
        message: 'Cambiando foto del evento...'
      })
      const formData = new FormData()
      formData.append('files', this.img)
      await this.$api.put('update_quedadaImg/' + this.evento_id, formData, {
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
        // this.$router.push('/planes_module')
        // this.getDataAdmin()
        // location.reload()
        this.$q.loading.hide()
      })
    },
    filterFn (val) {
      if (val === '') {
        this.users = this.allUser
      } else {
        const needle = val.toLowerCase()
        this.users = this.allUser.filter(v => v.seguidoInfo.name.toLowerCase().indexOf(needle) > -1 || v.seguidoInfo.last_name.toLowerCase().indexOf(needle) > -1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import url(../../scss/user/Notificaciones.scss);
</style>
