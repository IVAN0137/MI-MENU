let pedido = [];
let total = 0;

function agregarPedido(item, precio) {
    const producto = { item, precio };
    pedido.push(producto);
    total += precio;
    actualizarPedido();
}

function actualizarPedido() {
    const pedidoLista = document.getElementById('pedido-lista');
    const pedidoTotal = document.getElementById('pedido-total');

    pedidoLista.innerHTML = '';
    pedido.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.item} - $${producto.precio} 
            <button onclick="eliminarProducto(${index})" class="btn-eliminar">Eliminar</button>`;
        pedidoLista.appendChild(li);
    });

    pedidoTotal.textContent = total;
}

function eliminarProducto(index) {
    total -= pedido[index].precio;
    pedido.splice(index, 1);
    actualizarPedido();
}

function enviarPedido() {
    if (pedido.length === 0) {
        alert("Tu pedido está vacío. Añade algún producto antes de enviar.");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas enviar este pedido?");
    if (confirmacion) {
        const telefono = "524411156678"; // Reemplaza con el número de WhatsApp
        const mensaje = encodeURIComponent(
            `Hola, me gustaría ordenar:\n` +
            pedido.map(p => `${p.item} - $${p.precio}`).join('\n') +
            `\nTotal: $${total}`
        );
        
        const url = `https://wa.me/${telefono}?text=${mensaje}`;
        window.open(url, '_blank');
    }
}
