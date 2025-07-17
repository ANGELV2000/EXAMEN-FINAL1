document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".agregar-carrito");
  const carritoItems = document.querySelector(".carrito-items");
  const totalCarrito = document.querySelector("#total");
  const vaciarBtn = document.querySelector("#vaciar-carrito");
  const abrirCarritoBtn = document.querySelector("#abrirCarrito");
  const cerrarCarritoBtn = document.querySelector("#cerrarCarrito");
  const modalCarrito = document.querySelector("#carrito");
  const comprarBtn = document.querySelector("#comprar-carrito");

  let carrito = [];

  function actualizarCarrito() {
    carritoItems.innerHTML = "";
    let total = 0;
    carrito.forEach((item) => {
      total += item.precio * item.cantidad;
      const div = document.createElement("div");
      div.classList.add("carrito-item");
      div.innerHTML = `
        <span>${item.nombre}</span>
        <span>${item.cantidad} x S/.${item.precio.toFixed(2)}</span>
      `;
      carritoItems.appendChild(div);
    });
    totalCarrito.textContent = total.toFixed(2);
  }

  botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", () => {
      const producto = btn.dataset.producto;
      const precio = parseFloat(btn.dataset.precio);

      const existente = carrito.find((item) => item.nombre === producto);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ nombre: producto, precio, cantidad: 1 });
      }
      actualizarCarrito();
    });
  });

  vaciarBtn?.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });

  abrirCarritoBtn?.addEventListener("click", () => {
    modalCarrito.classList.remove("oculto");
  });

  cerrarCarritoBtn?.addEventListener("click", () => {
    modalCarrito.classList.add("oculto");
  });

  comprarBtn?.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🧺");
      return;
    }

    alert("¡Gracias por tu compra! 🧶✨");
    carrito = [];
    actualizarCarrito();
    modalCarrito.classList.add("oculto");
  });
});
