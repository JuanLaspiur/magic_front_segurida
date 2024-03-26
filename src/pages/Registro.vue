<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite>
      <q-carousel-slide :name="1">
        <q-layout view="lHh Lpr lFf">
          <q-header class="bg-white">
            <q-toolbar class="text-black row justify-between">
              <q-btn flat @click="$router.push('/login')" color="grey-8" round dense icon="arrow_back"/>
              <q-btn flat @click="$router.push('/login')" color="grey-8" rounded dense label="Cancelar"/>
            </q-toolbar>
          </q-header>
          <div class="fit row justify-center">
            <q-page-container class="registro_form">
              <div class="">
                <div class="text-h5 text-bold q-pb-md">Datos de Cuenta</div>
                <q-input outlined type="email" v-model="form.email" placeholder="Correo electrónico" :error="$v.form.email.$error" error-message="Este campo es requerido"  @blur="$v.form.email.$touch()"/>
                <q-input class="q-mt-md" outlined type="password" v-model="password" placeholder="Contraseña"
                :error="errorPass" error-message="Debe ingresar una contraseña segura. Mínimo 8 caracteres y por lo menos una mayúscula."  @input="verifyPass(password)"/>
                <q-input class="q-mt-md" outlined type="password" v-model="repeatPassword" placeholder="Repetir contraseña" :error="$v.repeatPassword.$error" error-message="Debe ser igual a la anterior"  @blur="$v.repeatPassword.$touch()"/>
                <q-checkbox class="q-mt-md" v-model="checkBox.first" label="Al registrarme en la presente aplicación, acepto el aviso legal, los términos y condiciones y la política de privacidad." />
                <q-checkbox class="q-my-md" v-model="checkBox.second" label="Acepto recibir información electrónica de MagicDay sobre eventos y planes creados por usuarios. (No Obligatorio)" />
                <div class="siguiente_button q-px-md q-pb-lg">
                  <q-btn :disabled="!checkBox.first" no-caps color="primary" text-color="white" label="Siguiente" @click="siguiente(2)" class="full-width q-py-xs"/>
                </div>
              </div>
            </q-page-container>
          </div>
        </q-layout>
      </q-carousel-slide>

      <q-carousel-slide :name="2">
        <q-layout view="lHh Lpr lFf">
          <q-header class="bg-white">
            <q-toolbar class="text-black row justify-between">
              <q-btn flat @click="slide = 1" color="grey-8" round dense icon="arrow_back"/>
              <q-btn flat @click="$router.push('/login')" color="grey-8" rounded dense label="Cancelar"/>
            </q-toolbar>
          </q-header>

          <div class="fit row justify-center">
            <q-page-container class="registro_form">
              <div class="text-h5 text-bold row justify-center">Registro de Usuario</div>
              <div class="text-h6 text-subtitle1 row justify-center q-mb-xl text-center">Bienvenido a Magic Day, una aplicacion donde podras encontrar todos los planes que necesites</div>
              <div class="text-h5 text-bold q-pb-md">Selecciona una foto de perfil</div>
              <div class="row justify-center">
                <q-avatar size="200px" class="bg-grey-5 q-mb-sm">
                  <q-img :src="perfil ? perfilImg : 'logo_final_png-02.png'" style="height: 100%"/>
                  <q-badge class="bg-transparent" floating style="border-radius: 100%; margin-top: 140px; width: 70px; height: 70px;">
                    <q-file class="bg-primary" borderless v-model="perfil" @input="changeImg()" accept=".jpg, image/*" style="z-index: 7; border-radius: 100%; width: 100px; font-size: 0px">
                      <template v-slot:prepend>
                        <div class="absolute-center" @click.stop>
                          <q-icon :color="!$v.perfil.$error ? 'white' : 'negative'" size="35px" name="add_a_photo" class="cursor-pointer"/>
                        </div>
                      </template>
                    </q-file>
                  </q-badge>
                </q-avatar>
              </div>

              <div class="text-h5 text-bold q-pb-md">Datos del Usuario</div>
              <q-input class="q-mb-sm" outlined v-model="form.name" label="Nombre" :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
              <q-input outlined v-model="form.last_name" label="Apellido" :error="$v.form.last_name.$error" error-message="Este campo es requerido"  @blur="$v.form.last_name.$touch()"/>
              <q-select class="q-mb-md" outlined label="Género" v-model="form.gender" :options="['Hombre', 'Mujer', 'No binario', 'Prefiero no decirlo']" :error="$v.form.gender.$error" error-message="Este campo es requerido" @blur="$v.form.gender.$touch()"/>
              <div class="date_form">
                <div style="width: 50%">
                  <q-input class="q-mb-md" outlined readonly v-model="form.birthdate" label="Fecha de nacimiento" @click="$refs.qDateProxy.show()"
                  error-message="Este campo es requerido" :error="$v.form.birthdate.$error" @blur="$v.form.birthdate.$touch()">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date default-view="Years" :locale="myLocale" v-model="form.birthdate" mask="YYYY/MM/DD"  @input="calcularEdad(form.birthdate)">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Cerrar" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input outlined readonly v-model.number="age" type="number" label="Edad" :error="$v.age.$error" error-message="La edad debe ser de 18 en adelante"  @blur="$v.age.$touch()"/>
                </div>
                <div class="q-ml-xl " style="width: 40%">
                  <div class="column items-center q-mb-sm">
                    <q-avatar size="100px" clickable v-ripple v-if="animal">
                      <img :src="animal && animal.img? 'animales/' + animal.img : '' " style="border-radius: 100%; height:100%" />
                    </q-avatar>
                    <div class="q-pb-sm">
                      <q-btn no-caps label="Selecciona un animal" icon="pets" :color="!$v.animal.$error ? 'primary' : 'red'"
                      @click="verAnimales = true" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-h5 text-bold q-pb-md q-pt-lg">Completa tu perfil</div>
              <q-input outlined v-model="form.bornCountry" label="País de nacimiento" :error="$v.form.bornCountry.$error" error-message="Este campo es requerido" @blur="$v.form.bornCountry.$touch()"/>
              <q-input outlined type="number" v-model.number="form.phone" label="Teléfono de contacto"/>
              <div class="q-mb-md text-italic text-grey-9 text-caption">(Solamente visible por los administradores, y únicamente utilizable en situaciones de emergencia).</div>
              <q-input outlined v-model="form.cargo" label="Cargo o profesión" class="q-mb-md" />
              <q-input outlined v-model="form.peliculas" label="Películas favoritas" class="q-mb-md" />
              <q-input outlined v-model="form.artista" label="Artista y estilo musical favorito" class="q-mb-md" />
              <q-input outlined v-model="form.deportes" label="Deportes favoritos" class="q-mb-md" />
              <q-input maxlength="150" outlined class="q-mb-sm" v-model="form.description" type="textarea" label="Breve descripción sobre ti o tus hobbies."/>
              <div class="text-h5 text-bold q-pb-md q-pt-lg">Información geográfica</div>
              <q-select class="q-mb-sm" outlined label="Ciudad actual" v-model="form.city" :options="ciudades" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.city.$error" @blur="$v.form.city.$touch()"/>
              <div class="row width-full">
                <q-checkbox style="width: 7%" class="q-mb-sm " dense v-model="comunidad" label="" color="primary">
                </q-checkbox>
                <q-select style="width: 93%" :disable="!comunidad" outlined label="Comunidad autónoma natal" v-model="form.community" :options="comunidades" option-label="name" option-value="_id" emit-value map-options error-message="Este campo es requerido" :error="$v.form.community.$error" @blur="$v.form.community.$touch()"/>
              </div>
              <q-select outlined label="Zona de Madrid" v-model="form.zone" :options="['Norte', 'Sur', 'Centro', 'Este', 'Oeste']" error-message="Este campo es requerido" :error="$v.form.zone.$error" @blur="$v.form.zone.$touch()"/>
              <div class="q-px-md q-pb-lg q-pt-md">
                <q-btn no-caps color="primary" text-color="white" label="Siguiente" @click="terminos()" class="full-width q-py-xs q-my-sm"></q-btn>
                <q-btn no-caps color="white" text-color="primary" label="Volver" @click="slide = 1" class="full-width q-py-xs q-my-sm"></q-btn>
              </div>
            </q-page-container>
          </div>
        </q-layout>
      </q-carousel-slide>

      <q-carousel-slide  :name="3" class="registro_form q-pa-none">
        <q-layout view="lHh Lpr lFf">
          <q-header class="bg-white">
            <q-toolbar class="text-black row justify-between">
              <q-btn flat @click="slide = 2" color="grey-8" round dense icon="arrow_back"/>
              <q-btn flat @click="$router.push('/login')" color="grey-8" rounded dense label="Cancelar"/>
            </q-toolbar>
          </q-header>

          <q-page-container>
            <div class="row justify-center">
              <q-avatar size="200px" class="bg-grey-5 q-mb-sm">
                <q-img :src="perfil ? perfilImg : 'logo_final_png-02.png'" style="height: 100%"/>
              </q-avatar>
            </div>
            <div class="column items-center">
              <div class="text-bold text-h6">{{form.name}} {{form.last_name}}</div>
              <div class="q-pa-md">
                <div v-if="form.cargo" class="row items-start">
                <q-icon class="q-mr-xs" name="work" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Cargo o profesión: </b> <br> {{form.cargo}}</div>
              </div>
              <div v-if="form.peliculas" class="row items-start">
                <q-icon class="q-mr-xs" name="live_tv" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Películas Favoritas: </b> <br> {{form.peliculas}}</div>
              </div>
              <div v-if="form.artista" class="row items-start">
                <q-icon class="q-mr-xs" name="headset" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Artista y estilo musical favorito: </b> <br> {{form.artista}}</div>
              </div>
              <div v-if="form.deportes" class="row items-start">
                <q-icon class="q-mr-xs" name="sports_soccer" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Deportes Favoritos: </b> <br> {{form.deportes}}</div>
              </div>
              <div v-if="form.community" class="row items-start">
                <q-icon class="q-mr-xs" name="home" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Comunidad Autónoma natal:</b> <br> {{form.community ? comunidades.filter(v => v._id === form.community)[0].name : ''}}</div>
              </div>
              <div v-if="form.zone" class="row items-start">
                <q-icon class="q-mr-xs" name="place" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Zona de Madrid: </b> <br> {{form.zone}}</div>
              </div>
              <div class="row items-center">
                <q-icon class="q-mr-xs" name="groups" size="25px" color="primary"/>
                <div class="text-grey-8"><b class="text-primary">Genero: </b>{{form.gender}}</div>
              </div>
              </div>
            </div>
            <div class="registrase_button absolute-bottom q-px-md q-pb-lg">
              <q-btn no-caps color="primary" text-color="white" label="¡Regístrate ahora!" :loading="loading" @click="registrarse()" class=" q-py-xs">
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-center" />
                  Registrando...
                </template>
              </q-btn>
            </div>
          </q-page-container>
        </q-layout>
      </q-carousel-slide>
    </q-carousel>

    <q-dialog v-model="verAnimales">
      <q-card class="q-pa-sm" style="width:100%">
        <div class="text-center q-pb-md text-h6">Selecciona un animal</div>
        <div class="row justify-around">
          <q-avatar v-for="(item, index) of animales" :key="index" size="90px" clickable v-ripple
          @click="animal = item; verAnimales = false">
            <img :src="'animales/' + item.img" style="border-radius: 100%; height:100%" />
          </q-avatar>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="term">
      <q-card>
        <q-card-section>
          <div class="text-h6">Política de privacidad</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section style="max-height: 50vh" class="scroll">
          <b>I.Clausula formulario de registro</b>
          <br>
          <p><b>MAGICDAY (MARCOS GARCÍA CID),</b> como responsable del tratamiento, le informa que sus datos personales serán tratados para crear su perfil de usuario, y poder utilizar la presente aplicación.<br>
