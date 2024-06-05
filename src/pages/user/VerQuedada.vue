<template>
  <div class="quedada-panel">
    <div v-if="showCabecera">
      <CabeceraQuedadaTerminada />
    </div>
    <div class="header">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        class="back-button"
        size="md"
        flat
        round
        dense
        color="grey"
      />
      <h1 class="text-h4">Quedada Finalizada</h1>
    </div>
    <div class="imagenes-grupo">
      <PanelFotosQuedada :participants="participants" />
    </div>
    <div class="comentarios-container">
      <PanelComentarios  class="panel-comentarios-compoente"/>
    </div>
  </div>
</template>

<script>
import CabeceraQuedadaTerminada from '../../components/QuedadaTerminadaFotos/CabeceraQuedadaTerminada'
import PanelFotosQuedada from '../../components/QuedadaTerminadaFotos/PanelFotosQuedada.vue'
import PanelComentarios from '../../components/QuedadaTerminadaFotos/PanelComentarios.vue'
export default {
  name: 'QuedadaPanel',
  components: {
    CabeceraQuedadaTerminada,
    PanelFotosQuedada,
    PanelComentarios
  },
  data () {
    return {
      participants: [
        {
          name: 'Juan',
          photo:
            'https://th.bing.com/th/id/OIP.FKNCCm-FeSwYUHi5yOeHxQHaEK?rs=1&pid=ImgDetMain'
        },
        {
          name: 'María',
          photo:
            'https://static.vecteezy.com/system/resources/previews/001/311/814/original/programming-and-coding-concept-vector.jpg'
        },
        {
          name: 'Pedro',
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain'
        },
        {
          name: 'Juan',
          photo:
            'https://th.bing.com/th/id/OIP.FKNCCm-FeSwYUHi5yOeHxQHaEK?rs=1&pid=ImgDetMain'
        },
        {
          name: 'María',
          photo:
            'https://static.vecteezy.com/system/resources/previews/001/311/814/original/programming-and-coding-concept-vector.jpg'
        },
        {
          name: 'Pedro',
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain'
        },
        {
          name: 'Juan',
          photo:
            'https://th.bing.com/th/id/OIP.FKNCCm-FeSwYUHi5yOeHxQHaEK?rs=1&pid=ImgDetMain'
        },
        {
          name: 'María',
          photo:
            'https://static.vecteezy.com/system/resources/previews/001/311/814/original/programming-and-coding-concept-vector.jpg'
        },
        {
          name: 'Pedro',
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain'
        },
        {
          name: 'Juan',
          photo:
            'https://th.bing.com/th/id/OIP.FKNCCm-FeSwYUHi5yOeHxQHaEK?rs=1&pid=ImgDetMain'
        },
        {
          name: 'María',
          photo:
            'https://static.vecteezy.com/system/resources/previews/001/311/814/original/programming-and-coding-concept-vector.jpg'
        },
        {
          name: 'Pedro',
          photo:
            'https://th.bing.com/th/id/OIP.AWm5PRocqyXsiXqmOL06NwHaFj?rs=1&pid=ImgDetMain'
        }
      ],
      showCabecera: window.innerWidth > 576
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1) // Esto asume que estás utilizando vue-router
    }
  }
}
</script>

<style scoped>
.quedada-panel {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
}

.back-button {
  margin-right: 10px;
}

.text-h4 {
  font-size: 2rem;
  margin: 20px 0;
  color: gray;
}

.imagenes-grupo {
  display: flex;
  justify-content: center;
}
/* Estilos para el contenedor de comentarios */
.comentarios-container {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  margin-top: 20px; /* Espaciado superior */
}

@media (width > 576px) {
  .panel-comentarios-compoente {
    width: 576px; /* Ancho del panel de comentarios en pantallas más grandes */
  }
.text-h4{
  font-size: 1.5rem;
}
}
</style>
