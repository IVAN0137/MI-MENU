// script.js

// Borrar caché al cargar la página
window.onload = function() {
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                caches.delete(cacheName);
            });
        });
    }
};

let pedido = {};
let total = 0;

// Función para agregar pedido
function agregarPedido(item, precio) {
    if (pedido[item]) {
        pedido[item].cantidad += 1;
    } else {
        pedido[item] = { cantidad: 1, precio };
    }
    total += precio;
    actualizarPedido();
}

// Función para actualizar el pedido en el DOM
function actualizarPedido() {
    const pedidoLista = document.getElementById('pedido-lista');
    const pedidoTotal = document.getElementById('pedido-total');

    pedidoLista.innerHTML = '';
    for (const item in pedido) {
        const li = document.createElement('li');
        li.innerHTML = `${pedido[item].cantidad} x ${item}
            <button onclick="eliminarProducto('${item}')" class="btn btn-danger btn-sm ml-2">Eliminar</button>`;
        pedidoLista.appendChild(li);
    }

    pedidoTotal.textContent = total;
}

// Función para eliminar un producto del pedido
function eliminarProducto(item) {
    if (pedido[item]) {
        if (pedido[item].cantidad > 1) {
            pedido[item].cantidad -= 1;
            total -= pedido[item].precio;
        } else {
            total -= pedido[item].precio;
            delete pedido[item];
        }
        actualizarPedido();
    }
}

// Función para enviar el pedido
function enviarPedido() {
    if (Object.keys(pedido).length === 0) {
        alert("Tu pedido está vacío. Añade algún producto antes de enviar.");
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const tipoEntrega = document.querySelector('input[name="entrega"]:checked').value;

    const confirmacion = confirm("¿Estás seguro de que deseas enviar este pedido?");
    if (confirmacion) {
        const telefono = "524411156678"; // Reemplaza con el número de WhatsApp
        let mensaje = `Hola, me gustaría ordenar:\n`;

        for (const item in pedido) {
            mensaje += `${pedido[item].cantidad} x ${item}\n`;
        }
        mensaje += `\nTotal: $${total}\n`;
        mensaje += `Nombre: ${nombre}\n`;
        mensaje += `Entrega: ${tipoEntrega}`;

        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }
}

// Función para mostrar el menú de bebidas
function mostrarBebidaMenu() {
    document.getElementById('menu-bebidas').classList.remove('d-none');
}

// Función para ocultar el menú de bebidas
function ocultarBebidaMenu() {
    document.getElementById('menu-bebidas').classList.add('d-none');
}

// Función para agregar bebida al pedido
function agregarBebida(item, precio) {
    agregarPedido(item, precio);
    ocultarBebidaMenu();
}