Podrá retirar su consentimiento, y ejercitar los derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento, reconocidos en los artículos 15 a 22 del Reglamento (UE) 2016/679, enviando un correo electrónico a <a href="protecciondedatos.magicday@gmail.com">protecciondedatos.magicday@gmail.com</a>, adjuntando copia de su DNI o documentación acreditativa de su identidad. Puede solicitar más información escribiendo al correo electrónico <a href="protecciondedatos.magicday@gmail.com">protecciondedatos.magicday@gmail.com</a>. <br><br>
<b>II.Política de privacidad</b><br>
<b>Aplicación de la presente Política de Privacidad</b><br>
El presente documento regula la Política de Privacidad tanto de la presente aplicación, así como de la totalidad de datos e información que pudiera manejar MARCOS GARCÍA CID (en lo sucesivo, “MAGICDAY”) como Responsable del Tratamiento.<br>
Por ello, para cumplir con el artículo 13 y 14 del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (en lo sucesivo “RGPD” o “Reglamento General de Protección de Datos”), así como el artículo 11 de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (en lo sucesivo “LOPDGDD”) se ha establecido y desarrollado la presente Política de Privacidad. <br><br>

<b>Responsable del Tratamiento</b> <br>
Tus datos personales son manejados por, nosotros, MAGICDAY como Responsable del Tratamiento. Te detallamos nuestros datos sociales para que te puedas poner en contacto con nosotros cuando lo desees: <br>
<br>• Razón social: MARCOS GARCÍA CID <br>
  • CIF: 52904195D <br>
  • Domicilio: CALLE BUTRÓN - 28022 MADRID <br>
  • Teléfono: 643 401 230 <br>
  • Correo electrónico: protecciondedatos.magicday@gmail.com <br><br>

