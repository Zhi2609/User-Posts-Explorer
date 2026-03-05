document.getElementById("btnCargar").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((usuarios) => {
      const select = document.getElementById("selectUsuarios");
      select.innerHTML = '<option value="">-- Selecciona un usuario --</option>';
      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = usuario.username;
        select.appendChild(option);
      });
    });
});