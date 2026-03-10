/* const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Network response was not ok: ${res.statusText}`);
  }
  return res.json();
}; */

document.getElementById("btnCargar").addEventListener("click", () => {
  const select = document.getElementById("menu");
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(checkResponse)
    .then((usuarios) => {
      select.innerHTML =
        '<option value="">-- Selecciona un usuario --</option>';
      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = usuario.username;
        select.appendChild(option);
      });
    })
    .catch((error) => handleApiError(error, document.getElementById("posts")));
});

document.getElementById("menu").addEventListener("change", (e) => {
  const userId = e.target.value;
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";
  if (!userId) return;

  postsContainer.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(checkResponse)
    .then((posts) => {
      postsContainer.innerHTML = ""; // Clear spinner
      if (posts.length === 0) {
        postsContainer.innerHTML =
          '<p class="text-center">Este usuario no tiene publicaciones.</p>';
        return;
      }

      posts.forEach((post) => {
        const card = document.createElement("div");
        card.className = "card mb-3";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        cardBody.innerHTML = `
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
        `;

        const viewBtn = document.createElement("button");
        viewBtn.className = "btn btn-primary btn-sm me-2";
        viewBtn.textContent = "Ver comentarios";

        const hideBtn = document.createElement("button");
        hideBtn.className = "btn btn-secondary btn-sm";
        hideBtn.textContent = "Ocultar comentarios";
        hideBtn.style.display = "none";

        const commentsDiv = document.createElement("div");
        commentsDiv.className = "mt-4";

        viewBtn.addEventListener("click", () => {
          commentsDiv.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>`;
          fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
          )
            .then(checkResponse)
            .then((comments) => {
              commentsDiv.innerHTML = '<h6 class="mb-3">Comentarios:</h6>';
              const commentsList = document.createElement("ul");
              commentsList.className = "list-group list-group-flush";
              comments.forEach((comment) => {
                const li = document.createElement("li");
                li.className = "list-group-item px-0";
                li.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                      <strong class="mb-1">${comment.name}</strong>
                      <small class="text-muted">${comment.email}</small>
                    </div>
                    <p class="mb-1">${comment.body}</p>
                  `;
                commentsList.appendChild(li);
              });
              commentsDiv.appendChild(commentsList);
              viewBtn.style.display = "none";
              hideBtn.style.display = "inline-block";
            })
            .catch((error) => handleApiError(error, commentsDiv));
        });

        hideBtn.addEventListener("click", () => {
          commentsDiv.innerHTML = "";
          hideBtn.style.display = "none";
          viewBtn.style.display = "inline-block";
        });

        cardBody.appendChild(viewBtn);
        cardBody.appendChild(hideBtn);
        cardBody.appendChild(commentsDiv);
        card.appendChild(cardBody);
        postsContainer.appendChild(card);
      });
    })
    .catch((error) => handleApiError(error, postsContainer));
});