<b>Finalidades y bases legitimadoras</b><br>
El presente apartado regula la totalidad de tratamientos llevados a cabo por MAGICDAY, en base a cada una de las finalidades, conforme a las bases legitimadoras que lo regulan, comprendido éstos en los que se enumeran a continuación:
<br><br><b>  •  Consentimiento del interesado (artículo 6.1. a) RGPD)</b>

<br><b>Usuario página web:</b><br>
a) Creación de su cuenta de usuario. <br> <br>
<b> •Ejecución contractual y medidas precontractuales (artículo 6.1.b) RGPD)</b>

<br><b>Usuario página web:</b><br>
a)Mantenimiento y gestión de la su cuenta de usuario. <br>
b)Gestión contable y administrativa del servicio pactado entre MAGICDAY. <br>
c)Gestionar las comunicaciones electrónicas entre MAGICDAY y usted. <br>
d)Creación de planes a través de la aplicación. <br>
e)Datos generados por el usuario a través de la aplicación. <br>
<br> <br>
Asimismo, se le informa que todos los datos que MAGICDAY le solicite o pudiera solicitar marcados con un asterisco (*) serán obligatorios. En el caso de que los datos obligatorios no fueran facilitados MAGICDAY no podrá proceder a su alta como usuario, y por ende, no poder acceder a la aplicación. <br>
Es esencial destacar, que tal como se ha indicado en el registro de usuario, el campo de número de teléfono aún siendo obligatorio no será compartido ni comunicado a terceros. Este dato exclusivamente se tratará con la finalidad de ser utilizado por parte de los administradores de MAGICDAY con el fin de contactarle en caso de emergencia, o necesidad de contacto por parte de los administradores. <br> <br>
En cumplimiento del artículo 4.2.a de la LOPDGDD, se garantiza que los datos de carácter personal facilitados por usted hacia MAGICDAY se considerarán exactos. Sin embargo, MAGICDAY podría solicitarle la actualización de los mismos que sobre usted pudiera conservar. <br> <br>

