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

// Función para agregar gorditas al pedido
function agregarPedido(item, precio) {
    if (pedido[item]) {
        pedido[item].cantidad += 1;
    } else {
        pedido[item] = { cantidad: 1, precio };
    }
    total += precio;
    actualizarPedido();
}

// Función para agregar bebidas al pedido
function agregarBebida(item, precio) {
    if (pedido[item]) {
        pedido[item].cantidad += 1;
    } else {
        pedido[item] = { cantidad: 1, precio };
    }
    total += precio;
    actualizarPedido();
}

// Actualizar la lista de pedido y total
function actualizarPedido() {
    const pedidoLista = document.getElementById('pedido-lista');
    const pedidoTotal = document.getElementById('pedido-total');

    pedidoLista.innerHTML = '';
    for (const item in pedido) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${pedido[item].cantidad} ${item} <button onclick="eliminarProducto('${item}')" class="btn btn-danger btn-sm ml-2">Eliminar</button>`;
        pedidoLista.appendChild(li);
    }

    pedidoTotal.textContent = total;
}

// Función para eliminar un producto
function eliminarProducto(item) {
    if (pedido[item]) {
        total -= pedido[item].precio;
        pedido[item].cantidad -= 1;

        if (pedido[item].cantidad === 0) {
            delete pedido[item];
        }
        actualizarPedido();
    }
}

// Enviar pedido a WhatsApp
function enviarPedido() {
    if (Object.keys(pedido).length === 0) {
        alert("Tu pedido está vacío. Añade algún producto antes de enviar.");
        return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas enviar este pedido?");
    if (confirmacion) {
        const telefono = "524411156678"; // Reemplaza con el número de WhatsApp
        const entrega = document.querySelector('input[name="entrega"]:checked').value;
        
        let mensaje = `Hola, soy ${nombre}, me gustaría ordenar:\n`;
        for (const item in pedido) {
            mensaje += `${pedido[item].cantidad} ${item}\n`;
        }
        mensaje += `\nTotal: $${total}\nEntrega: ${entrega}`;

        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }
}
