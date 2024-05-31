<template>
  <div class="encuesta-header">
    <img src="../../assets/logoEncuesta.png" class="icon" />
  </div>
</template>

<script>
export default {
  name: 'EncuestaHeader'
}
</script>

<style scoped>
.encuesta-header {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 80px; /* Altura para centrar verticalmente el contenido */
}

.icon {
  width: 80px; /* Ancho del icono */
  height: auto; /* Altura automática para mantener la proporción */
}
</style>
