/* Solicitar eliminar perfil; pedir darse de baja bloquea al usuario y elimina
el perfil en 7 días. tener en consideración que el inicio de sesión nuevo
reactiva la cuenta y se cancela el proceso. */
<template>
  <div class="inicio_container q-px-sm">
    <div class="inicio_col_left">
      <SideBar />
    </div>
    <div class="inicio_col_right">
      <div class="fixed">
        <RightSidebar :muro="true" />
      </div>
    </div>
    <div class="inicio columns q-mt-lg">
      <div :class="newWidth">
        <div class="container-divs" style="width: 50%; height: 100%">
          <div class="container-divs">
            <q-avatar size="200px" class="bg-grey-5" style="z-index: 9">
              <q-badge
                class="bg-transparent"
                floating
                style="border-radius: 100%; width: 200px; height: 200px"
              >
                <q-file
                  class="bg-transparent cursor-pointer"
                  borderless
                  v-model="perfile"
                  @input="changeImg()"
                  accept=".jpg, image/*"
                  style="
                    z-index: 7;
                    border-radius: 100%;
                    width: 200px;
                    height: 200px;
                    font-size: 0px;
                  "
                >
                  <template v-slot:prepend>
                    <div class="absolute-center" @click.stop>
                      <!-- <q-icon color="white" size="35px" name="photo_camera" class="cursor-pointer"/> -->
                    </div>
                  </template>
                </q-file>
              </q-badge>
              <q-img
                :src="user._id ? baseuPerfil + user._id : ''"
                style="height: 100%"
              />
              <q-badge
                class="bg-transparent"
                floating
                style="
                  border-radius: 100%;
                  margin-top: 140px;
                  width: 70px;
                  height: 70px;
                "
              >
                <q-file
                  class="bg-grey-5"
                  borderless
                  v-model="perfile"
                  @input="changeImg()"
                  accept=".jpg, image/*"
                  style="
                    z-index: 7;
                    border-radius: 100%;
                    width: 100px;
                    font-size: 0px;
                  "
                >
                  <template v-slot:prepend>
                    <div class="absolute-center" @click.stop>
                      <q-icon
                        color="white"
                        size="35px"
                        name="photo_camera"
                        class="cursor-pointer"
                      />
                    </div>
                  </template>
                </q-file>
              </q-badge>
            </q-avatar>
          </div>
          <div
            class="row justify-between items-center q-px-sm"
            style="width: 100%"
          >
            <div v-if="width > 800" class="">
              <q-avatar size="50px" class="q-mr-sm">
                <q-img
                  :src="user.animal_img ? 'animales/' + user.animal_img : ''"
                  style="border-radius: 100%; height: 100%"
                />
              </q-avatar>
              <q-avatar v-if="medalla" size="50px" class="">
                <q-img
                  :src="medalla"
                  style="border-radius: 100%; height: 100%"
                />
              </q-avatar>
              <q-avatar v-else size="50px" class="">
                <q-img
                  :src="'/oro-modified.jpg'"
                  style="border-radius: 100%; height: 100%"
                ></q-img>
                <q-tooltip>Aún no tienes medallas</q-tooltip>
              </q-avatar>
            </div>
            <div v-else class="" style="width: 100%">
              <div style="width: 100%" class="row items-center justify-center">
                <q-avatar size="50px">
                  <q-img
                    :src="user.animal_img ? 'animales/' + user.animal_img : ''"
                    style="border-radius: 100%; height: 100%"
                  />
                </q-avatar>
                <q-avatar v-if="medalla" size="50px" class="">
                  <q-img
                    :src="medalla"
                    style="border-radius: 100%; height: 100%"
                  />
                </q-avatar>
                <q-avatar v-else size="50px" class="">
                  <q-img
                    :src="'/oro-modified.jpg'"
                    style="border-radius: 100%; height: 100%"
                  ></q-img>
                  <q-tooltip>Aún no tienes medallas</q-tooltip>
                </q-avatar>
              </div>
            </div>
            <!-- Boton para dispositivos móviles -->
            <div
              v-if="width < 800"
              class="q-mt-xl full-width columns items-center justify-center"
              style="width: 100%"
            >
              <q-btn
                no-caps
                color="primary"
                label="Nuevo plan"
                style="border-radius: 10px; width: 100%; height: 42px"
                @click="$router.push('/nueva_quedada')"
                class="q-mb-md"
              />
              <q-btn
                no-caps
                color="primary"
                label="Editar perfil"
                style="border-radius: 10px; width: 100%; height: 42px"
                @click="$router.push('/perfil/' + user._id)"
                class="full-width"
              />
            </div>
            <!-- Boton para Pc -->
            <div v-else>
              <q-btn
                no-caps
                color="primary"
                label="Nuevo plan"
                style="border-radius: 10px; width: 120px; height: 42px"
                @click="$router.push('/nueva_quedada')"
              />
              <q-btn
                no-caps
                color="primary"
                label="Editar perfil"
                style="
                  border-radius: 10px;
                  width: 120px;
                  height: 42px;
                  margin-left: 0.3rem;
                "
                @click="$router.push('/perfil/' + user._id)"
              />
              <q-btn
                no-caps
                color="primary"
                label="Darse de baja"
                style="
                  border-radius: 10px;
                  width: max-content;
                  height: 42px;
                  margin-left: 0.3rem;
                "
                @click="darDeBajaCuenta"
              />
            </div>
          </div>
        </div>
        <!-- Between divs -->
        <!-- Q-card para Pc -->
        <div
          v-if="width > 800"
          class="columns items-center justify-center"
          style="width: 50%; height: 294px"
        >
          <q-card
            class=""
            style="border-radius: 10px; width: 100%; height: 100%"
          >
            <div class="bg-primary q-mb-xs" style="padding: 5px 0">
              <div class="title-perfil">Resumen Perfil:</div>
            </div>
            <div class="title-name">{{ user.name }} {{ user.last_name }}</div>
            <div v-if="user.quedadas && calificacion === 0" class="q-px-md row">
              <div
                class="columns items-center justify-center q-pt-sm"
                style="height: 15px"
              >
                <p style="font-size: 15px; font-style: italic; padding: 10px 0;">Karma:</p>
              </div>
              <q-rating
                v-model="calificacion"
                readonly
                size="1.5em"
                color="blue"
                icon="star"
                class="q-pl-xs q-pt-sm"
              />
              <q-tooltip content-style="font-size: .8rem" :offset="[10, 10]">
                Calificación {{ calificacion }} estrellas <br />
                **Nota: La calificación es otorgada por los participantes de un
                plan creado por ti.
              </q-tooltip>
            </div>
                <!-- aER-->
    <div style="width:100%; padding: 10px 15px 0 15px;" v-if="user && buscarInsignaPorUsuario(user._id)">
    <q-avatar style="margin-right: 10px">
        <img
        v-if="
        user
        && buscarInsignaPorUsuario(user._id)
        && buscarInsignaPorUsuario(user._id).image"
            :src="baseuInsigna + buscarInsignaPorUsuario(user._id).image"
            alt="Imagen de Insignia"
        />
    </q-avatar>
    <q-tooltip
                content-style="font-size: .8rem"
                :offset="[10, 10]"
                v-if="
                  user &&
                  buscarInsignaPorUsuario(user._id) &&
                  buscarInsignaPorUsuario(user._id).name &&
                  buscarInsignaPorUsuario(user._id).description
                "
              >
                Insigna {{ buscarInsignaPorUsuario(user._id).name }} <br />
                **Nota: {{ buscarInsignaPorUsuario(user._id).description }}
              </q-tooltip>
