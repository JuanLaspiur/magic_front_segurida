<template>
  <div class="margin">
    <div>
      <h4>Modulo Categorias</h4>
      <p style="font-size: 20px;">Gestión de categorias de planes. Aqui esta la lista actual de categorías, como administrador crear, eliminar, o editarlas</p>
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
