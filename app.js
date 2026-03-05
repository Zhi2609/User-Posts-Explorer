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
        card.className = "post-card";
        card.innerHTML = `<h6>${post.title}</h6><p>${post.body}</p>`;
        posts.appendChild(card);
      });
    });
});