</div>

            <div class="q-px-md q-py-xs">
              <div class="row justify-between">
                <div>
                  <div class="row text-grey-8 q-pt-sm">
                    <div class="text-bold q-pr-xs">
                      <q-icon name="child_care" size="25px"
                        ><q-tooltip>Edad</q-tooltip></q-icon
                      >
                    </div>
                    <div>{{ user.age }} años</div>
                      <span v-if="!user.edadPriv">
        Edad pública
      </span>
      <span v-else>
        Edad privada
      </span>
                  </div>
                  <div class="row text-grey-8 items-center q-pt-sm">
                    <div class="text-bold q-pr-xs">
                      <q-icon name="female" size="25px"
                        ><q-tooltip>Género</q-tooltip></q-icon
                      >
                    </div>
                    <div>{{ user.gender }}</div>
                  </div>
                </div>
                <div class="text-grey-8 q-pt-sm" v-if="user.comunidad">
                  <div class="text-bold">
                    <q-icon name="warehouse" size="25px"
                      ><q-tooltip>Comunidad autónoma natal</q-tooltip></q-icon
                    >
                  </div>
                  <div>{{ user.comunidad }}</div>
                </div>
              </div>
              <div
                class="text-grey-8 row items-center q-pt-sm"
                v-if="user.description"
              >
                <div class="q-pr-sm">
                  <q-icon name="description" size="25px"
                    ><q-tooltip>Descripción</q-tooltip></q-icon
                  >{{ user.description }}
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <!-- Q-card para dispositivos moviles -->
        <div
          v-else
          class="columns items-center justify-center"
          style="width: 100%; height: 294px"
        >
          <q-card
            class=""
            style="border-radius: 10px; width: 100%; height: 100%"
          >
            <div class="bg-primary q-mb-xs" style="padding: 5px 0">
              <div class="title-perfil">Resumen Perfil:</div>
            </div>
            <div class="title-name">{{ user.name }} {{ user.last_name }}</div>
            <div v-if="user.quedadas && calificacion === 0" class="q-px-md row">
              <div
                class="columns items-center justify-center q-pt-sm"
                style="height: 15px"
              >
                <p style="font-size: 15px; font-style: italic">Karma:</p>
              </div>
              <q-rating
                v-model="calificacion"
                readonly
                size="1.5em"
                color="blue"
                icon="star"
                class="q-pl-xs q-pt-sm"
              />
              <q-tooltip content-style="font-size: .8rem" :offset="[10, 10]">
                Calificación {{ calificacion }} estrellas <br />
                **Nota: La calificación es otorgada por los participantes de un
                plan creado por ti.
              </q-tooltip>
            </div>
            <div class="q-px-md q-py-xs">
              <div class="row justify-between">
                <div>
                  <div class="row text-grey-8 q-pt-sm">
                    <div class="text-bold q-pr-xs">
                      <q-icon name="child_care" size="25px"
                        ><q-tooltip>Edad</q-tooltip></q-icon
                      >
                    </div>
                    <div>{{ user.age }} años <div v-if = "user.edadPriv"></div>  </div>
                  </div>
                  <div class="row text-grey-8 q-pt-sm">
                    <div class="text-bold q-pr-xs">
                      <q-icon name="female" size="25px"
                        ><q-tooltip>Género</q-tooltip></q-icon
                      >
                    </div>
                    <div>{{ user.gender }}</div>
                  </div>
                </div>
                <div class="text-grey-8 q-pt-sm" v-if="user.comunidad">
                  <div class="text-bold">
                    <q-icon name="warehouse" size="25px"
                      ><q-tooltip>Comunidad autónoma natal</q-tooltip></q-icon
                    >
                  </div>
                  <div>{{ user.comunidad }}</div>
                </div>
              </div>
              <div class="text-grey-8 q-pt-sm" v-if="user.description">
                <div class="row items-center">
                  <div class="q-pr-sm">
                    <q-icon name="description" size="25px"
                      ><q-tooltip>Descripción</q-tooltip></q-icon
                    >{{ user.description }}
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <!-- End divs -->
      </div>
      <!-- Q-card de Planes para Pc -->
      <div v-if="width > 800" class="planes-container">
        <q-card
          class="q-mb-md row justify-center items-center"
          style="border-radius: 10px; width: 50%; height: 110.5px"
        >
          <div class="row justify-center items-center" style="width: 100%">
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center q-pl-md"
            >
              <q-icon
                name="edit_note"
                color="grey-8"
                size="55px"
                style="border-radius: 50%; border: 4px solid grey"
              ></q-icon>
            </div>
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center q-pr-md"
            >
              <div class="subtitle1">
                Planes <br />
                creados
              </div>
              <div
                v-if="allQuedadas.length > 0 && allQuedadas.length < 10"
                class="numbers"
              >
                0{{ allQuedadas.length }}
              </div>
              <div v-else-if="allQuedadas.length > 10" class="numbers">
                {{ allQuedadas.length }}
              </div>
              <div v-else class="numbers">0</div>
            </div>
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center q-pr-md"
            >
              <q-icon
                name="emoji_people"
                color="grey-8"
                size="55px"
                style="
                  border-radius: 50%;
                  border: 4px solid grey;
                  margin-top: 0.2rem;
                "
              ></q-icon>
            </div>
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center"
              @click="$router.push('/asistidos')"
            >
              <div class="subtitle1">
                Planes <br />
                asistidos
              </div>
              <div
                v-if="asistidos.length > 0 && asistidos.length < 10"
                class="numbers"
              >
                0{{ asistidos.length }}
              </div>
              <div v-else-if="asistidos.length > 10" class="numbers">
                {{ asistidos.length }}
              </div>
              <div v-else class="numbers">0</div>
            </div>
          </div>
        </q-card>
        <q-card
          class="q-mb-md row justify-center items-center"
          style="border-radius: 10px; width: 50%; height: 110.5px"
        >
          <div class="row justify-center items-center" style="width: 100%">
            <div
              class="columns items-center justify-center text-center q-pt-sm"
              style="width: 33%"
            >
              <div class="subtitle2">Publicaciones</div>
              <div
                v-if="publicaciones > 0 && publicaciones < 10"
                class="numbers2"
              >
                0{{ publicaciones.length }}
              </div>
              <div v-else-if="publicaciones > 10" class="numbers2">
                {{ publicaciones.length }}
              </div>
              <div v-else class="numbers2">0</div>
            </div>
            <q-separator vertical />
            <div
              class="text-center q-px-md q-pt-sm"
              style="width: 33%"
              @click="$router.push('/seguidores/' + user._id)"
            >
              <div class="subtitle2">Seguidores</div>
              <div v-if="seguidores > 0 && seguidores < 10" class="numbers2">
                0{{ seguidores }}
              </div>
              <div v-else-if="seguidores > 10" class="numbers2">
                {{ seguidores }}
              </div>
              <div v-else>0</div>
            </div>
            <q-separator vertical />
            <div
              class="text-center q-pt-sm q-pl-sm"
              style="width: 33%"
              @click="$router.push('/seguidos/' + user._id)"
            >
              <div class="subtitle2">Seguidos</div>
              <div v-if="seguidos > 0 && seguidos < 10" class="numbers2">
                0{{ seguidos }}
              </div>
              <div v-else-if="seguidos > 10" class="numbers2">
                {{ seguidos }}
              </div>
              <div v-else>0</div>
            </div>
          </div>
        </q-card>
      </div>
      <!-- Q-card de Planes para dispositivos moviles -->
      <div v-else class="planes-container-responsive">
        <q-card
          class="q-mb-md columns justify-center items-center q-pt-md"
          style="border-radius: 10px; width: 100%"
        >
          <div class="row justify-center items-center">
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center"
            >
              <q-icon
                name="edit_note"
                color="grey-8"
                size="55px"
                style="border-radius: 50%; border: 4px solid grey"
              ></q-icon>
            </div>
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center"
            >
              <div class="subtitle1-responsive">
                Planes <br />
                creados
              </div>
              <div
                v-if="allQuedadas.length > 0 && allQuedadas.length < 10"
                class="numbers2"
                style="width: 100%"
              >
                0{{ allQuedadas.length }}
              </div>
              <div
                v-else-if="allQuedadas.length > 10"
                class="numbers2"
                style="width: 100%"
              >
                {{ allQuedadas.length }}
              </div>
              <div v-else class="numbers2" style="width: 100%">0</div>
            </div>
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center"
            >
              <q-icon
                name="emoji_people"
                color="grey-8"
                size="55px"
                style="
                  border-radius: 50%;
                  border: 4px solid grey;
                  margin-top: 0.2rem;
                "
              ></q-icon>
            </div>
            <div
              style="width: 25%"
              class="columns items-center justify-center text-center"
              @click="$router.push('/asistidos')"
            >
              <div class="subtitle1-responsive">
                Planes <br />
                asistidos
              </div>
              <div
                v-if="asistidos.length > 0 && asistidos.length < 10"
                class="numbers2"
                style="width: 100%"
              >
                0{{ asistidos.length }}
              </div>
              <div
                v-else-if="asistidos.length > 10"
                class="numbers2"
                style="width: 100%"
              >
                {{ asistidos.length }}
              </div>
              <div v-else class="numbers2" style="width: 100%">0</div>
            </div>
          </div>
        </q-card>
        <q-card
          class="q-mb-md columns justify-center items-center"
          style="border-radius: 10px; width: 100%"
        >
          <div class="row justify-center items-center">
            <div class="text-center q-pt-sm" style="width: 33%">
              <div class="subtitle2-responsive">Publicaciones</div>
              <div
                v-if="publicaciones > 0 && publicaciones < 10"
                class="numbers2"
                style="width: 100%"
              >
                0{{ publicaciones.length }}
              </div>
              <div
                v-else-if="publicaciones > 10"
                class="numbers2"
                style="width: 100%"
              >
                {{ publicaciones.length }}
              </div>
              <div v-else class="numbers2" style="width: 100%">0</div>
            </div>
            <q-separator vertical />
            <div
              class="text-center q-pt-sm"
              style="width: 33%"
              @click="$router.push('/seguidores/' + user._id)"
            >
              <div class="subtitle2-responsive">Seguidores</div>
              <div
                v-if="seguidores > 0 && seguidores < 10"
                class="numbers2"
                style="width: 100%"
              >
                0{{ seguidores }}
              </div>
              <div
                v-else-if="seguidores > 10"
                class="numbers2"
                style="width: 100%"
              >
                {{ seguidores }}
              </div>
              <div v-else style="width: 100%">0</div>
            </div>
            <q-separator vertical />
            <div
              class="text-center q-pt-sm"
              style="width: 33%"
              @click="$router.push('/seguidos/' + user._id)"
            >
              <div class="subtitle2-responsive">Seguidos</div>
              <div
                v-if="seguidos > 0 && seguidos < 10"
                class="numbers2"
                style="width: 100%"
              >
                0{{ seguidos }}
              </div>
              <div
                v-else-if="seguidos > 10"
                class="numbers2"
                style="width: 100%"
              >
                {{ seguidos }}
              </div>
              <div v-else style="width: 100%">0</div>
            </div>
          </div>
        </q-card>
      </div>
      <!-- Fin Q-card Planes -->
      <div class="full-width q-mt-md">
        <q-card style="border-radius: 10px; padding-top: 6px">
          <div
            class="full-width q-px-lg q-py-md row justify-between items-center"
          >
            <span class="text-bold text-h6">Listado de intereses</span>
            <q-icon
              name="edit"
              class="q-mr-xs cursor-pointer"
              size="20px"
              @click="$router.push('/perfil/' + user._id)"
            >
              <q-tooltip> Editar </q-tooltip></q-icon
            >
          </div>
          <div class="container-intereses" style="display: flex; justify-content: space-around; height: 100%; width: 100%;">
  <div class="q-py-sm" style="flex: 1; max-width: 230px; margin: 0 10px;">
    <span class="text-bold row justify-start items-center">
      <q-icon name="live_tv" class="q-mr-xs" size="20px" />
      <span>Películas favoritas</span>
    </span>
    <p v-if="user.peliculas" class="text-grey-8" style="margin-top: 15px;">
      {{ user.peliculas }}
    </p>
    <p v-else class="text-grey-8" style="margin-top: 15px;">
      Sin películas cargadas por el momento.
    </p>
  </div>
  <div class="q-py-sm" style="flex: 1; max-width: 230px; margin: 0 10px;">
    <span class="text-bold row justify-start items-center">
      <q-icon name="headphones" class="q-mr-xs" size="20px" />
      <span>Artista y estilo musical favorito</span>
    </span>
    <p v-if="user.artista" class="text-grey-8" style="margin-top: 15px;">
      {{ user.artista }}
    </p>
    <p v-else class="text-grey-8" style="margin-top: 15px;">
      Sin artistas y estilo musical cargados por el momento.
    </p>
  </div>
  <div class="q-py-sm" style="flex: 1; max-width: 230px; margin: 0 10px;">
    <span class="text-bold row justify-start items-center">
      <q-icon name="sports_basketball" class="q-mr-xs" size="20px" />
      <span>Deportes favoritos</span>
    </span>
    <p v-if="user.deportes" class="text-grey-8" style="margin-top: 15px;">
      {{ user.deportes }}
    </p>
    <p v-else class="text-grey-8" style="margin-top: 15px;">
      Sin deportes favoritos cargados por el momento.
    </p>
  </div>
