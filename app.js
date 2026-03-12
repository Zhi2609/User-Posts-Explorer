document.getElementById("btnCargar").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((usuarios) => {
      const select = document.getElementById("menu");
      select.innerHTML =
        '<option value="">-- Selecciona un usuario --</option>';
      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = usuario.username;
        select.appendChild(option);
      });
    });
});

document.getElementById("menu").addEventListener("change", (e) => {
  const userId = e.target.value;
  const posts = document.getElementById("posts");
  posts.innerHTML = "";
  if (!userId) return;

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((post) => {
        const card = document.createElement("div");
        card.className = "card post-card";
        card.innerHTML = `
          <div class="card-body">
            <h6 class="card-title text-capitalize">${post.title}</h6>
            <p class="card-text text-muted">${post.body}</p>
            <div class="mt-3">
              <button class="btn btn-success btn-sm me-2 mb-2" onclick="verComentarios(${post.id})">Ver comentarios</button>
              <button class="btn btn-secondary btn-sm me-2 mb-2" onclick="ocultarComentarios(${post.id})">Ocultar comentarios</button>
              <button class="btn btn-info btn-sm text-white mb-2" onclick="mostrarFormularioComentario(${post.id})">Agregar comentario</button>
            </div>
            
            <div id="formulario-contenedor-${post.id}" class="mt-2 d-none">
              <form onsubmit="enviarComentario(event, ${post.id})">
                <input type="email" id="email-${post.id}" class="form-control form-control-sm mb-2" placeholder="Tu correo electrónico" required />
                <textarea id="cuerpo-${post.id}" class="form-control form-control-sm mb-2" placeholder="Escribe tu comentario" required></textarea>
                <button type="submit" class="btn btn-primary btn-sm">Enviar</button>
              </form>
            </div>

            <div id="comentarios-${post.id}" class="mt-3"></div>
          </div>
        `;
        posts.appendChild(card);
      });
    });
});

const verComentarios = (postId) => {
  const contenedor = document.getElementById(`comentarios-${postId}`);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((comentarios) => {
      contenedor.innerHTML = comentarios
        .map(
          (c) => `
        <div class="border-top pt-2 mt-2">
          <strong>${c.email}</strong>
          <p class="small mb-0">${c.body}</p>
        </div>
      `,
        )
        .join("");
    });
};

const ocultarComentarios = (postId) => {
  const contenedor = document.getElementById(`comentarios-${postId}`);
  if (contenedor) {
    contenedor.innerHTML = "";
  }
};

const mostrarFormularioComentario = (postId) => {
  const contenedorFormulario = document.getElementById(
    `formulario-contenedor-${postId}`,
  );
  contenedorFormulario.classList.toggle("d-none");
};

const enviarComentario = (evento, postId) => {
  evento.preventDefault();

  const inputEmail = document.getElementById(`email-${postId}`);
  const inputCuerpo = document.getElementById(`cuerpo-${postId}`);

  const datosComentario = {
    postId: postId,
    email: inputEmail.value,
    body: inputCuerpo.value,
  };

  fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    body: JSON.stringify(datosComentario),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((comentarioNuevo) => {
      const contenedorComentarios = document.getElementById(
        `comentarios-${postId}`,
      );
      const htmlComentario = `
      <div class="border-top border-primary pt-2 mt-2">
        <strong>${comentarioNuevo.email}</strong>
        <p class="small mb-0">${comentarioNuevo.body}</p>
      </div>
    `;

      contenedorComentarios.insertAdjacentHTML("beforeend", htmlComentario);

      inputEmail.value = "";
      inputCuerpo.value = "";
      mostrarFormularioComentario(postId);
    });
};

window.verComentarios = verComentarios;
window.ocultarComentarios = ocultarComentarios;
window.mostrarFormularioComentario = mostrarFormularioComentario;
window.enviarComentario = enviarComentario;
