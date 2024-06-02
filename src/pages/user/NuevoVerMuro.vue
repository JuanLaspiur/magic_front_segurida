<template>
  <div class="inicio_container">
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar />
      </div>
    </div>
    <div class="inicio columns q-mt-lg">
        <div :class="newWidth">
          <div class="container-divs" style="width: 50%; height: 100%;">
                <div class="container-divs" >
                    <q-avatar size="200px" class="bg-grey-5 " style="z-index: 9;">
                        <q-img :src="user._id ? baseuPerfil + user._id : ''" style="height: 100%;"/>
                    </q-avatar>
                </div>
                <div class="row justify-between items-center q-px-sm" style="width: 100%;">
                <div v-if="width > 800" class="">
                  <q-avatar size="50px" class="q-mr-sm">
                    <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                  </q-avatar>
                  <q-avatar v-if="medalla" size="50px" class="">
                    <q-img :src="medalla" style="border-radius: 100%; height: 100%"/>
                  </q-avatar>
                  <q-avatar v-else size="50px" class="">
                    <q-img :src="'/oro-modified.jpg'" style="border-radius: 100%; height: 100%"></q-img>
                    <q-tooltip>Este usuario aún no posee medallas</q-tooltip>
                  </q-avatar>
                </div>
                <div v-else class="" style="width: 100%;">
                  <div style="width: 100%;" class="row items-center justify-center">
                    <q-avatar size="50px" >
                    <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                  </q-avatar>
                  <q-avatar v-if="medalla" size="50px" class="">
                    <q-img :src="medalla" style="border-radius: 100%; height: 100%"/>
                  </q-avatar>
                  <q-avatar v-else size="50px" class="">
                    <q-img :src="'/oro-modified.jpg'" style="border-radius: 100%; height: 100%"></q-img>
                    <q-tooltip>Este usuario aún no posee medallas</q-tooltip>
                  </q-avatar>
                  </div>
                </div>
                <!-- Boton para dispositivos móviles -->
                <div v-if="width < 800" class="q-mt-xl full-width columns items-center justify-center" style="width: 100%;"
