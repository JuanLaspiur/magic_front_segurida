<template>
  <div class="margin">
    <div>
      <h4>Modulo Categorias</h4>
      <Tabla/>
    </div>
    <div>
        <CrearCategoria/>
    </div>
    <div>
      <EditarCategoria/>
    </div>
  </div>
</template>

<script>
import Tabla from '../../components/categorias/Tabla.vue'
import CrearCategoria from '../../components/categorias/CrearCategoria'
import EditarCategoria from '../../components/categorias/EditarCategoria.vue'

export default {
  components: {
    Tabla,
    CrearCategoria,
    EditarCategoria
  }
}
</script>

<style>
.margin {
  margin: 50px;
}
</style>
