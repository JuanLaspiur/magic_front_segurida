<template>
  <div class="inicio_container">
    <div class="inicio">
      <div v-if="eventos.length" class="q-mt-lg" style="margin-bottom: 50px">
        <div v-for="(item, index) of eventos" :key="index" class="q-px-md q-mb-lg">
          <q-card style="border-radius: 10px; width: 100%;">
            <q-img :src="baseuQuedada + item._id" style="height: 130px" @click="$router.push('/quedada/' + item._id)"/>
            <div class="text-primary text-subtitle1 text-right q-pr-xs">{{item.dateTime}}</div>
              <q-card-section class="row items-start justify-between q-pa-none">
                <div class="col-4 column items-center q-px-xs q-pb-xs">
                  <q-avatar size="70px" @click="$router.push('/muro_usuario/' + item.user_id)">
                    <q-img :src="baseuPerfil + item.user_id" class="full-height"/>
                    <div class="absolute-top" style="margin-left: -10px">
                      <q-avatar size="30px" class="">
                        <q-img :src="item.animal_img ? 'animales/' + item.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                      </q-avatar>
                    </div>
                  </q-avatar>
                  <div class="text-center text-grey-8 text-caption ellipsis" style="width:100%">{{item.userInfo.name}} {{item.userInfo.last_name}}</div>
                </div>
                <div class="col-8 q-pr-xs column items-between">
                  <div class="text-grey-8 text-bold" @click="$router.push('/quedada/' + item._id)">{{item.name}}</div>
                  <div class="text-grey-7 text-caption q-mb-md ellipsis-3-lines" @click="$router.push('/quedada/' + item._id)">{{item.description}}</div>
                  <div class="column items-end q-pb-sm">
                    <div v-if="item.asistentes.find(v => v.user_id === user._id && v.rating_id === null) && item.status === 2">
                      <q-btn no-caps dense flat icon="grade" label="Calificar" color="orange" @click="ratingQuedada(item)"/>
                    </div>
                    <div class="text-grey-8 text-caption q-pl-xs"><b>{{item.privacy}} participantes</b> {{item.limit}}</div>
                  </div>
                </div>
              </q-card-section>
          </q-card>
          <!-- <q-card style="border-radius: 10px; width: 100%;">
              <q-img :src="baseuQuedada + item._id" style="height: 160px" @click="$router.push('/quedada/' + item._id)"/>
              <q-card-section class="row items-end justify-between">
                <div class="col q-pr-md">
                  <div class="text-negative">{{item.dateTime}}</div>
                  <div class="text-h6 text-bold">{{item.name}}</div>
                  <div class="row text-caption">
                    <div class="text-grey-8 q-mr-xs">Organizado por</div>
                    <div class="text-grey-8 text-bold">{{item.userInfo.name}} {{item.userInfo.last_name}}</div>
                  </div>
                  <div class="row text-caption">
                    <div class="text-grey-8 q-mr-md">{{item.privacy}}</div>
                    <div class="text-grey-8">{{item.limit}} asistentes</div>
                  </div>
                  <q-btn v-if="item.asistentes.find(v => v.user_id === user._id && v.rating_id === null) && item.status === 2" no-caps dense icon="grade" label="Calificar" color="grey-4" text-color="grey-8" style="width:100%" @click="ratingQuedada(item)"/>
                </div>
              </q-card-section>
          </q-card> -->
        </div>
      </div>
      <div v-else class="text-center q-py-lg">No hay eventos actualmente</div>
    </div>

    <q-dialog v-model="rtg" full-width>
      <q-card style="border-radius: 10px; width: 100%;">
        <q-img :src="baseuQuedada + evento._id" style="height: 175px"/>
        <q-card-section class="column items-center">
          <div class="text-subtitle1 text-bold text-grey">Califica</div>
          <div class="text-h6 text-bold">{{evento.name}}</div>
          <q-rating v-model="rating" class="q-mb-sm" max="5" size="3.5em" :color="$v.rating.$error ? 'red' : 'yellow'" icon="star_border" icon-selected="star" icon-half="star_half" no-dimming/>
          <q-input outlined dense class="q-mb-md full-width" v-model="comment" type="textarea" label="Danos tu opinión..."/>
          <q-btn dense color="primary" text-color="white" label="Guardar" style="width:100%" @click="ratingSave()"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      baseuPerfil: '',
      baseuQuedada: '',
      user: {},
      eventos: [],
      evento: {},
      rtg: false,
      rating: 0,
      comment: null
    }
  },
  validations: {
    rating: { required, minValue: minValue(1) }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
          this.getEventos(res._id)
        }
      })
    },
    getEventos (id) {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('evetos_all_asistidos/' + id).then(v => {
        if (v) {
          this.eventos = v
        }
        this.$q.loading.hide()
      })
    },
    ratingQuedada (itm) {
      this.rating = 0
      this.$v.rating.$reset()
      this.comment = null
      this.evento = itm
      this.rtg = true
    },
    async ratingSave () {
      this.$v.$touch()
      if (!this.$v.rating.$error) {
        this.$q.loading.show({
          message: 'Guardando Calificacion...'
        })
        const data = {
          rating: this.rating,
          comment: this.comment,
          user_id: this.user._id,
          quedada_id: this.evento._id,
          amphitryon_id: this.evento.user_id
        }
        await this.$api.post('register_rating', data).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Calificacion guardada con exito',
              color: 'positive'
            })
            this.getEventos()
            this.rtg = false
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar una calificación valida',
          color: 'negative'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border: 3px solid $accent;
}
</style>
