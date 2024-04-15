<template>
  <q-dialog v-model="mostrarModal" persistent>
    <q-card>
      <q-card-section>
        <h4>{{ encuestaSeleccionada.nombre }}</h4>
        <p>{{ encuestaSeleccionada.descripcion }}</p>
        <q-radio
          v-model="opcionSeleccionada"
          v-for="opcion in encuestaSeleccionada.opciones"
          :key="opcion.id"
          :label="opcion.nombre"
          :val="opcion.id"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" label="Cancelar" @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    encuestaSeleccionada: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      mostrarModal: false,
      opcionSeleccionada: null
    }
  },
  methods: {
    cerrarModal () {
      this.mostrarModal = false
    }
  }
}
</script>
