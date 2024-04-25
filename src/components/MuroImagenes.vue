<template>
  <div>
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="muro_de_imagenes" style="padding: 30px 750px">
      <!-- Botón Quasar para subir imagen -->
      <div
        style="
          margin: 0 20px;
          background-color: gray;
          width: 900px;
          height: max-content;
          padding: 25px 0px;
        "
      >
        <h4 style="margin:35px 15px 20px 15px; color: white;">Muro de Imágenes</h4>
        <p style="color: white; padding: 20px 15px 15px 15px; font-size: 20px">
          ¡Comparté con la <strong style="font-style: italic;">comunidad Mágic </strong>, planes, y juntadas! ¡O la imagen que
          quieras compartir!
        </p>
        <p style="color: white; padding: 15px; font-size: 20px">
          Subir imagen:
        </p>
        <q-btn
          color="primary"
          @click="openFilePicker"
          class="q-mb-md"
          style="height: 50px; margin: 10px 15px"
        >
          <q-icon
            name="cloud_upload"
            style="padding: 5px; margin: 0 10px 0 0"
          />
          Subir Imagen
        </q-btn>
      </div>
      <!-- Imágenes existentes -->
      <div class="contenedor_imagen">
        <img src="../../public/banner1.jpg" class="imagen" alt="Imagen 1" />
        <q-icon name="star" style="color:white; width: 100px;" />
      </div>
      <div class="contenedor_imagen">
        <img src="../../public/banner1.jpg" class="imagen" alt="Imagen 2" />
        <q-icon name="favorite" style="color: white; width: 100px;"/>
      </div>
      <div class="contenedor_imagen">
        <img src="../../public/banner1.jpg" class="imagen" alt="Imagen 2" />
        <q-icon name="sentiment_satisfied" style="color: white; width: 100px;"/>
      </div>
      <!-- Agrega más imágenes aquí según sea necesario -->
    </div>
    <div class="inicio_col_right">
      <RightSidebar />
    </div>
  </div>
</template>

<script>
import SideBar from '../pages/user/SideBar.vue'
import RightSidebar from '../pages/user/RightSidebar.vue'

export default {
  components: {
    SideBar,
    RightSidebar
  }
  // Resto de la lógica del componente
}
</script>

<style scoped>
.inicio_col_left {
  position: fixed;
  top: 100px;
  left: 150px; /* Ocupa todo el espacio disponible */
}

.inicio_col_right {
  position: fixed;
  top: 100px;
  right: 100px; /* Ancho fijo para la barra lateral derecha */
  /* Puedes ajustar este ancho según tus necesidades */
}

.contenedor_imagen {
  margin: 20px !important;
  width: 900px;
  height: 900px;
  padding: 20px;
  background-color: gray;
}

.imagen {
  width: 100%;
  height: 90%;
}
</style>
