/*Anotaciones: Consultar si el boton hay que mostrar en la tabla tambien  */
<template>
  <div class="q-pa-lg">
    <div class="q-pa-lg" style="display: flex; gap:20px">
      <q-input
        v-model="filtroNombre"
        label="Buscar por nombre"
        outlined
        dense
        style="width: 500px;"
        @keyup.enter="buscarPorNombre"
      />
    </div>
    <q-table
      title="Planes"
      :data="filteredQuedadas"
      :columns="columns"
      row-key="_id"
      no-results-label="No hay Datos"
      :pagination.sync="pagination"
    >
      <!-- Cuerpo de la tabla -->
    <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="row no-wrap q-gutter-x-xs justify-start">
              <q-btn
                dense
                @click="$router.push(`/plan_view_admin/${props.row._id}/${props.row.user_id}`)"
                label="Editar"
                class="q-px-sm"
                style="min-width: 120px"
                color="secondary"
                push
              >
                <q-tooltip>
                  Editar Plan
                </q-tooltip>
              </q-btn>
              <q-btn
                dense
                v-if="props.row.status !== 3 && props.row.status !== 2"
                @click="cancelarPlan(props.row._id)"
                label="Cancelar plan"
                class="q-px-sm"
                style="min-width: 120px"
                color="secondary"
                push
              >
                <q-tooltip>
                  Cancelar plan
                </q-tooltip>
              </q-btn>
              <q-btn
                dense
                v-else-if="props.row.status === 3"
                @click="reactivarPlan(props.row._id)"
                label="Reactivar plan"
                class="q-px-sm"
                style="min-width: 120px"
                color="positive"
                push
              >
                <q-tooltip>
                  Reactivar plan
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="props.row.privacy === 'Público'"
                dense
                @click="cambiarPrivacidad(props.row._id, 'Privado')"
                label="Privado"
                class="q-px-sm"
                style="min-width: 120px"
                color="primary"
                push
              >
                <q-tooltip>
                  Privado
                </q-tooltip>
              </q-btn>

              <q-btn
                v-if="props.row.privacy === 'Privado'"
                dense
                @click="cambiarPrivacidad(props.row._id, 'Publico')"
                label="Público"
                class="q-px-sm"
                style="min-width: 120px"
                color="primary"
                push
              >
                <q-tooltip>
                  Publico
                </q-tooltip>
              </q-btn>
              <q-btn
                dense
                v-if="props.row.reportes"
                @click="verReportes(props.row)"
                label="Ver Reportes"
                class="q-px-sm text-black"
                style="min-width: 120px"
                color="warning"
                push
              >
                <q-tooltip>
                  Ver Reportes
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
  </q-table>
  <q-dialog v-model="reportsModal">
    <q-card style="min-width: 500px">
        <q-card-section>
          <div v-if="planModal" class="text-h6">{{`Reportes: ${planModal.name}`}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh; padding: 0 !important" class="scroll">
          <q-list v-if="planModal" dense bordered padding class="rounded-borders">
            <q-item v-for="(item, index) in planModal.reportes" :key="index" clickable v-ripple>
              <q-item-section @click="console(item)">
                <div>{{`${index + 1} - ${item.reason}`}}</div>
                <div>{{item.date}}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
  </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bgCustom: '#000000',
      pagination: {
        rowsPerPage: 100
      },
      allQuedadas: [],
      columns: [
        { name: 'actions', align: 'left', label: 'Acciones', field: 'actions', sortable: true },
        { name: 'nombre', required: true, label: 'Nombre', align: 'center', field: row => row.name, format: val => `${val}`, sortable: true },
        { name: 'reportes', align: 'center', label: 'Reportes', field: row => row.reportes ? row.reportes.length : 0, sortable: true },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'date', sortable: true },
        { name: 'limite', label: 'Limite de personas', field: 'limit', sortable: true },
        { name: 'asistentes', label: 'Asistentes', sortable: true, field: row => row.asistentes.length },
        { name: 'zone', label: 'Zona', field: 'zone' },
        { name: 'status', label: 'Estado', sortable: true, field: row => row.status === 3 ? 'Cancelado' : row.status === 2 ? 'Finalizado' : 'Pendiente' },
        { name: 'description', label: 'Descripción', field: 'description' },
        { name: 'location', label: 'location', field: 'location', sortable: true }
      ],
      reportsModal: false,
      planModal: null,
      filtroNombre: ''// Variable para almacenar el valor del input de búsqueda por nombre
    }
  },
  mounted () {
    this.getPlanes()
  },
  computed: {
    // Filtra los datos según el valor ingresado en el input de búsqueda por nombre
    filteredQuedadas () {
      if (!this.filtroNombre.trim()) {
        // Si el input de búsqueda está vacío, mostrar todos los datos
        return this.allQuedadas
      }
      // Filtrar los datos por nombre
      return this.allQuedadas.filter(quedada =>
        quedada.name.toLowerCase().includes(this.filtroNombre.trim().toLowerCase())
      )
    }
  },
  methods: {
    console (data) {
      console.log(data)
    },
    color (row) {
      return row.status === 3 ? 'negative' : row.status === 2 ? 'positive' : 'bg-white'
    },
    verReportes (row) {
      this.planModal = row
      this.reportsModal = true
    },
    cancelarPlan (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas cancelar este evento?',
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.$api.put('edit_quedada/' + id, { status: 3 }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Plan cancelado.',
              color: 'positive'
            })
            this.getPlanes()
          }
        })
      }).onCancel(() => {
      // cancel
      })
    },
    reactivarPlan (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas reactivar este evento?',
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.$api.put(`restart_quedada/${id}`).then(res => {
          if (res.status === 200) {
            this.$q.notify({
              message: 'Plan reactivado con éxito',
              color: 'positive'
            })
            this.getPlanes()
          } else {
            this.$q.notify({
              message: 'No pudimos reactivar la quedada',
              color: 'negative'
            })
          }
        }).catch((error) => console.log(error))
      }).onCancel(() => {
      // cancel
      })
    },
    cambiarPrivacidad (id, nuevaPrivacidad) {
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas cambiar la privacidad de este evento a "${nuevaPrivacidad}"?`,
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.$api.put(`edit_quedada/${id}`, { privacy: nuevaPrivacidad }).then(res => {
          this.$q.notify({
            message: `Privacidad cambiada a "${nuevaPrivacidad}" con éxito`,
            color: 'positive'
          })
          this.getPlanes()
        }).catch((error) => {
          console.error('Error al cambiar la privacidad:', error)
          this.$q.notify({
            message: 'Ocurrió un error al cambiar la privacidad de la quedada',
            color: 'negative'
          })
        })
      }).onCancel(() => {
      })
    },
    getPlanes () {
      this.$api.get('all_quedadas_admin/').then(res => {
        console.log(res)
        this.allQuedadas = res
      })
    },
    buscarPorNombre () {
      console.log('per')
    }

  }

}
</script>
<style lang="scss" scoped>
  .customBG{
    background-color: "bgCustom";
  }
</style>
