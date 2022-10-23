
// Clase constructora

class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

const cocaCola = new Producto(1, "Coca cola", 250, "../img/cocacola.jpg")
const pepsi = new Producto(2, "Pepsi", 250, "../img/pepsi.jpg")
const sprite = new Producto(3, "Sprite", 250, "/img/sprite.jpg")
const fanta = new Producto(4, "Fanta", 250, "../img/fanta.jpg")
const laysClasica = new Producto(5, "Lays Clasica", 180, "../img/laysclasica.jpg")
const cheetos = new Producto(6, "Cheetos", 180, "../img/cheetos.jpg")
const milkaOreo = new Producto(7, "Milka Oreo", 120, "../img/milkaoreo.jpg")
const kitkat = new Producto(8, "Kitkat", 100, "../img/kitkat.jpg")
const rocklets = new Producto(9, "Rocklets", 100, "../img/rocklets.jpg")
const alfajorPepitos = new Producto(10, "Alfajor Pepitos", 100, "../img/alfajorpepitos.jpg")
const mantecol = new Producto(11, "Mantecol", 100, "../img/mantecol.jpg")
const kinder = new Producto(12, "Kinder", 100, "../img/chocolatekinder.jpg")

// Array de productos

const productos = [cocaCola, pepsi, sprite, fanta, laysClasica, cheetos, milkaOreo, kitkat, rocklets, alfajorPepitos, mantecol, kinder];

// Array de carrito

let carrito = [];

// Cargar carrito desde el LS

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

// Modifica DOM para mostrar los productos

const contenedorProductos = document.getElementById("contenedorProductos")

// Funcion para mostrar productos

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
      <div class="card border-warning border border-5">
        <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
        <div class="card-body">
          <h3 class="card-title text-decoration-underline bg-warning">${producto.nombre}</h3>
          <p class="card-text"><i class="bi bi-currency-dollar">${producto.precio}</i></p>
          <button class="btn btn-danger" id="boton${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    `
    contenedorProductos.appendChild(card);

    // Agregar productos al carrito

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    })
  })
}

// Funcion agregar al carrito

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
    // Se guarda en el LS
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  calcularTotal();
}

mostrarProductos();


// Mostrar carrito de compras

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

// Funcion mostrar carrito

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
      <div class="card border-danger border border-5">
        <img src="${producto.img}" class="card-img-top rounded imgProductos" alt="${producto.nombre}">
        <div class="card-body">
          <h3 class="card-title text-decoration-underline bg-danger">${producto.nombre}</h3>
          <p class="card-text">$${producto.precio}</p>
          <p class="card-text">Cantidad: ${producto.cantidad}</p>
          <button class="btn btn-danger" id="eliminar${producto.id}">Eliminar producto</button>
        </div>
      </div>
    `
    contenedorCarrito.appendChild(card);

    // Eliminar producto del carrito

    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    })
  })
  calcularTotal();
}


// Funcion eliminar producto del carrito

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito


const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
})
// Función para eliming to el carrito:
const eliminarTodoElCarrito = () => {
  carrito = [];
  mostrarCarrito();
  localStorage.clear();
}

// Mensaje total de compra

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad
  })
  total.innerHTML = `$${totalCompra}`;
}