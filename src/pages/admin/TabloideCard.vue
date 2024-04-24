<template>
  <div>
    <div class="shadow-2 q-my-lg q-pa-md row tabloideCard">
      <q-img
        :src="baseuTabloide + tabloide.img[0]"
        style="width: 50%; max-height: 100%"
      />
      <div class="button_containter q-pa-md">
        <div class="column" style="width: 50%">
          <div
            @click="irRuta(tabloide.redirect)"
            class="text-bold text-h6 c-pointer"
          >
            {{ tabloide.name }}
          </div>
          <div class="text-subtitle">{{ tabloide.description }}</div>
          <div v-if="tabloide.clicks" class="text-subtitle">
            Clicks en este tabloide: {{ tabloide.clicks }}
          </div>
          <div v-else class="text-subtitle">Clicks en este tabloide: 0</div>
          <div v-if="tabloide.nro_posicion" class="text-subtitle">
            POSICIÓN DEL tabloide:
            <template v-if="tabloide.nro_posicion === '1'">
              <p>SUPERIOR</p>
            </template>
            <template v-else>
              <p>INFERIOR</p>
            </template>
          </div>
          <div v-else class="text-subtitle">
            POSICIÓN DEL tabloide: SUPERIOR
          </div>
        </div>
        <div>
          <q-btn
            @click="$router.push('/tabloide/' + tabloide._id)"
            class="q-ma-sm"
            color="primary"
            label="Editar"
            style="width: 100%"
          ></q-btn>
          <q-btn
            @click="confirm = true"
            class="q-ma-sm"
            color="secondary"
            label="Eliminar"
            style="width: 100%"
          ></q-btn>
        </div>
        <div>
          <q-btn
            v-if="index > 0"
            @click="subirTabloide()"
            class="q-ma-sm"
            color="primary"
            label="Subir Tabloide"
            style="width: 100%"
          ></q-btn>
          <q-btn
            v-if="index !== length - 1"
            class="q-ma-sm"
            color="primary"
            label="Bajar Tabloide"
            style="width: 100%"
          ></q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >¿Estas seguro que quieres eliminar este Tabloide?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup></q-btn>
          <q-btn
            @click="handleDelete()"
            flat
            label="Si"
            color="positive"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../../env'
import { openURL } from 'quasar'

export default {
  name: 'TabloideCard',
  props: ['tabloide', 'index', 'length'],
  data () {
    return {
      confirm: false,
      baseuTabloide: ''
    }
  },
  mounted () {
    this.baseuTabloide = env.apiUrl + 'tabloide_img/'
  },
  methods: {
    irRuta (ruta) {
      openURL(ruta)
    },
    async handleDelete () {
      this.$api.delete('delete_tabloide/' + this.tabloide._id).then(res => {
        if (res.tabloide) {
          this.$q.notify({
            message: 'Tabloide eliminado correctamente',
            color: 'positive'
          })
          this.$emit('reloadTabloides')
        }
      })
    },
    async subirTabloide () {
      await this.$api.put('up_tabloide/' + this.tabloide._id).then(res => {
        if (res.status === 200) {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import url(../../scss/admin/TabloideCard.scss);
</style>
