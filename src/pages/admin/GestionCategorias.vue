<template>
  <div class="margin">
    <div>
      <h4>Modulo Categorias</h4>
      <div>
        <Tabla />
      </div>
      <CrearCategoria class="auto" />
    </div>
  </div>
</template>

<script>
import Tabla from '../../components/categorias/Tabla.vue'
import CrearCategoria from '../../components/categorias/CrearCategoria'

export default {
  components: {
    Tabla,
    CrearCategoria
  }
}
</script>

<style>
.margin {
  margin: 50px;
}
.auto{
  margin: 40px 30%;
}
</style>