<b>Creación de planes / quedadas entre usuarios</b> <br>
MAGICDAY está diseñada para la gestión de planes / quedadas entre usuarios. Uno de los campos obligatorios es la ubicación física del lugar de realización del plan. En ocasiones, este plan puede coincidir con el domicilio personal o particular del usuario creador del plan. Por ello debemos informarle que no comparta el domicilio particular sin conocer a los integrantes del plan, así como tampoco a terceros que no deberían tener acceso a dicha información. <br> <br>

<b>Conversaciones entre usuarios</b> <br>
MAGICDAY no tiene acceso, ni visualizará las conversaciones entre usuarios. Asimismo, se ha implementado medidas de seguridad suficientes para garantizar la debida custodia de datos personales. <br> <br>

<b>Visualización de datos por parte de terceros </b> <br>
Se le informa al usuario que los datos indicados en su cuenta de perfil podrán ser visualizados por otros usuarios. No obstante, tal como se le ha indicado anteriormente, su número de teléfono no será un campo que pueda ser tratado por otros usuarios, salvo por los administradores de MAGICDAY. En rigor a este punto, le indicamos que se todos las personas intervinientes que traten datos personales responsabilidad de MAGICDAY, se han comprometido, a través de acuerdos / compromisos de confidencialidad, a la no divulgación de cualquier tipología de datos de carácter personal. <br> <br>

<b>Cesión de derechos de imagen </b> <br>
En virtud del artículo 13 del RGPD y en la Ley Orgánica 1/1982, de 5 de mayo, de Protección Civil al Derecho al Honor de la intimidad personal, familiar y a la propia imagen, se le informa al usuario que al subir las imágenes personales a la aplicación consiente su difusión a través de la MAGICDAY. <br> <br>
En cumplimiento del principio de minimización de datos, se le informa al usuario que en ningún momento será obligatoria subir imágenes a la aplicación. En cualquier momento podrá suprimir / eliminar las imágenes asociadas a su perfil de usuario. <br> <br>
Asimismo, MAGICDAY informa al usuario que al subir imágenes de eventos en los que terceras personas pudieran salir, deberá contar con el consentimiento de la totalidad de personas intervinientes en la imagen. Por ello, de forma previa a la subida en MAGICDAY, deberá estar autorizado sobre la cesión de derechos de imágenes de la totalidad de personas intervinientes. En rigor de todo lo anterior, en el momento de subida de la imagen, el usuario establece que ha sido autorizada por la totalidad de personas intervinientes en la fotografía. <br> <br>
En cualquier momento la administración de MAGICDAY se reserva el derecho de retirar cualquier fotografía que infrinja el presente punto, así como cualquier normativa aplicable al respecto, a título meramente orientativo, la normativa de protección de datos, propiedad intelectual, derecho al honor y propia imagen, entre otras. Sea como fuere, en cualquier momento puede escribir a protecciondedatos.magicday@gmail.com para solicitar la retirada de imágenes en las que usted salga. <br> <br>

