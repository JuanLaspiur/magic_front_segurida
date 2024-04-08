<template>
  <div class="q-pa-md" style="padding: 90px;">
    <div class="text-h5 text-bold">Módulo de moderadores</div>

    <div class="q-py-md q-mb-md" style="width:50%">
      <q-input v-model="filter" dense rounded outlined bg-color="grey-3" placeholder="Buscar moderador..."
      @input="filterFn(filter)">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      table-class="text-grey-9"
      table-header-class="text-black"
      no-data-label="No hay Moderadores"
      no-results-label="No hay Moderadores"
    >
      <template v-slot:body-cell-fullName="props">
        <q-td :props="props">
          <div>{{props.row.name}} {{props.row.last_name}}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-comunidadInfo="props">
        <q-td :props="props">
          <div>{{ props.row.comunidad.name }}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-direccion="props">
        <q-td :props="props">
          <div>{{ props.row.ciudad.name }}</div>
          <div class="text-caption">Zona {{ props.row.zone }}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-opcion="props">
        <q-td :props="props">
          <div class="row no-wrap justify-center q-gutter-xs">
            <q-btn round flat dense icon="edit" color="primary"
            @click="$router.push('/moderador/' + props.row._id)" />
            <q-btn round flat dense icon="delete" color="red"
            @click="eliminar(props.row._id)"/>
          </div>
        </q-td>
      </template>
    </q-table>

    <q-page-sticky position="bottom-right" :offset="[10, 25]">
      <q-btn round flat size="25px" color="white" icon="add" style="background: linear-gradient(to top, #0065d8, #d80048);" @click="$router.push('/nuevo_moderador')"/>
    </q-page-sticky>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseuPerfil: '',
      filter: '',
      user: {},
      allData: [],
      data: [],
      columns: [
        { name: 'fullName', label: 'Moderador', align: 'center', field: 'fullName', sortable: true },
        { name: 'email', label: 'Correo electrónico', align: 'center', field: 'email' },
        { name: 'phone', label: 'Teléfono', align: 'center', field: 'phone' },
        { name: 'comunidadInfo', label: 'Comunidad', align: 'center', field: 'comunidadInfo' },
        { name: 'direccion', label: 'Ciudad', align: 'center', field: 'direccion' },
        { name: 'opcion', label: 'Acciones', align: 'center', field: 'opcion' }
      ]
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('moderadores').then(v => {
        if (v) {
          this.allData = v
          this.data = v
        }
      })
    },
    async eliminar (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar este moderador?',
        cancel: { label: 'Cancelar' },
        persistent: true
      }).onOk(() => {
        this.$api.delete('eliminar_moderador/' + id).then(res => {
          if (res) {
            this.getData()
            this.$q.notify({
              message: 'Moderador eliminado con éxito',
              color: 'positive'
            })
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    filterFn (val) {
      if (val === '') {
        this.data = this.allData
      } else {
        const needle = val.toLowerCase()
        this.data = this.allData.filter(v => v.name.toLowerCase().indexOf(needle) > -1 || v.last_name.toLowerCase().indexOf(needle) > -1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
