// Selección de los elementos del formulario a través de sus IDs para poder manipularlos con JavaScript
const valorProductoInput = document.querySelector("#valorProducto");  // Input del valor del producto
const pesoProductoInput = document.querySelector("#pesoProducto");  // Input del peso del producto
const lugarCompraSelect = document.querySelector("#lugarCompra");  // Select del lugar de compra
const categoriaProductoSelect = document.querySelector("#categoriaProducto");  // Select de la categoría del producto
const resultadoContainer = document.querySelector("#resultado");  // Contenedor donde se mostrarán los resultados

// Función para procesar el envío, realizar cálculos y mostrar resultados
function procesarEnvio() {
    // Recoger los valores de los inputs y selects
    const lugarCompra = lugarCompraSelect.value;  // Lugar de compra seleccionado
    const categoriaProducto = categoriaProductoSelect.value.toLowerCase();  // Categoría seleccionada (en minúsculas para evitar errores de comparación)
    const valorProducto = parseFloat(valorProductoInput.value);  // Valor del producto convertido a número decimal
    const pesoProducto = parseFloat(pesoProductoInput.value);  // Peso del producto convertido a número decimal

    // Validar si las entradas son correctas antes de continuar
    if (!validarEntradas(valorProducto, pesoProducto, categoriaProducto, lugarCompra)) return;

    // Calcular los costos del envío según los datos proporcionados
    const costos = calcularCostos(valorProducto, pesoProducto, categoriaProducto, lugarCompra);

    // Si se calcularon los costos correctamente, procedemos con el siguiente paso
    if (costos) {
        // Crear un nuevo objeto para el envío con todos los detalles (lugar de compra, categoría, valor, peso y costos)
        const nuevoEnvio = {
            lugarCompra,
            categoriaProducto,
            valorProducto,
            pesoProducto,
            ...costos  // Expandir los costos calculados dentro del objeto
        };

        // Guardar el nuevo envío en la lista de envíos realizados
        enviosRealizados.push(nuevoEnvio);
        // Guardar los envíos realizados en el almacenamiento local para persistencia
        guardarEnviosEnStorage();
        // Mostrar los resultados calculados en el contenedor de resultados
        mostrarResultados(lugarCompra, categoriaProducto, valorProducto, pesoProducto, costos);
    }
}

// Evento que escucha cuando se envía el formulario
document.querySelector("#formEnvio").addEventListener("submit", function(event) {
    // Prevenir que el formulario recargue la página al ser enviado
    event.preventDefault();
    // Llamar a la función procesarEnvio cuando el formulario es enviado
    procesarEnvio();
});
