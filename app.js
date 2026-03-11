document.getElementById("btnCargar").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((usuarios) => {
      const select = document.getElementById("menu");
      select.innerHTML = '<option value="">-- Selecciona un usuario --</option>';
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
              <button class="btn btn-success btn-sm me-2" onclick="verComentarios(${post.id})">Ver comentarios</button>
              <button class="btn btn-secondary btn-sm" onclick="ocultarComentarios(${post.id})">Ocultar comentarios</button>
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
      contenedor.innerHTML = comentarios.map(c => `
        <div class="border-top pt-2 mt-2">
          <strong>${c.email}</strong>
          <p class="small mb-0">${c.body}</p>
        </div>
      `).join("");
    });
};

const ocultarComentarios = (postId) => {
  const contenedor = document.getElementById(`comentarios-${postId}`);
  if (contenedor) {
    contenedor.innerHTML = "";
  }
};

window.verComentarios = verComentarios;
window.ocultarComentarios = ocultarComentarios;