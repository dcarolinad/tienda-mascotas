let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedor = document.getElementById('productos');



function corazonFav(p) {
    const on =
        typeof estaEnFavoritos === 'function' && estaEnFavoritos(p);
    return on ? '♥' : '♡';
}

function clasesFav(p) {
    const on =
        typeof estaEnFavoritos === 'function' && estaEnFavoritos(p);
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


function safeImgSrc(u) {
    return String(u ?? '').replace(/["'<>]/g, '');
}


let catalogo = [
    {
        nombre: "Alimento para perro",
        precio: 20000,
        imagen: "img/perro.jpg"
    },
    {
        nombre: "Juguete para gato",
        precio: 15000,
        imagen: "img/gato.jpg"
    }
];renderProductos();
function onProductosClick(ev) {
    const btn = ev.target.closest('[data-action][data-idx]');
    if (!btn || !contenedor.contains(btn)) return;
    const i = parseInt(btn.getAttribute('data-idx'), 10);
    const p = catalogo[i];
    if (!p) return;
    const action = btn.getAttribute('data-action');
    if (action === 'cart') {
        agregarCarrito(p);
    } else if (action === 'fav') {
        
        toggleFavorito(p, { currentTarget: btn });
    }
}

const contador = document.getElementById('contador');

function actualizarContador() {
    contador.innerText = carrito.length;
}

actualizarContador();

function agregarCarrito(producto) {
    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContador();

    alert('Producto agregado 🤖');
}
