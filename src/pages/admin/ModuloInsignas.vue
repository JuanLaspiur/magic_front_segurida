<template>
  <div class="q-pa-lg" style="padding: 90px">
    <h4>Gestión de insignas especiales</h4>
    <p style="font-size: 20px; margin-top: -20px; margin-bottom: 19px;">
      Las insignas especiales son distintas de las automaticas. Estas insignas las crea usted como administrador y
      apareceran tambien en el perfil del usuario debajo del nombre.
    </p>
    <div style="display: flex; gap: 38%">
      <CrearInsigna style="max-width: 500px" />
     <ListaDeInsignas  style="max-width: 500px" />
    </div>
    <div style="margin-top: 6%">
      <q-btn
        color="negative"
        label="Asignar Insignias a Usuarios"
        @click="$router.push('/modulo_insignas-usuarios')"
      />
    </div>
  </div>
</template>
<script>
import CrearInsigna from '../../components/insignas/CrearInsigna'
import ListaDeInsignas from '../../components/insignas/ListaDeInsignas'

export default {
  components: {
    CrearInsigna,
    ListaDeInsignas
  }
}
</script>

<style></style>
