<template>
  <!-- Contenedor principal de comentarios -->
  <div class="panel-comentarios">
    <!-- Título -->
    <h2 class="titulo">Comentarios</h2>
    <!-- Iteración sobre los comentarios -->
    <div class="comentario" v-for="(comment, index) in comments" :key="index">
      <!-- Avatar del usuario -->
      <img :src="comment.user.photo" class="avatar" />
      <!-- Contenido del comentario -->
      <div class="contenido">
        <!-- Nombre del usuario -->
        <p class="nombre">{{ comment.user.name }}</p>
        <!-- Texto del comentario -->
        <p class="texto">{{ comment.text }}</p>
      </div>
    </div>
    <!-- Nuevo comentario -->
    <div class="nuevo-comentario">
      <!-- Input para escribir un nuevo comentario -->
      <input
        type="text"
        v-model="newComment"
        placeholder="Escribe un comentario..."
        class="input-comment"
      />
      <!-- Botón para enviar el comentario -->
      <button class="custom-btn" @click="addComment">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelComentarios',
  props: {
    comments: {
      type: Array,
      default: () => [
        {
          user: { name: 'Usuario1', photo: 'https://this-person-does-not-exist.com/img/avatar-gen11c33949f9fdce9849d37cedceb11c59.jpg' },
          text: '¡Gran foto!'
        },
        {
          user: { name: 'Usuario2', photo: 'https://this-person-does-not-exist.com/img/avatar-gen11cb4e083c3639c50dba3cdfdf726eec.jpg' },
          text: 'Me encanta este lugar.'
        },
        {
          user: { name: 'Usuario3', photo: 'https://this-person-does-not-exist.com/img/avatar-geneec96d6cda207041ac55373bd1a453e2.jpg' },
          text: 'Excelente captura.'
        }
      ] // Comentarios de prueba
    }
  },
  data () {
    return {
      newComment: ''
    }
  },
  methods: {
    // Método para agregar un comentario
    addComment () {
      if (this.newComment.trim() !== '') {
        // Lógica para agregar el comentario
        this.newComment = ''
      }
    }
  }
}
</script>

<style scoped>
/* Estilos para el panel de comentarios */
.panel-comentarios {
  margin-top: 20px;
  background-color: #FAFAFA; /* Color de fondo */
  border-radius: 18px; /* Bordes redondeados */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px; /* Espaciado interno */
}

/* Estilos para el título */
.titulo {
  font-size: 1.5rem; /* Tamaño del título */
}

/* Estilos para cada comentario */
.comentario {
  display: flex; /* Mostrar comentarios en fila */
  margin-top: 22px; /* Espaciado entre comentarios */
  align-items: flex-start;
}

/* Estilos para el avatar */
.avatar {
  width: 50px; /* Ancho del avatar */
  height: 50px; /* Altura del avatar */
  border-radius: 50%; /* Bordes redondeados */
  margin-right: 10px; /* Espacio a la derecha del avatar */
  margin-top: -23px;
}

/* Estilos para el contenido del comentario */
.contenido {
  flex-grow: 1; /* Ocupar todo el espacio disponible */
}

/* Estilos para el nombre del usuario */
.nombre {
  font-weight: bold; /* Texto en negrita */
}

/* Estilos para el contenedor del nuevo comentario */
.nuevo-comentario {
  margin-top: 20px; /* Espaciado superior */
}

/* Estilos para el input del nuevo comentario */
.input-comment {
  width: 80%;
  border-radius: 20px; /* Bordes redondeados */
  padding: 8px 12px; /* Espaciado interno */
  border: 1px solid #ddd; /* Borde */
  flex-grow: 1; /* Ocupar todo el espacio disponible */
}

/* Estilos para el botón de enviar */
.custom-btn {
  font-size: 13px; /* Tamaño de fuente */
  padding: 8px 15px; /* Espaciado interno */
  border-radius: 25px; /* Bordes redondeados */
  text-transform: uppercase; /* Convertir texto a mayúsculas */
  background-color: #f44336; /* Color de fondo */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  transition: background-color 0.3s ease; /* Transición al pasar el ratón */
  cursor: pointer;
  margin-left: 10px;
}

/* Estilos adicionales cuando el botón está en estado hover (sobre) */
.custom-btn:hover {
  background-color: #d32f2f; /* Cambio de color de fondo */
}
@media (width <= 576px) {
  .custom-btn {
    margin-left: 5px; /* Ancho del panel de comentarios en pantallas más grandes */
  }
  .input-comment {
  width: 63%;
}}
@media (width <= 320px) {
  .custom-btn {
    padding: 5px 10px;
    margin-left: 2px;
  }
  .input-comment {
  width: 63%;
}
}
</style>