<b>Plazo de conservación de los datos </b> <br>
En virtud del artículo 5.1.e) del RGPD, los plazos de conservación de los datos variarán en función del tratamiento realizado. Por ello, desde MAGICDAY le aconsejamos leer nuestra Política de conservación de datos para su consulta, la cual la podrá solicitar en  protecciondedatos.magicday@gmail.com <br> <br>
No obstante, pese a la existencia de estos plazos generales, le informamos que de forma periódica revisaremos nuestros sistemas para proceder a eliminar aquellos datos que no sean legalmente necesarios. <br> <br>
<b>Derechos que le asisten a los interesados </b> <br>
La normativa de protección de datos le reconoce los siguientes derechos: <br> <br>
Derecho a solicitar el acceso a sus datos personales. <br>
Derecho a solicitar la rectificación de sus datos personales. <br>
Derecho a solicitar la supresión de sus datos personales. <br>
Derecho a solicitar la limitación del tratamiento. <br>
Derecho a oponerse al tratamiento. <br>
Derecho a la portabilidad. <br>
Derecho a no ser objeto de decisiones individuales automatizadas. <br>
Derecho a retirar su consentimiento. <br> <br>
El ejercicio de tales derechos deberá ser comunicado a MARCOS GARCÍA CID, con domicilio en CALLE BUTRÓN - 28022 MADRID , o la cuenta de correo electrónico  protecciondedatos.magicday@gmail.com. Adicionalmente, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD). Más información en el Apartado Autoridad de Control de la presente política de privacidad.
<br> <br> <b>Destinatarios y transferencias internacionales de datos</b><br>
Sus datos personales podrían serán comunicados a Autoridades Públicas o gubernamentales, Fuerzas y Cuerpos de Seguridad del Estado, para dar cumplimiento a los requisitos legales y normativa aplicable en cada caso concreto.
<br> A su vez, podrían ser comunicados a terceros proveedores o entidades para la prestación de algún servicio subcontratado por MAGICDAY. A este aspecto le informamos que se han firmado los correspondientes contratos de encargado del tratamiento exigidos por el artículo 28 y 29 del RGPD así como el artículo 28 de la LOPDGDD, y siempre éstos garantizando y siendo comprobado por MAGICDAY que cumplen y garantizan con medidas jurídicas, técnicas y organizativas suficientes. Le informamos que sus datos no serán comunicados a terceras personas. Ni se realizarán transferencias internacionales de datos.
<br> A su vez, para tener la máxima trasparencia le informamos que sus datos podrán ser comunicados con nuestros colaboradores externos a efectos de poder prestarle el servicio contratado. No obstante, siguiendo nuestra Política interna, solo colaboramos con proveedores que garanticen medidas de seguridad suficientes a efectos de cumplir la legislación vigente.
<br> <br> <b>Baja de usuario</b> <br>
En el caso de querer dar de baja su perfil de usuario, se procederá a bloquear sus datos personales y a no estar disponibles frente a terceros, pero MAGICDAY mantendrá sus datos durante el tiempo legalmente necesario para la depuración de responsabilidades legales. Superados los plazos que sean de aplicación, se procederá a la supresión definitiva de los datos personales.
<br> <br> <b>Procedencia de los datos personales</b> <br>
Los datos de carácter personal que trata MAGICDAY proceden de usted como titular de los mismos.
<br> A las cuales, usted previamente le ha facilitado sus datos de carácter personal y ha autorizado la comunicación de los mismos a las diversas empresas que ofrecen sus servicios a través de estas empresas.
<br> <br> <b>Seguridad de los datos</b> <br>
Desde MAGICDAY se han implantado medidas jurídicas, técnicas y organizativas suficientes para garantizar la protección de los datos personales. Por ello, revisamos periódicamente nuestros sistemas para evitar cualquier acceso no lícito, no autorizado, así como para evitar cualquier tipo de pérdida, destrucción accidental, divulgación ilegal o no autorizada así como cualquier otro tipo de daño, tanto accidental como ilícito.
<br> <br> <b>Autoridad de control</b> <br>
Desde MAGICDAY ponemos el máximo empeño para cumplir con la normativa de protección de datos dado que es el activo más valioso para nosotros. No obstante, le informamos que en caso de que usted entienda que sus derechos se han visto menoscabados, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), sita en C/ JORGE JUAN, 6 - 28001 MADRID. Más información sobre la AEPD en su página web.
          </p>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup></q-btn>
          <q-btn flat label="Aceptar" @click="term1=true" color="primary" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="term1">
      <q-card>
        <q-card-section>
          <div class="text-h6">Términos y Condiciones</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section style="max-height: 50vh" class="scroll">
          <p><b>I.Aviso Legal</b> <br> <br>
            <b> Aplicación del presente Aviso Legal</b> <br>
