<template>
  <div class="quedada-panel">
    <CabeceraQuedadaTerminada />
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
      <h1 class="text-h4">Fotos de la Quedada</h1>
    </div>
    <div class="imagenes-grupo">
      <PanelFotosQuedada :participants="participants" />
    </div>
  </div>
</template>

<script>
import CabeceraQuedadaTerminada from '../../components/QuedadaTerminadaFotos/CabeceraQuedadaTerminada'
import PanelFotosQuedada from '../../components/QuedadaTerminadaFotos/PanelFotosQuedada.vue'

export default {
  name: 'QuedadaPanel',
  components: {
    CabeceraQuedadaTerminada,
    PanelFotosQuedada
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
      ]
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
}

.imagenes-grupo {
  display: flex;
  justify-content: center;
}

</style>
