<template>
  <div class="tabloide q-ma-md">
    <div class="col_2">
      <div class="text-gray-10 q-ma-md text-bold text-h5">Editar Tabloide</div>
      <div class="nuevo_tabloide q-pa-lg shadow-2" style="border-radius:10px">
        <div class="text-bold text-h6 q-mb-md">Tabloide</div>
        <q-input class="full-width bg-white" outlined v-model="tabloide.name" label="Nombre de campaña"></q-input>
        <q-input class="full-width bg-white q-mt-md" outlined v-model="tabloide.description" label="Descripción"></q-input>
        <div class="q-my-md  nuevo-tabloide-img">
          <div class="q-mx-sm nuevo-tabloide-div">
            <div class="text-bold text-h6">Selecciona la imagen</div>
            <p>Las dimensiones de la imagen son 1080 x 1080</p>
            <q-file style="border-radius: 5px; overflow:hidden" @input="changeImg()" color="white" bg-color="primary" filled v-model="img" accept=".jpg, image/*" label-color="white" label="Subir Imagen">
              <template v-slot:prepend>
                <q-icon color="white" name="attachment"></q-icon>
              </template>
            </q-file>
          </div>
          <div class="q-mx-sm nuevo-tabloide-div">
            <q-img :src="imgTabloide" style="width:50%; max-height: 100%;"/>
            <!-- <img :src="img ? imgTabloide : ''"> -->
          </div>
        </div>
        <q-input class="q-mb-lg full-width" outlined v-model="tabloide.redirect" label="Introduce link de redireccionamiento"></q-input>
        <q-btn @click="handleSubmit()" class="q-mx-sm full-width" color="primary" label="Publicar"></q-btn>
      </div>
    </div>
    <q-dialog v-model="showCropper">
      <div class="column">
        <cropper
          :src="imgTabloide"
          ref="cropperr"
          :stencil-props="{
            aspectRatio: 6/2,
          }"
          class="circle-cropper"
        />
        <q-btn @click="saveImg" color="primary" label="Cambiar" />
        <q-btn @click="showCropper = false, imgTabloide = imgRespaldo, img = null" color="negative" label="Cancelar" />
      </div>
    </q-dialog>
  </div>
</template>
<script>
import env from '../../env'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  components: { Cropper },
  name: 'EditTabloide',
  data () {
    return {
      showCropper: false,
      imgRespaldo: null,
      baseuTabloide: null,
      tabloide: null,
      edit: false,
      img: null,
      imgTabloide: null,
      form: {},
      tabloides: []
    }
  },
  async mounted () {
    this.baseuTabloide = env.apiUrl + 'tabloide_img/'
    this.tabloide = await this.$api.get('tabloide/' + this.$route.params.id)
    this.imgTabloide = this.baseuTabloide + this.tabloide.img[0]
    this.imgRespaldo = this.imgTabloide
  },
  methods: {
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
      if (this.tabloide._id) {
        this.changeProfile()
      }
      this.tabloide = await this.$api.put('update_tabloide/' + this.tabloide._id, { name: this.tabloide.name, description: this.tabloide.description, redirect: this.tabloide.redirect })
      this.$router.push('/administrador')
    },
    // changeImg () {
    //   if (this.img) { this.imgTabloide = URL.createObjectURL(this.img) }
    // },
    async changeProfile () {
      this.$q.loading.show({
        message: 'Cambiando foto del evento...'
      })
      const formData = new FormData()

      formData.append('files', this.img)
      await this.$api.post('add_tabloideImg/' + this.tabloide._id, formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Tabloide actualizado correctamente',
            color: 'positive'
          })
        }
        // location.reload()
        this.$q.loading.hide()
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url(../../scss/admin/Tabloide.scss);
</style>
