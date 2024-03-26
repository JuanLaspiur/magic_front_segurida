<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite>
      <q-carousel-slide :name="1">
        <q-layout view="lHh Lpr lFf">
          <q-header class="bg-white">
            <q-toolbar class="text-black row justify-between">
              <q-btn flat @click="$router.go(-1)" color="grey-8" round dense icon="arrow_back"/>
            </q-toolbar>
          </q-header>

          <q-page-container>
            <div class="text-h5 text-bold q-pb-md">Datos del Usuario</div>
            <div class="q-mb-md">
              <q-avatar size="100px" clickable v-ripple @click="verAnimales = true">
                <img :src="animal ? 'animales/' + animal.img : ''" style="border-radius: 100%; height:100%" />
              </q-avatar>
            </div>
            <q-input outlined type="email" disable v-model="form.email" placeholder="Correo electrónico" class="q-mb-md"/>
            <q-input outlined v-model="form.name" label="Nombre Usuario" :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
            <q-input outlined v-model="form.last_name" label="Apellido Usuario" :error="$v.form.last_name.$error" error-message="Este campo es requerido"  @blur="$v.form.last_name.$touch()"/>
            <q-input outlined readonly v-model="form.birthdate" label="Fecha de nacimiento" @click="$refs.qDateProxy.show()"
              error-message="Este campo es requerido" :error="$v.form.birthdate.$error" @blur="$v.form.birthdate.$touch()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date default-view="Years" :locale="myLocale" v-model="form.birthdate" mask="YYYY/MM/DD"  @input="calcularEdad(form.birthdate)">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
            </q-input>
            <q-input outlined readonly v-model.number="age" type="number" label="Edad" :error="$v.age.$error" error-message="La edad debe ser de 18 en adelante"  @blur="$v.age.$touch()"/>
            <q-input outlined type="number" v-model.number="form.phone" label="Teléfono de contacto" class="q-mb-md"/>
            <q-select outlined label="Género" v-model="form.gender" :options="['Hombre', 'Mujer', 'No binario', 'Prefiero no decirlo']" :error="$v.form.gender.$error" error-message="Este campo es requerido" @blur="$v.form.gender.$touch()"/>
            <q-input outlined v-model="form.cargo" label="Cargo o profesión" class="q-mb-md" />
            <q-input outlined v-model="form.peliculas" label="Películas favoritas" class="q-mb-md" />
            <q-input outlined v-model="form.artista" label="Artista y estilo musical favorito" class="q-mb-md" />
            <q-input outlined v-model="form.deportes" label="Deportes favoritos" class="q-mb-md" />
            <q-input outlined v-model="form.bornCountry" label="País de nacimiento" :error="$v.form.bornCountry.$error" error-message="Este campo es requerido" @blur="$v.form.bornCountry.$touch()"/>
            <q-select outlined label="Comunidad autónoma natal" v-model="form.community" :options="comunidades" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.community.$error" @blur="$v.form.community.$touch()"/>
            <q-select outlined label="Ciudad actual" v-model="form.city" :options="ciudades" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.city.$error" @blur="$v.form.city.$touch()"/>
            <q-select outlined label="Zona de Madrid" v-model="form.zone" :options="['Norte', 'Sur', 'Centro', 'Este', 'Oeste']" error-message="Este campo es requerido" :error="$v.form.zone.$error" @blur="$v.form.zone.$touch()"/>
            <q-input outlined class="q-mb-sm" v-model="form.description" type="textarea" label="Breve descripción sobre ti o tus hobbies."/>

            <div class="q-px-md q-pb-lg q-pt-md">
              <q-btn no-caps color="primary" text-color="white" label="Guardar" @click="actualizar()" class="full-width q-py-xs"/>
            </div>
          </q-page-container>
        </q-layout>
      </q-carousel-slide>
    </q-carousel>

    <q-dialog v-model="verAnimales">
      <q-card class="q-pa-sm" style="width:100%">
        <div class="text-center q-pb-md text-h6">Selecciona un animal</div>
        <div class="row justify-around">
          <q-avatar v-for="(item, index) of animales" :key="index" size="90px" clickable v-ripple
          @click="animal = item; verAnimales = false">
            <img :src="'animales/' + item.img" style="border-radius: 100%; height:100%" />
          </q-avatar>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  data () {
    return {
      verAnimales: false,
      age: null,
      slide: 1,
      comunidades: [],
      ciudades: [],
      animales: [],
      animal: {},
      form: {},
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
      last_name: { required },
      birthdate: { required },
      gender: { required },
      bornCountry: { required },
      community: { required },
      city: { required },
      zone: { required },
      peliculas: { required },
      artista: { required },
      deportes: { required }
    },
    age: { required, minValue: minValue(18) }
  },
  mounted () {
    this.getUserById(this.$route.params.id)
    this.getCommunities()
    this.getCities()
  },
  methods: {
    getUserById (id) {
      this.$q.loading.show({
        message: 'Cargando datos...'
      })
      this.$api.get('user_edit/' + id).then(res => {
        if (res) {
          this.form = res
          this.calcularEdad(res.birthdate)
          this.getAnimales()
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async getAnimales () {
      await this.$api.get('animales').then(res => {
        if (res) {
          this.animales = res
          this.animal = res.find(v => v._id === this.form.animal)
        }
      })
    },
    getCommunities () {
      this.$api.get('communities').then(res => {
        if (res) {
          this.comunidades = res
        }
      })
    },
    getCities () {
      this.$api.get('cities').then(res => {
        if (res) {
          this.ciudades = res
        }
      })
    },
    calcularEdad (fecha) {
      this.age = moment().diff(moment(fecha), 'years')
    },
    async actualizar () {
      this.$v.form.$touch()
      this.$v.age.$touch()
      if (!this.$v.form.$error && !this.$v.age.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        this.form.animal = this.animal._id
        await this.$api.put('update_user_info/' + this.form._id, this.form).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Perfil guardado con éxito',
              color: 'positive'
            })
            this.$router.go(-1)
          } else {
            this.$q.loading.hide()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    }
  }
}
</script>
