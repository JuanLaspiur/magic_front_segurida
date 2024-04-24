<template>
  <div class="tabloide q-ma-md" style="padding: 90px">
    <div class="col_2">
      <div class="text-gray-10 q-ma-md text-bold text-h5">Tabloides</div>
      <div class="nuevo_tabloide q-pa-lg shadow-2" style="border-radius: 10px">
        <div class="text-bold text-h6 q-mb-md">Nuevo Tabloide</div>
        <q-input
          class="full-width bg-white"
          outlined
          v-model="form.name"
          label="Nombre de campaña"
        ></q-input>
        <q-input
          style="margin-bottom: 40px;"
          class="full-width bg-white q-mt-md"
          outlined
          v-model="form.description"
          label="Descripción"
        ></q-input>
        <p>Tabloide 1 es el que esta ubicado en la parte SUPERIOR, Tabloide 2 es el que esta hubicado en la parte INFERIOR</p>
        <q-select
          class="full-width bg-white q-mt-md"
          v-model="form.nro_posicion"
          outlined
          label="Número de posición"
          :options="['1', '2']"
        />

        <div class="q-my-md nuevo-tabloide-img">
          <div class="q-mx-sm nuevo-tabloide-div">
            <div class="text-bold text-h6 q-mb-lg">Selecciona la imagen</div>
            <!-- <p>Las dimensiones de la imagen son 1080 x 1080</p> -->
            <q-file
              style="border-radius: 5px; overflow: hidden"
              @input="changeImg()"
              color="white"
              bg-color="primary"
              filled
              v-model="img"
              accept=".jpg, image/*"
              label-color="white"
              label="Subir Imagen"
            >
              <template v-slot:prepend>
                <q-icon color="white" name="attachment"></q-icon>
              </template>
            </q-file>
          </div>
          <div class="q-mx-sm nuevo-tabloide-div">
            <img :src="imgTabloide" />
          </div>
        </div>
        <q-input
          class="q-mb-lg full-width"
          outlined
          v-model="form.link"
          label="Introduce link de redireccionamiento"
        ></q-input>
        <q-btn
          @click="handleSubmit()"
          class="q-mx-sm full-width"
          color="primary"
          label="Publicar"
        ></q-btn>
      </div>
      <div class="text-gray-10 q-mt-xl q-ml-md text-bold text-h5">
        Tabloides Activos
      </div>
      <div v-if="this.tabloides.length < 1" class="q-ma-lg text-h6">
        No hay tabloides
      </div>
      <TabloideCard
        v-for="(t, index) in this.tabloides"
        :tabloide="t"
        :key="index"
        :index="index"
        :length="tabloides.length"
        @reloadTabloides="getTabloides"
      />
    </div>
    <q-dialog v-model="showCropper">
      <div class="column">
        <cropper
          :src="imgTabloide"
          ref="cropperr"
          :stencil-props="{
            aspectRatio: 6 / 2
          }"
          class="circle-cropper"
        />
        <q-btn @click="saveImg" color="primary" label="Cambiar" />
        <q-btn
          @click=";(showCropper = false), (imgTabloide = null), (img = null)"
          color="negative"
          label="Cancelar"
        />
      </div>
    </q-dialog>
  </div>
</template>
<script>
import TabloideCard from './TabloideCard.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  components: { Cropper, TabloideCard },
  name: 'TabloideView',
  data () {
    return {
      showCropper: false,
      tabloide: null,
      edit: false,
      img: null,
      imgTabloide: null,
      form: {
        nro_posicion: '1' // Tabloide principal como valor predeterminado 1 (tabloide superior, 2 tabloide inferior)
      },
      tabloides: []
    }
  },
  async mounted () {
    this.getTabloides()
  },
  methods: {
    async getTabloides () {
      this.tabloides = await this.$api.get('tabloide')
    },
    saveImg () {
      const { canvas } = this.$refs.cropperr.getResult()
      canvas.toBlob(blob => {
        this.img = blob
        this.imgTabloide = URL.createObjectURL(blob)
      })
      this.showCropper = false
    },
    changeImg () {
      if (this.img) {
        this.imgTabloide = URL.createObjectURL(this.img)
        this.showCropper = true
      }
    },
    async handleSubmit () {
      this.tabloide = await this.$api.post('create_tabloide', {
        name: this.form.name,
        description: this.form.description,
        redirect: this.form.link,
        nro_posicion: this.form.nro_posicion
      })
      if (this.tabloide._id) {
        this.changeProfile()
        this.img = null
        this.form = {}
        this.tabloide = null
        this.imgTabloide = null
        this.tabloides = null
        this.$router.push('/administrador')
      }
    },
    async changeProfile () {
      this.$q.loading.show({
        message: 'Cambiando foto del evento...'
      })
      const formData = new FormData()

      formData.append('files', this.img)
      await this.$api
        .post('add_tabloideImg/' + this.tabloide._id, formData, {
          headers: {
            'Content-Type': undefined
          }
        })
        .then(res => {
          if (res) {
            this.$q.notify({
              message: 'Tabloide agregado correctamente',
              color: 'positive'
            })
          }
          // location.reload()
          this.$q.loading.hide()
        })
        .catch(e => {
          console.log(e)
        })
    }
    //     function subirNum (num) {
    //     temporalArray = [...array]
    //     let num1index = array.findIndex(obj => obj.number === num)
    //     if(num1index < 1) return
    //     let num2index = num1index - 1
    //     array.splice(num1index, 1, array[num1index - 1]);
    //     array.splice(num2index, 1, temporalArray[num1index]);
    // }
  }
}
</script>
<style lang="scss" scoped>
@import url(../../scss/admin/Tabloide.scss);
</style>
