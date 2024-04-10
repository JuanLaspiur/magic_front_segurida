
const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Admin
      { path: '/modulo_insignas-usuarios', component: () => import('pages/admin/UsuariosModuloInsignas.vue') },
      { path: '/modulo_insignas', component: () => import('pages/admin/ModuloInsignas.vue') },
      { path: '/datos_graficos', component: () => import('pages/admin/DatosGradicos.vue') },
      { path: '/administrador', component: () => import('pages/admin/Inicio.vue') },
      { path: '/usuarios-online', component: () => import('pages/admin/UsuariosOnline.vue') },
      { path: '/usuarios-bloqueados', component: () => import('pages/admin/UsuariosBloqueados.vue') },
      { path: '/rankings', component: () => import('pages/admin/Rankings.vue') },
      { path: '/moderadores', component: () => import('pages/admin/Moderadores.vue') },
      { path: '/mediacion', component: () => import('pages/admin/Mediacion.vue') },
      { path: '/mediacion/:id', component: () => import('pages/admin/ChatMediacion.vue') },
      { path: '/nuevo_moderador', component: () => import('pages/admin/RegisterModerador.vue') },
      { path: '/moderador/:id', component: () => import('pages/admin/RegisterModerador.vue') },
      { path: '/tabloides', component: () => import('pages/admin/Tabloide.vue') },
      { path: '/tabloide/:id', component: () => import('pages/admin/EditTabloide.vue') },
      { path: '/planes_module', component: () => import('pages/admin/PlanesModule.vue') },
      { path: '/plan_view_admin/:id/:user_id', component: () => import('pages/admin/VerQuedadaAdmin.vue') },
      { path: '/encuestas', component: () => import('pages/admin/Encuestas.vue') },
      { path: '/categorias', component: () => import('pages/admin/GestionCategorias.vue') },
      // User
      { path: '/inicio', component: () => import('pages/user/InicioNuevo.vue'), meta: { title: 'Inicio', change: 1 } },
      { path: '/inicio2', component: () => import('pages/user/Inicio.vue'), meta: { title: 'Inicio', change: 1 } },
      { path: '/users-rankings', component: () => import('pages/user/Rankings.vue'), meta: { title: 'Rankings', change: 1 } },
      { path: '/mis_chats', component: () => import('pages/user/AllChats.vue'), meta: { chat: true } },
      { path: '/solicitudes', component: () => import('pages/user/Solicitudes.vue'), meta: { title: 'Solicitudes', change: 2 } },
      { path: '/notificaciones', component: () => import('pages/user/Notifications.vue'), meta: { title: 'Notificaciones', change: 3 } },
      { path: '/mediaciones', component: () => import('pages/user/Mediaciones.vue'), meta: { title: 'Mediaciones', change: 4 } },
      { path: '/asistidos', component: () => import('pages/user/Asistidos.vue'), meta: { title: 'Asistidos', change: 5 } },
      { path: '/planes', component: () => import('pages/user/Planes.vue'), meta: { title: 'Todos los planes', change: 6 } },
      { path: '/planes/:obj', component: () => import('pages/user/Planes.vue'), meta: { title: 'Planes', change: 7 } },
      { path: '/amistades', component: () => import('pages/user/Personas.vue'), meta: { title: 'Amistades', change: 8 } },
      // { path: '/muro_usuario', component: () => import('pages/user/Muro.vue'), meta: { title: 'Mi perfil', change: 9 } },
      { path: '/muro_usuario', component: () => import('pages/user/NuevoMuro.vue'), meta: { title: 'Mi perfil', change: 9 } },
      // { path: '/muro_usuario/:id', component: () => import('pages/user/VerMuro.vue'), meta: { title: 'Muro', change: 10 } },
      { path: '/muro_usuario/:id', component: () => import('pages/user/NuevoVerMuro.vue'), meta: { title: 'Muro', change: 10 } },
      { path: '/seguidores/:id', component: () => import('pages/user/Seguidores.vue'), meta: { title: 'Seguidores', change: 11 } },
      { path: '/seguidos/:id', component: () => import('pages/user/Seguidos.vue'), meta: { title: 'Seguidos', change: 12 } }
    ]
  },
  // User
  { path: '/nueva_quedada', component: () => import('pages/user/NewQuedada.vue') },
  { path: '/chat/:id', component: () => import('pages/user/Chat.vue') },
  { path: '/chat_mediacion/:id', component: () => import('pages/user/ChatMediacion.vue') },
  { path: '/modificar_quedada/:id', component: () => import('pages/user/NewQuedada.vue') },
  { path: '/quedada/:id', component: () => import('pages/user/VerQuedada.vue') },
  { path: '/perfil/:id', component: () => import('pages/user/EditPerfil.vue') },
  // General
  { path: '/splash', component: () => import('pages/Splash.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/registro', component: () => import('pages/Registro.vue') },
  { path: '/recuperacion/:code', component: () => import('pages/Reestablecer.vue') },
  {
    path: '/',
    redirect: '/splash'
  },
  {
    path: '*',
    redirect: '/splash'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
