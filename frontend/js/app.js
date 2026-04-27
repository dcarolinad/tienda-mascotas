let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedor = document.getElementById('productos');

let catalogo = [
    {
        nombre: "Cama para mascota",
        precio: 45000,
        imagen: "./img/cama.jpg"
    },
    {
        nombre: "Concentrado premium",
        precio: 30000,
        imagen: "./img/concentrado.jpg"
    },
    {
        nombre: "Consulta veterinaria",
        precio: 60000,
        imagen: "./img/doctor.jpg"
    },
    {
        nombre: "Juguetes para mascota",
        precio: 20000,
        imagen: "./img/juguete.jpg"
    },
    {
        nombre: "Peluquería canina",
        precio: 35000,
        imagen: "./img/peluqueria.jpg"
    },
    {
        nombre: "Productos varios",
        precio: 15000,
        imagen: "./img/varios.jpg"
    }
];

function corazonFav(p) {
    const on = typeof estaEnFavoritos === 'function' && estaEnFavoritos(p);
    return on ? '♥' : '♡';
}

function clasesFav(p) {
    const on = typeof estaEnFavoritos === 'function' && estaEnFavoritos(p);
    return on
        ? 'btn btn-danger btn-sm btn-fav position-absolute top-0 end-0 m-2'
        : 'btn btn-light btn-sm btn-fav position-absolute top-0 end-0 m-2';
}

function ariaFav(p) {
    return typeof estaEnFavoritos === 'function' && estaEnFavoritos(p)
        ? 'true'
        : 'false';
}

function escapeHtml(s) {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderProductos() {
    if (!contenedor) return;

    contenedor.innerHTML = '';

    catalogo.forEach((p, index) => {
        contenedor.innerHTML += `
        <div class="col-md-4">
            <div class="card mb-4 shadow">
                <div class="producto-thumb">
                    <img src="${p.imagen}" alt="${escapeHtml(p.nombre)}">
                </div>

                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(p.nombre)}</h5>
                    <p class="card-text">$${p.precio}</p>

                    <button class="btn btn-primary" data-idx="${index}" data-action="cart">
                        Agregar al carrito
                    </button>

                    <button class="btn btn-outline-danger" data-idx="${index}" data-action="fav">
                        ${corazonFav(p)}
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

function onProductosClick(ev) {
    const btn = ev.target.closest('[data-action][data-idx]');
    if (!btn) return;

    const i = parseInt(btn.dataset.idx);
    const p = catalogo[i];

    if (!p) return;

    const action = btn.dataset.action;

    if (action === 'cart') {
        agregarCarrito(p);
    }

    if (action === 'fav') {
        if (typeof toggleFavorito === 'function') {
            toggleFavorito(p, { currentTarget: btn });
        }
    }
}

function agregarCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert('Producto agregado 🤖');
}

const contador = document.getElementById('contador');

function actualizarContador() {
    if (contador) {
        contador.innerText = carrito.length;
    }
}

if (contenedor) {
    contenedor.addEventListener('click', onProductosClick);
}

renderProductos();
actualizarContador();
