<template>
  <div class="q-pa-md">
    <div class="text-h5 text-bold">Módulo de mediación</div>
    <div class="text-subtitle1">Nuevos  reportes</div>

    <q-table
      :data="data"
      :columns="columns"
      flat
      row-key="name"
      class="q-ma-md"
      table-class="text-grey-9"
      table-header-class="text-black"
      no-data-label="No hay reportes"
      no-results-label="No hay resultados"
    >
      <template v-slot:body-cell-fullName="props">
        <q-td :props="props">
          <div class="row items-center no-wrap">
            <q-avatar size="40px">
              <q-img :src="baseu + props.row.user_id" class="full-height"/>
            </q-avatar>
            <div class="q-pl-sm">{{props.row.userInfo.name}} {{props.row.userInfo.last_name ? props.row.userInfo.last_name : ''}}</div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <div>{{props.row.userInfo.email}}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-phone="props">
        <q-td :props="props">
          <div>{{props.row.userInfo.phone}}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-report="props">
        <q-td :props="props">
          <q-btn no-caps dense color="primary" label="Ver" class="q-px-md" style="border-radius: 10px"
          @click="seeReport(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div class="text-primary">{{props.row.status === 1 ? 'Pendiente' : props.row.status === 2 ? 'Activo' : 'Finalizada'}}</div>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialog">
      <q-card class="q-px-md q-py-lg column no-wrap justify-between items-center" style="width: 100%; border-radius:15px">
        <div class="text-h5 text-bold">Reporte</div>
        <div class="text-center q-py-lg text-subtitle1">{{form.description}}</div>
        <q-btn dense no-caps color="primary" text-color="black" label="Ver material gráfico"
        style="width: 60%; height: 50px; border-radius: 15px" @click="seeGrafic = true"/>

        <q-btn no-caps text-color="black" color="primary" label="Iniciar mediación" class="q-py-xs q-mt-xl" style="width: 80%; border-radius: 10px"
          @click="actualizar()"/>
        <q-btn flat no-caps label="Cerrar" color="grey-9" class="q-mt-lg" v-close-popup />
      </q-card>
    </q-dialog>

    <q-dialog v-model="seeGrafic">
          <q-card style="width:100%">
            <q-carousel
              animated
              v-model="slide"
              arrows
              control-color="black"
              style="border-radius:15px"
              navigation>
              <q-carousel-slide :name="index+1" v-for="(item, index) of form.images" :key="index" class="column justify-center">
                  <q-btn flat round color="grey-8" icon="clear" @click="seeGrafic = false" class="absolute-top-right" />
                  <img :src="baseuMediacion + item" style="width:100%" />
              </q-carousel-slide>
              </q-carousel>
          </q-card>
        </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      dialog: false,
      seeGrafic: false,
      baseu: '',
      baseuMediacion: '',
      slide: 1,
      form: {},
      data: [],
      columns: [
        { name: 'fullName', label: 'Usuario', align: 'center', field: 'fullName', sortable: true },
        { name: 'email', label: 'Correo electrónico', align: 'center', field: 'email' },
        { name: 'phone', label: 'Teléfono', align: 'center', field: 'phone' },
        { name: 'date', label: 'Fecha de emisión', align: 'center', field: 'date' },
        { name: 'report', label: 'Reporte', align: 'center', field: 'report' },
        { name: 'status', label: 'Estado', align: 'center', field: 'status' }
      ]
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'perfil_img/'
    this.baseuMediacion = env.apiUrl + 'mediacion_img/'
    this.getRecords()
  },
  methods: {
    getRecords () {
      this.$api.get('mediacion').then(res => {
        if (res) {
          this.data = res
        }
      })
    },
    seeReport (data) {
      if (data.status === 1) {
        this.form = data
        this.dialog = true
      } else {
        this.$router.push('/mediacion/' + data._id)
      }
    },
    actualizar () {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas iniciar esta mediación?',
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        this.$api.put('mediacion/' + this.form._id, { status: 2 }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Mediación iniciada',
              color: 'positive'
            })
            this.getRecords()
            this.$router.push('/mediacion/' + this.form._id)
          }
        })
      }).onCancel(() => {
        // cancel
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
