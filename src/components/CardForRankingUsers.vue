<template>
    <div class="column items-center q-mt-xl q-ml-md" style="width: 350px;">
      <q-avatar size="200px" class="bg-grey-5 q-mb-sm" style="z-index: 9; margin-bottom: 20px;">
        <q-badge class="bg-transparent" floating style="border-radius: 100%;width: 200px;height: 200px;">
        </q-badge>
        <q-img :src="item._id ? baseuPerfil + item._id : ''" style="height: 100%"/>
        <div class="absolute-bottom" style="margin-left: 75px; margin-bottom: -25px;">
          <q-avatar size="50px" class="">
            <q-img :src="item.animal_img ? 'animales/' + item.animal_img : ''" style="border-radius: 100%; height: 100%"/>
          </q-avatar>
        </div>
      </q-avatar>

      <q-card class="" style="border-radius: 10px; margin-top: -50px; width: 100%; height: 250px;">
        <div class="bg-primary" style="padding-top: 50px; width: 350px;">
          <div class="text-h6 text-white text-center">{{item.name}} {{item.last_name}}</div>
        </div>
        <div class="q-px-md q-py-md">
          <div class="row justify-between">
            <div>
              <div class="row text-grey-8">
                <div class="text-bold q-pr-xs">Edad:</div>
                <div>{{ageMath(item.birthdate)}} años</div>
              </div>
              <div class="row text-grey-8">
                <div class="text-bold q-pr-xs">Género:</div>
                <div>{{item.gender}}</div>
              </div>
            </div>
          </div>
          <div class="text-grey-8" v-if="item.description">
            <div class="row items-center">
              <div class="q-pr-sm"><b>Descripción: </b>{{item.description.substring(0, 25) + "..."}}</div>
            </div>
          </div>
        </div>
        <q-separator inset />
        <div class="row justify-center">
          <div class="text-center q-px-md q-pt-sm" @click="$router.push('/seguidores/' + item._id)">
            <div class="text-caption text-grey-7 text-bold">Planes creados</div>
            <div v-if="item.eventosCreados" class="text-h6 text-grey-7">{{item.eventosCreados.length}}</div>
            <div v-else class="text-h6 text-grey-7">0</div>
          </div>
          <q-separator vertical />
          <div class="text-center q-pt-sm q-pl-sm" @click="$router.push('/seguidos/' + item._id)">
            <div class="text-caption text-grey-7 text-bold">Planes asistidos</div>
            <div v-if="item.eventosAsistidos" class="text-h6 text-grey-7">{{item.eventosAsistidos.length}}</div>
            <div v-else class="text-h6 text-grey-7">0</div>
          </div>
        </div>
      </q-card>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  props: ['item', 'baseuPerfil'],
  methods: {
    ageMath (date) {
      return moment().diff(moment(date), 'years')
    }
  }
}
</script>
