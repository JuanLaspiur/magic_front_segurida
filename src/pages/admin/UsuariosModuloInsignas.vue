<template>
  <div class="q-pa-lg" style="padding:35px 90px">
    <h4>Usuarios insignas</h4>
    <div style="display: flex; gap: 20%; margin-top: -80px;">
      <TablaUsuariosInsigna style="width: 49%;" />
      <UsuariosConInsigna style="width: 49%;"  />
    </div>
    <div>
      <q-btn color="primary" label="Volver" style="padding: 0 30px;" @click="$router.push('/modulo_insignas')" />

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