Desde la MARCOS GARCÍA CID (en adelante, “MAGICDAY”) ponemos a su disposición, en cumplimiento del art. 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), la información necesaria sobre la presente aplicación. Por tanto, el presente Aviso Legal regula las condiciones de uso, las limitaciones de responsabilidad y las obligaciones que, los usuarios de la aplicación MAGICDAY (en adelante la app, aplicación o MAGICDAY), asumen y se comprometen a respetar.
<br> <br> <b> Datos identificativos del titular de la aplicación</b> <br> <br>
•Razón social: MARCOS GARCÍA CID <br>
•CIF: 52904195D <br>
•Domicilio social: CALLE BUTRÓN - 28022 MADRID <br>
•Teléfonos de contacto: 643 401 230 <br>
•Correo electrónico: protecciondedatos.magicday@gmail.com <br> <br>
<b>Acceso a la aplicación</b> <br>
El acceso a la aplicación implica la aceptación de las presentes condiciones, por lo que, en caso de no estar conforme con alguna de estas, se deberá abandonar la presente aplicación.
<br> El acceso y/o uso de la aplicación atribuye la condición de usuario, obligándose este a usar la aplicación de forma diligente y correcta. En este sentido, se obliga a no utilizarla:
<br> •Para la realización de actividades contrarias a la Ley, a la moral, a las buenas costumbres aceptadas o al Orden Público establecido, y
<br> •Con fines ilícitos, prohibidos o lesivos de derechos e intereses de terceros.
MAGICDAY no se hace responsable de las actividades llevadas a cabo por el usuario en la aplicación con dichas finalidades prohibidas.
<br> Asimismo, el usuario obligatoriamente deberá ser mayor de dieciocho (18) años, no permitiéndose bajo ninguna circunstancia registrarse usuarios menores de edad. En el caso de detectar usuarios menores de edad se procederá a suprimir de forma inmediata el perfil.
<br> <br> <b> Funcionamiento y contenido</b> <br>
MAGICDAY se reserva el derecho de realizar, en cualquier momento y sin necesidad de aviso previo a los usuarios de la aplicación, las actualizaciones y modificaciones que considere oportunas, tanto en la información como en la estructura de la aplicación, así como la facultad de cambiar las condiciones de acceso a la aplicación. <br>
A su vez, MAGICDAY, no se hace responsable de los posibles fallos de comunicación, no pudiendo garantizar por ello el funcionamiento continuo y la disponibilidad de acceso a la aplicación. En estos casos, MAGICDAY, realizará a la mayor brevedad posible todas aquellas actuaciones tendentes a la subsanación de los mencionados errores. <br>
Por último, MAGICDAY, les informa a los usuarios que con el fin de poder visualizar ciertos contenidos de la página deberá de disponer de software específico. <br> <br>
<b>Propiedad Intelectual e Industrial</b> <br>
MAGICDAY es propietaria y/o licenciataria de la presente aplicación, incluyendo los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.)
<br>MAGICDAY tiene en exclusiva el ejercicio de los derechos de reproducción, distribución, modificación y comunicación de los mismos, así como todos los derechos de explotación en cualquiera de sus formas.
<br>Todo el contenido de la página se encuentra protegido por la normativa en materia de propiedad intelectual e industrial, y la puesta a disposición y su uso, posible consulta o descarga no conlleva en ningún caso la cesión de ningún tipo de derecho sobre la propiedad intelectual o industrial del citado material o contenido.
<br> No se permitirá la visualización, descarga e impresión de los contenidos de la aplicación si se realiza con fines publicitarios o comerciales, o para su distribución, comunicación pública o modificación y, en general, en los casos en los que dichos actos sean incompatibles con los fines de esta aplicación. En el resto de los casos, se solicitará autorización previa por escrito de MAGICDAY y debe procederse a citar la fuente.
<br> En todo caso, los logos, gráficos, imágenes, iconos, etc. que formen parte de la aplicación, no se podrán utilizar por separado del texto al que acompañen o del resto de imágenes o gráficos del que formen parte.
<br> MAGICDAY se reserva la posibilidad de ejercer las acciones legales que correspondan contra los usuarios que violen o infrinjan los derechos de propiedad intelectual e industrial, incluyendo la indemnización de los daños y perjuicios causados. Asimismo, el usuario se obliga a indemnizar a MAGICDAY por cualquier daño o perjuicio que pudiera ocasionar el uso indebido de esta aplicación.
<br> Toda información que los usuarios de la aplicación puedan facilitar como sugerencias, propuestas, etc., se consideran recibidas y cedidas a título gratuito, por lo que ruega que se abstengan de enviar toda aquella información que no tenga el citado carácter.
<br> <br> <b>Responsabilidad</b> <br>
Tanto el acceso a esta aplicación como el uso que pueda hacerse de la información contenida en la misma es de la exclusiva responsabilidad de quien lo realiza, asumiendo expresamente el usuario que el acceso y la utilización de la aplicación, se hace bajo su única y exclusiva responsabilidad.
<br> Por este motivo, MAGICDAY no responderá en ningún caso de los posibles daños o perjuicios que pudieran derivarse de dicho acceso o del uso de la información por parte del usuario, así como tampoco de los posibles errores o daños que pueda sufrir el sistema informático del usuario (hardware y software), sus ficheros o documentos almacenados, como consecuencia de la presencia de virus en su ordenador, mal funcionamiento del navegador o uso de versiones no actualizadas del mismo.
<br> En virtud de la Ley 34/2002 de 11 de julio de Servicios de la Sociedad de la Información y Comercio Electrónico, para cualquier controversia que pudiera surgir será de aplicación la legislación española. El usuario responderá, en cualquier caso, de la veracidad de los datos facilitados, reservándose MAGICDAY el derecho a excluir de los servicios registrados a todo usuario que haya facilitado datos falsos o inexactos, sin prejuicio de las demás acciones que procedan en Derecho.
<br> <br> <b> Participación en foros, chats, redes sociales y comunidades virtuales</b> <br>
MAGICDAY no se responsabiliza de las opiniones vertidas en los foros, chats y otros espacios de participación on-line. Los mensajes publicados en estos espacios representan únicamente la opinión de sus autores y no la de los administradores/as o moderadores/as (excepto en mensajes publicados por ellos mismos).
<br> Al registrarse en estos espacios los usuarios deben aceptar no publicar material abusivo, discriminatorio, obsceno, vulgar, relativo a cualquier forma de violencia, amenazante o ningún otro que de forma alguna viole las leyes vigentes. Asimismo, los usuarios/as aceptan que MAGICDAY ejerza las acciones de borrar, editar, mover o cerrar cualquier mensaje que pueda considerar inadecuado o no pertinente.
<br> Usted como usuario, puede reportar a cualquier usuario que considere que ha incumplido los presentes términos y condiciones. Sea como fuere, en cualquier momento puede escribir a protecciondedatos.magicday@gmail.com para solicitar el reporte de algún usuario. En este caso, deberá aportar pruebas precisas para precisar el reporte del usuario.
<br> <br> <b>Jurisdicción</b> <br>
Para cualquier tipo de controversia existente por el acceso o utilización del portal, los usuarios de la aplicación y MAGICDAY, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten al fuero de los Juzgados y Tribunales de Madrid.
          </p>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup></q-btn>
          <q-btn flat label="Aceptar" @click="siguiente(3)" color="primary" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showCropper">
        <div class="column">
          <cropper
            :src="perfilImg"
            ref="cropperr"
            :stencil-props="{
              previewClass: 'circle-cropper__preview',
            }"
            class="circle-cropper"
            stencil-component="circle-stencil"
          />
          <q-btn @click="saveImg()" color="primary" label="Cambiar" />
          <q-btn @click="showCropper = false, perfilImg = null, perfil = null" color="negative" label="Cancelar" />
        </div>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { openURL } from 'quasar'
