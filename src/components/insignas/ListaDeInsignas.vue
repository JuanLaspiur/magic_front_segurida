<template>
  <div>
    <h5>Lista de Insignias</h5>
    <q-list>
      <q-item v-for="insignia in insignias" :key="insignia.id">
        <q-avatar style="margin-right: 10px">
          <img :src="insignia.imagen" alt="Imagen de Insignia" />
        </q-avatar>
        <div class="q-item-main">
          <p>{{ insignia.nombre }}</p>
          <p>{{ insignia.descripcion }}</p>
        </div>
        <div class="q-item-side text-center" style="padding: 22px;">
          <q-btn color="red" icon="delete" @click="removeInsignia(insignia)" />
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      insignias: []
    }
  },
  mounted () {
    // Implementa la lógica para obtener la lista de insignias (por ejemplo, desde una API)
    this.insignias = [
      {
        id: 1,
        nombre: 'Insignia de Bronce',
        descripcion: 'Primera insignia otorgada por completar X logros',
        imagen: 'https://example.com/imagen-insignia-bronce.png'
      },
      {
        id: 2,
        nombre: 'Insignia de Plata',
        descripcion: 'Segunda insignia otorgada por completar Y logros',
        imagen: 'https://example.com/imagen-insignia-plata.png'
      },
      {
        id: 3,
        nombre: 'Insignia de Oro',
        descripcion: 'Tercera insignia otorgada por completar Z logros',
        imagen: 'https://example.com/imagen-insignia-oro.png'
      }
    ]
  },
  methods: {
    removeInsignia (insignia) {
      // Implementa la lógica para eliminar la insignia (por ejemplo, a través de una API)
      console.log('Insignia eliminada:', insignia)
      this.insignias = this.insignias.filter(i => i.id !== insignia.id)
    }
  }
}
</script>