</div>

        </q-card>
      </div>
      <div class="full-width q-mt-md">
        <div class="text-h5 text-bold text-grey-8">Mis planes activos</div>
        <div
          v-if="!activos.length"
          class="column justify-center text-center text-grey text-h6 text-italic"
          style="height: 310px"
        >
          Sin planes activos
        </div>
        <q-scroll-area
          v-else
          class="q-mb-xl"
          horizontal
          style="height: 310px"
          :thumb-style="thumbStyle"
        >
          <div class="row no-wrap q-px-sm q-py-sm">
            <!-- Aqui se muestran mis planes activos en las Cards Genericas -->
            <CardPlan
              v-for="(item, index) in activos"
              :key="index"
              :thumbStyleScroll="thumbStyleScroll"
              :baseuQuedada="baseuQuedada"
              :baseuPerfil="baseuPerfil"
              :user="user"
              :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Mis planes organizados</div>
        <div class="q-px-md row items-center q-gutter-sm q-mt-sm">
          <q-btn
            rounded
            outline
            no-caps
            dense
            label="Activos"
            color="primary"
            class="q-px-sm text-body1"
            @click="filtrar(1)"
          />
          <q-btn
            rounded
            outline
            no-caps
            dense
            label="Finalizados"
            color="primary"
            class="q-px-sm text-body1"
            @click="filtrar(2)"
          />
          <q-btn
            rounded
            outline
            no-caps
            dense
            label="Todos"
            color="primary"
            class="q-px- text-body1"
            @click="filtrar(3)"
          />
        </div>
        <div
          v-if="!quedadas.length"
          class="column justify-center text-center text-grey text-h6 text-italic"
          style="height: 310px"
        >
          Sin planes actualmente
        </div>
        <q-scroll-area
          v-else
          class="q-mb-xl"
          horizontal
          style="height: 280px"
          :thumb-style="thumbStyle"
        >
          <div class="row no-wrap q-px-sm q-py-sm">
            <!-- Aqui se muestran Mis Planes Organizados en su correspondiente Card -->
            <MyPlanCards
              v-for="(item, index) in quedadas"
              :key="index"
              :baseuQuedada="baseuQuedada"
              :baseuPerfil="baseuPerfil"
              :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width">
        <div class="text-h5 text-bold text-grey-8">Mis planes asistidos</div>
        <div class="q-px-md text-caption text-grey-8">
          Tu historial de eventos asistidos
        </div>
        <div
          v-if="!asistidos.length"
          class="column justify-center text-center text-grey text-h6 text-italic"
          style="height: 350px"
        >
          Sin planes asistidos
        </div>
        <q-scroll-area
          v-else
          class="q-mb-xl"
          horizontal
          style="height: 260px"
          :thumb-style="thumbStyle"
        >
          <div class="row no-wrap q-px-sm q-py-sm">
            <!-- Aqui se muestran mis planes asistidos en las Cards Genericas -->
            <CardPlan
              v-for="(item, index) in asistidos"
              :key="index"
              :thumbStyleScroll="thumbStyleScroll"
              :baseuQuedada="baseuQuedada"
              :baseuPerfil="baseuPerfil"
              :user="user"
              :item="item"
            />
          </div>
        </q-scroll-area>
      </div>

      <q-list class="q-py-sm full-width" style="margin-bottom: 80px">
        <div class="text-h5 text-bold text-grey-8">Mis publicaciones</div>
        <q-input
          borderless
          autogrow
          class="q-ma-md"
          v-model="publicacion"
          label="¿En qué estás pensando?"
        >
          <template v-slot:prepend>
            <q-avatar size="60px">
              <q-img
                :src="user._id ? baseuPerfil + user._id : ''"
                class="full-height"
              />
              <div class="absolute-bottom-right" style="margin-right: -10px">
                <q-avatar size="30px" class="">
                  <q-img
                    :src="user.animal_img ? 'animales/' + user.animal_img : ''"
                    style="border-radius: 100%; height: 100%"
                  />
                </q-avatar>
              </div>
            </q-avatar>
          </template>
          <template v-slot:append>
            <q-btn
              flat
              round
              icon="reply"
              style="transform: scaleX(-1)"
              @click="publicar()"
            />
          </template>
        </q-input>
        <q-separator color="grey" class="q-mx-md q-mb-sm" />
        <div v-if="!publicaciones.length" class="text-center q-py-lg">
          No hay publicaciones actualmente
        </div>
        <div
          v-for="(item, index) of publicaciones"
          :key="index"
          class="q-pt-md"
        >
          <q-item
            class="column"
            @click="
              ;(publicidadSelec = item),
                item.totalReacciones ? (verPublicacion = true) : ''
            "
            clickable
          >
            <q-item class="q-pa-none q-mb-md">
              <q-item-section avatar>
                <q-avatar size="50px">
                  <q-img :src="baseuPerfil + user._id" class="full-height" />
                  <div
                    class="absolute-bottom-right"
                    style="margin-right: -10px"
                  >
                    <q-avatar size="30px">
                      <q-img
                        :src="
                          user.animal_img ? 'animales/' + user.animal_img : ''
                        "
                        style="border-radius: 100%; height: 100%"
                      />
                    </q-avatar>
                  </div>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1 text-bold"
                  >{{ user.name }} {{ user.last_name }}</q-item-label
                >
                <q-item-label class="text-grey">{{ item.date }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item-section class="q-mb-sm">
              <q-item-label class="text-grey-8" lines="3">{{
                item.description
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-pl-sm">
            <q-btn
              flat
              dense
              no-caps
              color="primary"
              icon="pets"
              label="Reacciones"
              @click=";(publicidadSelec = item), (verReacciones = true)"
            >
              <q-badge
                v-if="item.totalReacciones > 0"
                outline
                color="primary"
                floating
                transparent
              >
                {{ item.totalReacciones }}
              </q-badge>
            </q-btn>
          </div>
          <q-separator color="grey" class="q-mx-md q-mb-sm" />
        </div>
      </q-list>
      <q-dialog v-model="verPublicacion">
        <q-card class="q-pa-sm" style="width: 100%">
          <div class="text-center text-h6 q-pb-sm">
            Reacciones de la publicación
          </div>
          <div class="row justify-around">
            <q-avatar
              v-for="(item, index) of publicidadSelec.reacciones"
              :key="index"
              size="90px"
              clickable
              v-ripple
            >
              <img
                :src="'animales/' + item.img"
                style="border-radius: 100%; height: 100%"
              />
              <q-badge color="primary" floating transparent>
                {{ item.total }}
              </q-badge>
            </q-avatar>
          </div>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showww">
        <div class="column">
          <cropper
            :src="perfileImg"
            @change="change"
            ref="cropperr"
            :stencil-props="{
              previewClass: 'circle-cropper__preview'
            }"
            class="circle-cropper"
            stencil-component="circle-stencil"
          />
          <q-btn @click="uploadImage()" color="primary" label="Cambiar" />
          <q-btn
            @click=";(showww = false), (perfileImg = null), (perfile = null)"
            color="negative"
            label="Cancelar"
          />
        </div>
      </q-dialog>
      <q-dialog v-model="verReacciones">
        <q-card class="q-pa-sm" style="width: 100%">
          <div class="text-center text-h6 q-pb-sm">Reacciona con estos</div>
          <div class="row justify-around">
            <q-avatar
              v-for="(item, index) of animales"
              :key="index"
              size="90px"
              clickable
              v-ripple
              @click="reaccionar(item)"
            >
              <img
                :src="'animales/' + item.img"
                style="border-radius: 100%; height: 100%"
              />
            </q-avatar>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import moment from 'moment'
import SideBar from './SideBar.vue'
import RightSidebar from './RightSidebar.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import CardPlan from '../../components/CardPlan.vue'
import MyPlanCards from '../../components/MyPlanCards.vue'
export default {
  components: { SideBar, RightSidebar, Cropper, CardPlan, MyPlanCards },
  data () {
    return {
      perfileImg: null,
      perfile: null,
      loading: false,
      verReacciones: false,
      verPublicacion: false,
      description: false,
      modal: false,
      baseuPerfil: '',
      baseuQuedada: '',
      publicacion: '',
      seguidores: 0,
      seguidos: 0,
      calificacion: 0,
      publicidadSelec: {},
      user: {},
      medalla: '',
      objectFilter: {
        zone: '',
        minimo: null,
        maximo: null,
        categorias: []
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      },
      allQuedadas: [],
      quedadas: [],
      asistidos: [],
      activos: [],
      animales: [],
      publicaciones: [],
      catSelected: [],
      categorias: [],
      width: '',
      newWidth: '',
      listaDeInsignias: [],
      baseuInsigna: ''
    }
  },
  async mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuQuedada = env.apiUrl + 'quedada_img/'
    this.baseuInsigna = env.apiUrl + 'insigna_img/'
    await this.getUser()
    await this.getAnimales()
    await this.getMedalla()
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    await this.fetchInsignias()
    this.buscarInsignaPorUsuario('66049ba58c62bd205051b47c')
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
    uploadImage () {
      const { canvas } = this.$refs.cropperr.getResult()
      if (canvas) {
        this.$q.loading.show({
          message: 'Cambiando foto de perfil...'
        })
        const formData = new FormData()
        canvas.toBlob(async blob => {
          formData.append('files', blob)
          await this.$api
            .put('update_perfilImg', formData, {
              headers: {
                'Content-Type': undefined
              }
            })
            .then(res => {
              if (res) {
                this.$q.notify({
                  message: 'Foto actualizada correctamente',
                  color: 'positive'
                })
              }
              location.reload()
              this.$q.loading.hide()
            })
        })
      }
    },
    changeImg () {
      if (this.perfile) {
        this.perfileImg = URL.createObjectURL(this.perfile)
        this.showww = true
      }
    },
    change ({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
    capitalizarPrimeraLetra (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
          if (this.user.first) {
            this.$api.put('update_user_info/' + this.user._id, { first: false })
            this.getCategories()
            this.modal = true
          }
          this.getQuedadas()
          this.getSeguidoresSeguidos(res._id)
          this.getPublicaciones(res._id)
          this.getCalificacion(res._id)
        }
      })
    },
    getCategories () {
      this.$api.get('categories').then(res => {
        if (res) {
          this.categorias = res.filter(v => v.id !== 8)
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
    getQuedadas () {
      this.$api.get('quedadas_user/' + this.user._id).then(res => {
        if (res) {
          this.getAsistidos(this.user._id)
          this.allQuedadas = res.map(e => e)
          this.quedadas = this.allQuedadas
        }
      })
    },
    getAsistidos (id) {
      this.$api.get('evetos_asistidos/' + id).then(v => {
        if (v) {
          this.getActivos(this.user._id)
          this.asistidos = v
        }
      })
    },
    getActivos (id) {
      this.$api.get('evetos_activos/' + id).then(v => {
        if (v) {
          this.activos = v.map(e => e)
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
    deletCat (cat) {
      this.catSelected = this.catSelected.filter(v => v._id !== cat._id)
    },
    filtrarCat () {
      this.loading = true
      const filtrado = {
        zone: this.objectFilter.zone === 'Todas' ? '' : this.objectFilter.zone,
        minimo: this.objectFilter.minimo ? this.objectFilter.minimo : null,
        maximo: this.objectFilter.maximo ? this.objectFilter.maximo : null,
        categorias: this.catSelected
      }
      const text = JSON.stringify(filtrado)
      this.$router.push('/planes/' + text)
    },
    filtrar (val) {
      if (val === 1) {
        this.quedadas = this.allQuedadas.filter(v => {
          if (moment() < moment(v.date)) {
            return v
          } else {
            return false
          }
        })
      } else if (val === 2) {
        this.quedadas = this.allQuedadas.filter(v => {
          if (moment() > moment(v.date)) {
            return v
          } else {
            return false
          }
        })
      } else {
        this.quedadas = this.allQuedadas
      }
    },
    async changeProfile () {
      this.$q.loading.show({
        message: 'Cambiando foto de perfil...'
      })
      const formData = new FormData()
      formData.append('files', this.perfile)
      await this.$api
        .put('update_perfilImg', formData, {
          headers: {
            'Content-Type': undefined
          }
        })
        .then(res => {
          if (res) {
            this.$q.notify({
              message: 'Foto actualizada correctamente',
              color: 'positive'
            })
          }
          location.reload()
          this.$q.loading.hide()
        })
    },
    reaccionar (data) {
      this.$q.loading.show({})
      this.$api
        .post('reaccionar/' + this.publicidadSelec._id, data)
        .then(res => {
          if (res) {
            this.getPublicaciones(this.user._id)
            this.verReacciones = false
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
    },
    async publicar () {
      if (this.publicacion !== '') {
        this.$q.loading.show({
          message: 'Publicando estado...'
        })
        await this.$api
          .post('register_publication', {
            user_id: this.user._id,
            description: this.publicacion
          })
          .then(res => {
            if (res) {
              this.$q.notify({
                message: 'Estado publicado con exito',
                color: 'positive'
              })
              this.publicacion = ''
              this.getPublicaciones(this.user._id)
            }
            this.$q.loading.hide()
          })
      }
    },
    handleResize () {
      this.width = window.innerWidth
    },
    getMedalla () {
      if (
        (this.allQuedadas.length >= 10 &&
          this.allQuedadas.length < 25 &&
          this.asistidos.length >= 5 &&
          this.asistidos.length < 10) ||
        (this.allQuedadas.length >= 25 && this.asistidos.length < 10) ||
        (this.allQuedadas.length < 25 && this.asistidos.length >= 10)
      ) {
        this.medalla = 'bronce.jpg'
        return this.medalla
      }
      if (
        (this.allQuedadas.length >= 25 &&
          this.allQuedadas.length < 50 &&
          this.asistidos.length >= 10 &&
          this.asistidos.length < 20) ||
        (this.allQuedadas.length >= 50 && this.asistidos.length < 20) ||
        (this.allQuedadas.length < 50 && this.asistidos.length >= 20)
      ) {
        this.medalla = 'plata.jpg'
        return this.medalla
      }
      if (
        (this.allQuedadas.length >= 50 &&
          this.allQuedadas.length < 100 &&
          this.asistidos.length >= 20 &&
          this.asistidos.length < 50) ||
        (this.allQuedadas.length >= 100 && this.asistidos.length < 50) ||
        (this.allQuedadas.length < 100 && this.asistidos.length >= 50)
      ) {
        this.medalla = 'oro.jpg'
        return this.medalla
      }
      if (this.allQuedadas.length >= 100 && this.asistidos.length >= 50) {
        this.medalla = 'platino.png'
        return this.medalla
      }
    },
    darDeBajaCuenta () {
      this.$api
        .put('deleteSimbolic/' + this.user._id, {
          deleted: true
        })
        .then(async res => {
          if (res) {
            this.$q.notify({
              message: 'Usuario eliminado con éxito',
              color: 'positive'
            })
            await this.$store.dispatch('logout')
            this.$router.push('/login')
          }
        })
    },
    async fetchInsignias () {
      try {
        const res = await this.$api.get('/insignas')
        if (res) {
          this.listaDeInsignias = res
          res.forEach(insignia => {
            if (insignia.usuario_ids) {
              // Dividir el string de usuario_ids por comas y agregar los IDs a la lista
              const ids = insignia.usuario_ids.split(',').map(id => id.trim())
              this.usuariosConInsignia.push(...ids)
            }
          })
        }
      } catch (error) {
        console.error('Error al obtener las insignias:', error)
      }
    },
    buscarInsignaPorUsuario (usuarioId) {
      // Inicializar la variable para almacenar la insignia encontrada
      let insigniaEncontrada = null

      // Iterar sobre la lista de insignias
      for (const insignia of this.listaDeInsignias) {
        // Verificar si la propiedad usuario_ids está presente y no es nula o vacía
        if (insignia.usuario_ids && insignia.usuario_ids.trim() !== '') {
          // Dividir los IDs de usuario en un array
          const idsArray = insignia.usuario_ids.split(',')

          // Verificar si usuarioId está presente en el array de IDs
          if (idsArray.includes(usuarioId)) {
            // Asignar la insignia encontrada y salir del bucle
            insigniaEncontrada = insignia
            break
          }
        }
      }

      // Devolver la insignia encontrada
      return insigniaEncontrada
    }
  }
}
</script>

<style scoped lang="scss">
@import url(../../scss/user/Muro.scss);
@import url(../../scss/user/Inicio.scss);
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
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
  padding:50;
}
</style>
