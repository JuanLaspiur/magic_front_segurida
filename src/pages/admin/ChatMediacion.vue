<template>
  <div class="row">
    <div class="q-pa-md column items-center" style="width: 30%">
        <q-card class="q-pa-md" style="width: 100%;border-radius: 20px">
            <div class="text-center text-bold">Usuarios en Mediación</div>
            <q-item>
                <q-item-section avatar>
                    <q-avatar>
                        <img :src="baseuPerfil + data.user_id" />
                    </q-avatar>
                </q-item-section>
                <q-item-section>{{data.userInfo ? data.userInfo.name + ' ' + (data.userInfo.last_name ? data.userInfo.last_name : '') : ''}}</q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar>
                    <q-avatar>
                        <img :src="data.otherInfo ? baseuPerfil + data.otherInfo._id : ''" />
                    </q-avatar>
                </q-item-section>
                <q-item-section>{{data.otherInfo ? data.otherInfo.name + ' ' + (data.otherInfo.last_name ? data.otherInfo.last_name : '') : ''}}</q-item-section>
            </q-item>
        </q-card>

        <q-card class="q-pa-md q-my-md column no-wrap justify-between items-center" style="width: 100%; border-radius:15px">
            <div class="text-h5 text-bold">Reporte</div>
            <div class="text-center q-py-lg text-subtitle1">{{data.description}}</div>
            <q-btn dense no-caps color="primary" label="Ver material gráfico"
            style="width: 80%; height: 50px; border-radius: 15px" @click="seeGrafic = true"/>
        </q-card>

        <q-dialog v-model="seeGrafic">
          <q-card style="width:100%">
            <q-carousel
              animated
              v-model="slide"
              arrows
              control-color="black"
              style="border-radius:15px"
              navigation>
              <q-carousel-slide :name="index+1" v-for="(item, index) of data.images" :key="index" class="column justify-center">
                  <q-btn flat round color="grey-8" icon="clear" @click="seeGrafic = false" class="absolute-top-right" />
                  <img :src="baseuMediacion + item" style="width:100%" />
              </q-carousel-slide>
              </q-carousel>
          </q-card>
        </q-dialog>

        <q-btn no-caps color="primary" :label="data.status === 3 ? 'Ir al inicio' : 'Finalizar mediación'" class="q-py-xs q-mt-md"
        style="width: 80%; border-radius: 10px" @click="data.status === 3 ? $router.push('/administrador') : actualizar()"/>
    </div>
    <div style="width: 70%; height:100%">
        <Chat :data="data" :id="id" @getData="getData()" />
    </div>

    <q-dialog v-model="dialog" persistent>
      <q-card class="q-px-md q-py-lg column no-wrap justify-between items-center" style="width: 100%; border-radius:15px">
        <div class="text-h5 text-bold">Mediación finalizada</div>
        <div class="text-center q-py-lg text-subtitle1">Su mediación ha sido finalizada con éxito. Puede revisar el historial de Mediaciones en el Módulo de Mediación.</div>

        <q-btn no-caps color="primary" label="Cerrar" class="q-py-xs q-mt-xl" style="width: 80%; border-radius: 10px"
          v-close-popup/>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../../env'
import Chat from './Chat'
export default {
  components: { Chat },
  data () {
    return {
      dialog: false,
      seeGrafic: false,
      id: this.$route.params.id,
      baseuMediacion: '',
      baseuPerfil: '',
      slide: 1,
      data: {}
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuMediacion = env.apiUrl + 'mediacion_img/'
    this.getData()
  },
  methods: {
    async getData () {
      await this.$api.get('mediacion_by_id/' + this.id).then(v => {
        if (v) {
          this.data = v
          if (v.status === 3) {
            this.dialog = true
          }
        }
      })
    },
    actualizar () {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas finalizar esta mediación?',
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        this.$api.put('mediacion/' + this.data._id, { status: 3 }).then(res => {
          if (res) {
            this.getData()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    }
  }
}
</script>
