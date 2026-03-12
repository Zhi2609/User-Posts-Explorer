# User Posts Explorer 🚀

Una aplicación web sencilla que conecta con una API externa para visualizar publicaciones de usuarios y sus interacciones de forma dinámica.

## ✨ ¿Qué hace este proyecto?
* **Carga de Usuarios:** Al presionar un botón, obtiene una lista de usuarios desde una API.
* **Filtro Dinámico:** Al seleccionar un usuario del menú, se buscan y muestran sus publicaciones específicas.
* **Gestión de Comentarios:** Cada publicación cuenta con botones para obtener y visualizar sus comentarios, así como para ocultarlos y mantener la interfaz limpia.
* **Creación de Comentarios:** Incluye un formulario desplegable para simular la creación de nuevos comentarios en una publicación específica mediante peticiones POST.
* **Diseño con Bootstrap:** Utiliza tarjetas (Cards), botones y clases utilitarias de Bootstrap 5 para asegurar un diseño responsivo y moderno.

## 🛠️ Tecnologías
* **HTML5:** Estructura de la aplicación.
* **JavaScript (Módulos ES6 & Fetch API):** Para el consumo asíncrono de datos (GET y POST) desde la API, gestionando el alcance (scope) a través de módulos.
* **CSS3 y Bootstrap 5:** Para los estilos personalizados y el diseño de la interfaz.

## 📌 Nota sobre la API
Este proyecto utiliza la API pública de pruebas [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Al crear un nuevo comentario, la API responde con un mensaje de éxito simulando la creación, pero los datos no se persisten de manera permanente en el servidor.