import moment from 'moment'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { required, email, sameAs, minValue } from 'vuelidate/lib/validators'

export default {
  components: { Cropper },
  data () {
    return {
      showCropper: false,
      checkBox: {
        first: false,
        second: false
      },
      comunidad: false,
      term: false,
      term1: false,
      perfil: null,
      perfilImg: null,
      animal: null,
      age: null,
      verAnimales: false,
      loading: false,
      errorPass: false,
      slide: 1,
      password: '',
      repeatPassword: '',
      form: {},
      comunidades: [],
      ciudades: [],
      animales: [],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      name: { required },
      last_name: {},
      birthdate: { required },
      gender: { required },
      bornCountry: {},
      community: {},
      city: { required },
      zone: {}
    },
    age: { required, minValue: minValue(18) },
    animal: { required },
    perfil: {},
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  mounted () {
    this.getCommunities()
    this.getCities()
    this.getAnimales()
  },
  methods: {
    saveImg () {
      const { canvas } = this.$refs.cropperr.getResult()
      canvas.toBlob(blob => {
        this.perfil = blob
        this.perfilImg = URL.createObjectURL(blob)
      })
      this.showCropper = false
    },
    changeImg () {
      if (this.perfil) {
        this.perfilImg = URL.createObjectURL(this.perfil)
        this.showCropper = true
      }
    },
    terminos () {
      this.$v.form.$touch()
      this.$v.age.$touch()
      this.$v.animal.$touch()
      this.$v.perfil.$touch()
      if (!this.$v.form.$error && !this.$v.animal.$error && !this.$v.age.$error && !this.$v.perfil.$error) {
        this.term = true
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    irRuta (url) {
      openURL(url)
    },
    ...mapMutations('generals', ['login']),
    getCommunities () {
      this.$api.get('communities').then(res => {
        if (res) {
          this.comunidades = res
        }
      })
    },
    getCities () {
      this.$api.get('cities').then(res => {
        if (res) {
          this.ciudades = res
        }
      })
    },
    getAnimales () {
      this.$api.get('animales').then(res => {
        if (res) {
          this.animales = res
          this.animal = res.find(a => a.img === 'ICONOS A COLOR-00.png')
        }
      })
    },
    calcularEdad (fecha) {
      this.age = moment().diff(moment(fecha), 'years')
    },
    verifyPass (pass) {
      const letrasMayusculas = 'ABCDEFGHYJKLMNÑOPQRSTUVWXYZ'

      function tieneMayusculas (texto) {
        for (let i = 0; i < texto.length; i++) {
          if (letrasMayusculas.indexOf(texto.charAt(i), 0) !== -1) {
            return true
          }
        }
        return false
      }
      if (pass === '') {
        this.errorPass = true
      } else if (pass.length < 8 || !tieneMayusculas(pass)) {
        this.errorPass = true
      } else {
        this.errorPass = false
      }
    },
    siguiente (idx) {
      if (idx === 2) {
        this.$v.form.email.$touch()
        this.$v.repeatPassword.$touch()
        if (this.password === '') {
          this.errorPass = true
        } else {
          this.verifyPass(this.password)
        }
        if (!this.$v.form.email.$error && !this.errorPass && !this.$v.repeatPassword.$error) {
          this.form.password = this.password
          this.slide = 2
        } else {
          this.$q.notify({
            message: 'Faltan campos por llenar',
            color: 'negative'
          })
        }
      } else {
        this.$v.form.$touch()
        this.$v.age.$touch()
        this.$v.animal.$touch()
        if (!this.$v.form.$error && !this.$v.animal.$error && !this.$v.age.$error) {
          this.slide = 3
        } else {
          this.$q.notify({
            message: 'Faltan campos por llenar',
            color: 'negative'
          })
        }
      }
    },
    changePerfil () {
      if (this.perfil) { this.perfilImg = URL.createObjectURL(this.perfil) }
    },
    async registrarse () {
      this.$v.perfil.$touch()
      if (!this.$v.perfil.$error) {
        this.$q.loading.show({
          message: 'Registrando...'
        })
        this.form.animal = this.animal._id
        this.form.enable = true
        this.form.quedadas = false
        const formData = new FormData()
        if (this.perfil) {
          formData.append('perfil', this.perfil)
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register', formData, {
          headers: { 'Content-Type': undefined }
        }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de MagicDay, Bienvenido',
              color: 'positive'
            })
            this.loguear()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    loguear () {
      this.$api.post('login', this.form).then(res => {
        if (res) {
          const usuario = res.SESSION_INFO.roles.find(value => value === 2)
          if (usuario) {
            this.login(res)
            this.$api.get('user_info').then(user => {
              if (user) {
                this.$router.push('/inicio')
              }
            })
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .hover_pointer{
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @import url('../scss/Registro.scss');
</style>
