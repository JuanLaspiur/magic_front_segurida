<template>
  <div class="q-pa-lg" style="padding: 90px">
    <h4>Usuarios insignas</h4>
    <div style="display: flex; gap: 20%">
      <TablaUsuariosInsigna style="max-width: 500px" />
      <UsuariosConInsigna style="max-width: 500px" />
    </div>
  </div>
</template>

<script>
import TablaUsuariosInsigna from '../../components/insignas/TablaUsuariosInsigna'
import UsuariosConInsigna from '../../components/insignas/UsuariosConInsigna'

export default {
  components: {
    TablaUsuariosInsigna,
    UsuariosConInsigna
  }
}
</script>

<style></style>
