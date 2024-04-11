<template>
  <div class="q-pa-lg" style="padding: 90px">
    <h4>Gestión de insignas</h4>
    <div style="display: flex; gap: 20%">
      <CrearInsigna style="max-width: 500px" />
     <ListaDeInsignas  style="max-width: 500px" />
    </div>
    <div style="margin-top: 6%">
      <q-btn
        color="primary"
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
