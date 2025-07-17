document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".agregar-carrito");
  const carritoItems = document.querySelector(".carrito-items");
  const totalCarrito = document.querySelector("#total");
  const vaciarBtn = document.querySelector("#vaciar-carrito");
  const pagarBtn = document.querySelector("#pagar-carrito");
  const form = document.querySelector("form");

  let carrito = [];

  // Agregar producto al carrito
  botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", () => {
      const producto = btn.dataset.producto;
      const precio = parseFloat(btn.dataset.precio);

      if (!producto || isNaN(precio)) {
        alert("Error: Datos del producto no válidos.");
        return;
      }

      const encontrado = carrito.find((item) => item.nombre === producto);
      if (encontrado) {
        encontrado.cantidad++;
      } else {
        carrito.push({ nombre: producto, precio, cantidad: 1 });
      }
      actualizarCarrito();
    });
  });

  // Vaciar carrito
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      carrito = [];
      actualizarCarrito();
    });
  }

  // Simular pago
  if (pagarBtn) {
    pagarBtn.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
      } else {
        alert("✅ ¡Gracias por tu compra! Tu pedido está en camino.");
        carrito = [];
        actualizarCarrito();
      }
    });
  }

  // Actualizar contenido del carrito
  function actualizarCarrito() {
    if (!carritoItems) return;

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

    if (totalCarrito) {
      totalCarrito.textContent = total.toFixed(2);
    }
  }

  // Formulario de contacto
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("¡Gracias por contactarnos! Te responderemos pronto.");
      form.reset();
    });
  }
});