>
                  <q-btn
                    no-caps color="primary"
                    label="Enviar mensaje"
                    style="border-radius: 10px; width: 100%; height: 42px; margin-bottom: 10px;"
                    @click="goChat()"
                    v-if="showChat"
                    />
                  <q-btn
                    no-caps color="primary"
                    label="Dejar de seguir"
                    style="border-radius: 10px; width: 100%; height: 42px;"
                    @click="seguir(user)"
                    class="q-mb-md"
                    v-if="user.seguido"
                    />
                    <q-btn
                    no-caps color="primary"
                    label="Seguir"
                    style="border-radius: 10px; width: 120px; height: 42px;"
                    @click="seguir(user)"
                    v-else
                    />
                </div>
                  <!-- Boton para Pc -->
                  <div v-else>
                    <q-btn
                    no-caps color="primary"
                    label="Enviar mensaje"
                    style="border-radius: 10px; width: 140px; height: 42px; margin-right: 7px;"
                    @click="goChat()"
                    v-if="showChat"
                    />
                    <q-btn
                    no-caps color="primary"
                    label="Dejar de seguir"
                    style="border-radius: 10px; width: 140px; height: 42px;"
                    @click="seguir(user)"
                    v-if="user.seguido"
                    />
                    <q-btn
                    no-caps color="primary"
                    label="Seguir"
                    style="border-radius: 10px; width: 120px; height: 42px;"
                    @click="seguir(user)"
                    v-else
                    />
                  </div>
                </div>
            </div>
            <!-- Between divs -->
            <!-- Q-card para Pc -->
            <div v-if="width > 800" class="columns items-center justify-center" style="width: 50%; height: 294px;">
                <q-card class="" style="border-radius: 10px; width: 100%; height: 100%; ">
                    <div class="bg-primary q-mb-xs" style="padding: 5px 0;">
                        <div class="title-perfil">Resumen Perfil: </div>
                    </div>
                    <div class="title-name">{{user.name}} {{user.last_name}}</div>
                    <div v-if="user.quedadas && calificacion===0" class="q-px-md row">
                        <div class="columns items-center justify-center q-pt-sm" style="height: 15px;" >
                            <p style="font-size: 15px; font-style: italic; padding: 10px 0;">Karma:</p>
                        </div>
                        <q-rating
                            v-model="calificacion"
                            readonly
                            size="1.5em"
                            color="blue"
                            icon="star"
                            class="q-pl-xs  q-pt-sm"
                        />
                        <q-tooltip  content-style="font-size: .8rem" :offset="[10, 10]">
                            Calificación {{calificacion}} estrellas <br/>
                            **Nota: La calificación es otorgada por los participantes de un plan creado por ti.
                        </q-tooltip>
                    </div>
                    <div class="q-px-md q-py-xs">
                        <div class="row justify-between">
                            <div>
                                <div class="row text-grey-8 q-pt-sm" v-if="user.edadPriv">
                                    <div class="text-bold q-pr-xs"><q-icon name="child_care" size="25px"><q-tooltip>Edad</q-tooltip></q-icon></div>
                                    <div >{{user.age}} años</div>
                                </div>
                                <div class="row text-grey-8 items-center q-pt-sm">
                                    <div class="text-bold q-pr-xs"><q-icon name="female" size="25px"><q-tooltip>Género</q-tooltip></q-icon></div>
                                    <div>{{user.gender}}</div>
                                </div>
                            </div>
                            <div class="text-grey-8 q-pt-sm" v-if="user.comunidad">
                                <div class="text-bold"><q-icon name="warehouse" size="25px"><q-tooltip>Comunidad autónoma natal</q-tooltip></q-icon></div>
                                <div>{{user.comunidad}}</div>
                            </div>
                        </div>
                    <div class="text-grey-8 row items-center q-pt-sm" v-if="user.description">
                        <div class="q-pr-sm"><q-icon name="description" size="25px"><q-tooltip>Descripción</q-tooltip></q-icon>{{user.description}}</div>
                    </div>
                    </div>
          </q-card>
            </div>
            <!-- Q-card para dispositivos moviles -->
            <div v-else class="columns items-center justify-center" style="width: 100%; height: 294px;">
              <q-card class="" style="border-radius: 10px; width: 100%; height: 100%; ">
                    <div class="bg-primary q-mb-xs" style="padding: 5px 0;">
                        <div class="title-perfil">Resumen Perfil: </div>
                    </div>
                    <div class="title-name">{{user.name}} {{user.last_name}}</div>
                    <div v-if="user.quedadas && calificacion===0" class="q-px-md row">
                        <div class="columns items-center justify-center q-pt-sm" style="height: 15px;" >
                            <p style="font-size: 15px; font-style: italic;">Karma:</p>
                        </div>
                        <q-rating
                            v-model="calificacion"
                            readonly
                            size="1.5em"
                            color="blue"
                            icon="star"
                            class="q-pl-xs q-pt-sm"
                        />
                        <q-tooltip  content-style="font-size: .8rem" :offset="[10, 10]">
                            Calificación {{calificacion}} estrellas <br/>
                            **Nota: La calificación es otorgada por los participantes de un plan creado por ti.
                        </q-tooltip>
                    </div>
                    <div class="q-px-md q-py-xs">
                        <div class="row justify-between">
                            <div>
                                <div class="row text-grey-8 q-pt-sm">
                                    <div class="text-bold q-pr-xs"><q-icon name="child_care" size="25px"><q-tooltip>Edad</q-tooltip></q-icon></div>
                                    <div>{{user.age}} años</div>
                                </div>
                                <div class="row text-grey-8 q-pt-sm">
                                    <div class="text-bold q-pr-xs"><q-icon name="female" size="25px"><q-tooltip>Género</q-tooltip></q-icon></div>
                                    <div>{{user.gender}}</div>
                                </div>
                            </div>
                            <div class="text-grey-8 q-pt-sm" v-if="user.comunidad">
                                <div class="text-bold"><q-icon name="warehouse" size="25px"><q-tooltip>Comunidad autónoma natal</q-tooltip></q-icon></div>
                                <div>{{user.comunidad}}</div>
                            </div>
                        </div>
                    <div class="text-grey-8 q-pt-sm" v-if="user.description">
                        <div class="row items-center">
                        <div class="q-pr-sm"><q-icon name="description" size="25px"><q-tooltip>Descripción</q-tooltip></q-icon>{{user.description}}</div>
                        </div>
                    </div>
                    </div>
          </q-card>
            </div>
            <!-- End divs -->
        </div>
        <!-- Q-card de Planes para Pc -->
        <div v-if="width > 800" class="planes-container">
          <q-card class="q-mb-md row justify-center items-center" style="border-radius: 10px; width: 50%; height: 110.5px;">
            <div class="row justify-center items-center" style="width: 100%;">
              <div style="width: 25%" class="columns items-center justify-center text-center q-pl-md">
                <q-icon name="edit_note" color="grey-8" size="55px" style="border-radius: 50%; border: 4px solid grey;"></q-icon>
              </div>
              <div style="width: 25%" class="columns items-center justify-center text-center q-pr-md">
                <div class="subtitle1">Planes <br> creados</div>
                <div v-if="quedadas.length > 0 && quedadas.length < 10" class="numbers">0{{quedadas.length}}</div>
                <div v-else-if="quedadas.length > 10" class="numbers">{{quedadas.length}}</div>
                <div v-else class="numbers">0</div>
              </div>
              <div style="width: 25%" class="columns items-center justify-center text-center q-pr-md">
                <q-icon name="emoji_people" color="grey-8" size="55px" style="border-radius: 50%; border: 4px solid grey; margin-top: 0.2rem;"></q-icon>
              </div>
              <div style="width: 25%" class="columns items-center justify-center text-center" @click="$router.push('/asistidos')">
                <div class="subtitle1">Planes <br> asistidos</div>
                <div v-if="asistidos.length > 0 && asistidos.length < 10" class="numbers">0{{asistidos.length}}</div>
                <div v-else-if="asistidos.length > 10" class="numbers">{{asistidos.length}}</div>
                <div v-else class="numbers">0</div>
              </div>
            </div>
            </q-card>
            <q-card class="q-mb-md row justify-center items-center" style="border-radius: 10px; width: 50%; height: 110.5px;">
              <div class="row justify-center items-center" style="width: 100%;">
                <div class="columns items-center justify-center text-center q-pt-sm" style="width: 33%;">
                    <div class="subtitle2">Publicaciones</div>
                    <div v-if="publicaciones > 0 && publicaciones < 10" class="numbers2">0{{publicaciones.length}}</div>
                    <div v-else-if="publicaciones > 10" class="numbers2">{{publicaciones.length}}</div>
                    <div v-else class="numbers2">0</div>
                </div>
                <q-separator vertical />
                <div class="text-center q-px-md q-pt-sm" style="width: 33%;" @click="$router.push('/seguidores/' + user._id)">
                    <div class="subtitle2">Seguidores</div>
                    <div v-if="seguidores > 0 && seguidores < 10" class="numbers2">0{{seguidores}}</div>
                    <div v-else-if="seguidores > 10" class="numbers2">{{seguidores}}</div>
                    <div v-else class="numbers2">0</div>
                </div>
                <q-separator vertical />
                <div class="text-center q-pt-sm q-pl-sm" style="width: 33%;" @click="$router.push('/seguidos/' + user._id)">
                    <div class="subtitle2">Seguidos</div>
                    <div v-if="seguidos > 0 && seguidos < 10" class="numbers2">0{{seguidos}}</div>
                    <div v-else-if="seguidos > 10" class="numbers2">{{seguidos}}</div>
                    <div v-else class="numbers2">0</div>
                </div>
              </div>
            </q-card>
        </div>
        <!-- Q-card de Planes para dispositivos moviles -->
        <div v-else class="planes-container-responsive">
          <q-card class="q-mb-md columns justify-center items-center q-pt-md" style="border-radius: 10px; width: 100%;">
            <div class="row justify-center items-center">
              <div style="width: 25%" class="columns items-center justify-center text-center ">
                <q-icon name="edit_note" color="grey-8" size="55px" style="border-radius: 50%; border: 4px solid grey;"></q-icon>
              </div>
              <div style="width: 25%" class="columns items-center justify-center text-center ">
                <div class="subtitle1-responsive">Planes <br> creados</div>
                <div v-if="quedadas.length > 0 && quedadas.length < 10" class="numbers2" style="width: 100%">0{{quedadas.length}}</div>
                <div v-else-if="quedadas.length > 10" class="numbers2" style="width: 100%">{{quedadas.length}}</div>
                <div v-else class="numbers2" style="width: 100%">0</div>
              </div>
              <div style="width: 25%" class="columns items-center justify-center text-center ">
                <q-icon name="emoji_people" color="grey-8" size="55px" style="border-radius: 50%; border: 4px solid grey; margin-top: 0.2rem;"></q-icon>
              </div>
              <div style="width: 25%" class="columns items-center justify-center text-center" @click="$router.push('/asistidos')">
                <div class="subtitle1-responsive">Planes <br> asistidos</div>
                <div v-if="asistidos.length > 0 && asistidos.length < 10" class="numbers2" style="width: 100%">0{{asistidos.length}}</div>
                <div v-else-if="asistidos.length > 10" class="numbers2" style="width: 100%">{{asistidos.length}}</div>
                <div v-else class="numbers2" style="width: 100%">0</div>
              </div>
            </div>
            </q-card>
            <q-card class="q-mb-md columns justify-center items-center" style="border-radius: 10px; width: 100%;">
              <div class="row justify-center items-center">
                <div class="text-center q-pt-sm" style="width: 33%;">
                    <div class="subtitle2-responsive">Publicaciones</div>
                    <div v-if="publicaciones > 0 && publicaciones < 10" class="numbers2" style="width: 100%">0{{publicaciones.length}}</div>
                    <div v-else-if="publicaciones > 10" class="numbers2" style="width: 100%">{{publicaciones.length}}</div>
                    <div v-else class="numbers2" style="width: 100%">0</div>
                </div>
                <q-separator vertical />
                <div class="text-center q-pt-sm" style="width: 33%;" @click="$router.push('/seguidores/' + user._id)">
                    <div class="subtitle2-responsive">Seguidores</div>
                    <div v-if="seguidores > 0 && seguidores < 10" class="numbers2" style="width: 100%">0{{seguidores}}</div>
                    <div v-else-if="seguidores > 10" class="numbers2" style="width: 100%">{{seguidores}}</div>
                    <div v-else style="width: 100%" class="numbers2">0</div>
                </div>
                <q-separator vertical />
                <div class="text-center q-pt-sm" style="width: 33%;" @click="$router.push('/seguidos/' + user._id)">
                    <div class="subtitle2-responsive">Seguidos</div>
                    <div v-if="seguidos > 0 && seguidos < 10" class="numbers2" style="width: 100%">0{{seguidos}}</div>
                    <div v-else-if="seguidos > 10" class="numbers2" style="width: 100%">{{seguidos}}</div>
                    <div v-else style="width: 100%" class="numbers2">0</div>
                </div>
              </div>
            </q-card>
        </div>
      <!-- Fin Q-card Planes -->
        <div class="full-width q-mt-md">
          <q-card style="border-radius: 10px; padding-top: 6px;">
            <div class="full-width q-px-lg q-py-md row justify-between items-center">
              <span class="text-bold text-h6">Listado de intereses</span>
            </div>
            <div class="container-intereses" style="display: flex; justify-content: space-around; height: 100%; width: 100%;">
              <div class="q-py-sm" style="height: 100%; width: 230px;">
                <span class="text-bold row justify-start items-center">
                  <q-icon name="live_tv" class="q-mr-xs" size="20px"/>
                  <span>Películas favoritas </span>
                </span>
                <p v-if="user.peliculas" class="text-grey-8" style="margin-top: 15px;">
                  {{user.peliculas}}
                </p>
                <p v-else class="text-grey-8" style="margin-top: 15px;">
                  Sin peliculas cargadas por el momento.
                </p>
              </div>
              <div class="q-py-sm" style="height: 100%; width: 230px;">
                <span class="text-bold row justify-start items-center">
                <q-icon name="headphones" class="q-mr-xs" size="20px"/>
                <span>
                  Artista y estilo musical favorito
                </span>
              </span>
              <p v-if="user.artista" class="text-grey-8" style="margin-top: 15px;">
                  {{user.artista }}
                </p>
                <p v-else class="text-grey-8" style="margin-top: 15px;">
                  Sin artistas y estilo musical cargados por el momento.
                </p>

              </div>
              <div class="q-py-sm" style="height: 100%; width: 230px;">
                <span class="text-bold row justify-start items-center">
                  <q-icon name="sports_basketball" class="q-mr-xs" size="20px"/>
                  <span>
                Deportes favoritos
                </span>
                </span>
                <p v-if="user.deportes" class="text-grey-8" style="margin-top: 15px;">
                  {{ user.deportes }}
                </p>
                <p v-else class="text-grey-8" style="margin-top: 15px;">
                  Sin deportes favoritos cargados por el momento
                </p>
              </div>
            </div>
          </q-card>
        </div>
        <div class="full-width q-mt-lg">
        <div class="text-h5 text-bold text-grey-8">Planes activos</div>
        <div v-if="!activos.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes activos</div>
        <q-scroll-area v-else class="q-mb-xl" horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <CardPlan
            v-for="(item, index) in activos" :key="index"
            :thumbStyleScroll=null
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="logueado"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Planes organizados</div>
        <div v-if="!quedadas.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes actualmente</div>
        <q-scroll-area class="q-mb-xl" v-else horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <CardPlan
            v-for="(item, index) in quedadas" :key="index"
            :thumbStyleScroll=null
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="logueado"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Planes asistidos</div>
        <div class="q-px-md text-caption text-grey-8">Historial de eventos asistidos</div>
        <div v-if="!asistidos.length" class="column justify-center text-center text-grey text-h6 text-italic" style="height: 310px">Sin planes asistidos</div>
        <q-scroll-area class="q-mb-xl" v-else horizontal style="height: 310px" :thumb-style="thumbStyle">
          <div class="row no-wrap q-px-sm q-py-sm">
            <CardPlan
            v-for="(item, index) in asistidos" :key="index"
            :thumbStyleScroll=null
            :baseuQuedada="baseuQuedada"
            :baseuPerfil="baseuPerfil"
            :user="logueado"
            :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <q-list class="full-width">
        <div class="text-h5 text-bold text-grey-8">Publicaciones</div>
        <div v-if="!publicaciones.length" class="text-center q-py-lg">No hay publicaciones actualmente</div>
        <div v-for="(item, index) of publicaciones" :key="index" class="q-pt-md" >
          <q-item class="column" @click="publicidadSelec = item, item.totalReacciones > 0 ? verPublicacion = true : ''" clickable>
            <q-item class="q-pa-none q-mb-md">
              <q-item-section avatar>
                <q-avatar size="50px">
                  <q-img :src="user._id ? baseuPerfil + user._id : ''" class="full-height"/>
                  <div class="absolute-bottom-right" style="margin-right: -10px">
                    <q-avatar size="30px" class="">
                      <q-img :src="user.animal_img ? 'animales/' + user.animal_img : ''" style="border-radius: 100%; height: 100%"/>
                    </q-avatar>
                  </div>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1 text-bold">{{user.name}} {{user.last_name}}</q-item-label>
                <q-item-label class="text-grey">{{item.date}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item-section class="q-mb-sm">
              <q-item-label class="text-grey-8" lines="3">{{item.description}}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-pl-sm">
            <q-btn flat dense no-caps color="primary" icon="pets" label="Reacciones"
            @click="publicidadSelec = item, verReacciones = true">
              <q-badge v-if="item.totalReacciones > 0" outline color="primary" floating transparent>
                {{item.totalReacciones}}
              </q-badge>
            </q-btn>
          </div>
          <q-separator color="grey" class="q-mx-md q-mb-sm"/>
        </div>
      </q-list>
      <q-page-sticky v-if="showChat" position="bottom-right" :offset="[10, 25]">
        <q-btn round flat size="25px" color="white" style="background: linear-gradient(to top, #0065d8, #d80048);"
        @click="goChat()">
          <q-avatar size="42px">
            <img src="chat3 2.png">
          </q-avatar>
        </q-btn>
      </q-page-sticky>

      <q-dialog v-model="verPublicacion">
        <q-card class="q-pa-sm" style="width:100%">
          <div class="text-center text-h6 q-pb-sm">Reacciones de la publicación</div>
          <div class="row justify-around">
            <q-avatar v-for="(item, index) of publicidadSelec.reacciones" :key="index" size="90px" clickable v-ripple>
              <img :src="'animales/' + item.img" style="border-radius: 100%; height:100%" />
              <q-badge color="primary" floating transparent>
                {{item.total}}
              </q-badge>
            </q-avatar>
          </div>
        </q-card>
      </q-dialog>

      <q-dialog v-model="verReacciones">
        <q-card class="q-pa-sm" style="width:100%">
          <div class="text-center text-h6 q-pb-sm">Reacciona con estos</div>
          <div class="row justify-around">
            <q-avatar v-for="(item, index) of animales" :key="index" size="90px" clickable v-ripple
            @click="reaccionar(item)">
              <img :src="'animales/' + item.img" style="border-radius: 100%; height:100%" />
            </q-avatar>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import CardPlan from '../../components/CardPlan.vue'
export default {
  components: { SideBar, RightSidebar, CardPlan },
  data () {
    return {
      verReacciones: false,
      verPublicacion: false,
      description: false,
      baseuPerfil: '',
      baseuQuedada: '',
      buscar: '',
      seguidores: 0,
      seguidos: 0,
      calificacion: 0,
      user: {},
      logueado: {},
      publicidadSelec: {},
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      quedadas: [],
      asistidos: [],
      activos: [],
      animales: [],
      publicaciones: [],
      showChat: false,
      width: '',
      newWidth: ''
    }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.getUserById(this.$route.params.id)
    this.getlogueado()
    this.getAnimales()
    this.getQuedadas(this.$route.params.id)
    this.getSeguidoresSeguidos(this.$route.params.id)
    this.getPublicaciones(this.$route.params.id)
    this.getCalificacion(this.$route.params.id)
    this.followsVerificator(this.$route.params.id)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    width: {
      handler (newValue, old) {
        if (newValue > 800) {
          this.newWidth = 'containers-perfil'
        } else {
          this.newWidth = 'containers-perfil-responsive'
        }
      }
    }
  },
  methods: {
    getlogueado () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.logueado = res
        }
      })
    },
    getUserById (id) {
      this.$api.get('user_by_id/' + id).then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    getCalificacion (id) {
      this.$api.get('calificacion/' + id).then(v => {
        if (v) {
          this.calificacion = v
        }
      })
    },
    getAsistidos (id) {
      this.$api.get('evetos_asistidos/' + id).then(v => {
        if (v) {
          this.getActivos(this.$route.params.id)
          this.asistidos = v
        }
      })
    },
    getActivos (id) {
      this.$api.get('evetos_activos/' + id).then(v => {
        if (v) {
          this.activos = v
        }
      })
    },
    getPublicaciones (id) {
      this.$api.get('publications_user/' + id).then(res => {
        if (res) {
          this.publicaciones = res
        }
      })
    },
    async getAnimales () {
      await this.$api.get('animales').then(res => {
        if (res) {
          this.animales = res
        }
      })
    },
    getSeguidoresSeguidos (id) {
      this.$api.get('seguidores_seguidos/1/' + id).then(res => {
        if (res) {
          this.seguidores = res.length
        }
      })
      this.$api.get('seguidores_seguidos/2/' + id).then(res => {
        if (res) {
          this.seguidos = res.length
        }
      })
    },
    getQuedadas (id) {
      this.$api.get('quedadas_user/' + id).then(res => {
        if (res) {
          this.getAsistidos(this.$route.params.id)
          this.quedadas = res
        }
      })
    },
    reaccionar (data) {
      this.$q.loading.show({})
      this.$api.post('reaccionar/' + this.publicidadSelec._id, data).then(res => {
        if (res) {
          this.getPublicaciones(this.$route.params.id)
          this.verReacciones = false
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async seguir (item) {
      const text = item.seguido ? 'dejar de' : ''
      this.$q.dialog({
        title: 'Confirma',
        message: `¿Seguro deseas ${text} seguir a ${item.name + ' ' + (item.last_name ? item.last_name : '')}?`,
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'positive' },
        persistent: true
      }).onOk(() => {
        const data = {
          seguido: item._id
        }
        this.$api.post('seguir_user', data).then(res => {
          if (res) {
            this.getUserById(this.$route.params.id)
            this.getSeguidoresSeguidos(this.$route.params.id)
            this.followsVerificator(this.$route.params.id)
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    asistir (data, bool) {
      const text = bool ? 'asistir a' : 'cancelar para'
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas ' + text + ' este evento?',
        cancel: { label: 'No', color: 'secondary' },
        ok: { label: 'Si', color: 'primary' },
        persistent: true
      }).onOk(() => {
        this.$api.post('asistir/' + data._id, { asistencia: bool }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Podras ver tus quedadas en el modulo de Asistidos',
              color: 'positive'
            })
            this.getQuedadas(this.$route.params.id)
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    followsVerificator (id) {
      this.$api.get('follow_verificator/' + id).then(res => {
        if (res.status === 200) {
          this.showChat = true
        } else {
          this.showChat = false
        }
      }).catch((error) => console.log(error, 'error'))
    },
    goChat () {
      this.$api.post('chat_privado/' + this.user._id).then(res => {
        if (res) {
          this.$router.push('/chat/' + res._id)
        }
      })
    },
    handleResize () {
      this.width = window.innerWidth
    }
  }
}
</script>

<style scoped lang="scss">
  @import url(../../scss/user/Inicio.scss);
  .cropper {
    height: 600px;
    width: 600px;
    background: #DDD;
  }

  .container-divs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3.2rem;
  }

  .containers-perfil {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .containers-perfil-responsive {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .title-perfil {
    font-size: 23px;
    color: #fff;
    padding-left: 1rem;
    font-weight: bold;
    text-align: left;
  }

  .title-name {
    font-size: 23px;
    padding-top: 0.5rem;
    padding-left: 1rem;
    font-weight: bold;
  }

  .planes-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .planes-container-responsive {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }

  .numbers {
    font-size: 35px;
    font-weight: bold;
    text-align: left;
    color: grey;
  }
  .numbers2 {
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    color: grey;
  }
  .columns2 {
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    color: black;
  }

  .subtitle1 {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    color: black;
  }
  .subtitle1-responsive {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: grey;
  }
  .subtitle2 {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: black;
  }
  .subtitle2-responsive {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: grey;
  }

  .container-intereses {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>
