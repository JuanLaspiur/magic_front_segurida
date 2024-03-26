<template>
    <div class="q-mr-sm" style="width:350px;">
        <q-card style="border-radius: 10px; width: 100%;">
            <q-img :src="baseuQuedada + item._id" style="height: 130px" @click="$router.push('/quedada/' + item._id)"/>
                <q-card-section class="row items-start justify-between q-pa-none q-pt-xs">
                <div class="col-3 column items-center q-px-xs q-pb-xs">
                    <q-avatar size="70px">
                        <q-img :src="baseuPerfil + item.user_id" class="full-height"/>
                    </q-avatar>
                    <div class="text-center text-grey-8 text-caption ellipsis" style="width:100%">{{item.userInfo.name}} {{item.userInfo.last_name}}</div>
                    </div>
                    <div style="height: 95px" class="col-9 q-pr-xs column items-between justify-between ">
                    <div>
                    <div class="text-primary text-bold pointer" @click="$router.push('/quedada/' + item._id)">{{item.name.length > 32 ? item.name.substring(0,32) + '...' : item.name}}</div>
                    <div class="text-primary"><b>Fecha: </b>{{item.dateTime.charAt(0).toUpperCase() + item.dateTime.slice(1)}}</div>
                </div>
                    <div class="row no-wrap justify-between items-center q-pb-sm">
                        <div>
                          <q-btn no-caps dense color="primary" size="0.9em" @click="$router.push('/modificar_quedada/' + item._id)"
                          v-if="item.status === 0">
                            <div class="row items-center no-wrap">
                              <q-icon left name="edit" />
                              <div class="text-center">
                                Editar
                              </div>
                            </div>
                          </q-btn>
                        </div>
                        <div v-if="item.asistentes.length === item.limit" class="text-primary col-5">
                        <b>Completado</b>
                      </div>
                      <div v-else class="text-grey-8 text-caption q-pl-xs">
                        <b>Límite de personas</b> {{item.limit}}
                      </div>
                      </div>
                    </div>
                  </q-card-section>
              </q-card>
            </div>
</template>

<script>
export default {
  props: ['baseuQuedada', 'baseuPerfil', 'item']
}
</script>
