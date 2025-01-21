// Función que guarda los envíos realizados en el localStorage del navegador
function guardarEnviosEnStorage() {
    // Convierte el array 'enviosRealizados' a formato JSON y lo guarda en localStorage
    localStorage.setItem("enviosRealizados", JSON.stringify(enviosRealizados));
}

// Función que carga los envíos realizados desde el localStorage
function cargarEnviosDesdeStorage() {
    // Obtiene los datos guardados en localStorage
    const datosGuardados = localStorage.getItem("enviosRealizados");
    // Si hay datos guardados, los convierte de nuevo a un array. Si no, devuelve un array vacío.
    return datosGuardados ? JSON.parse(datosGuardados) : [];
}

// Carga los envíos realizados desde el almacenamiento y los guarda en la variable 'enviosRealizados'
const enviosRealizados = cargarEnviosDesdeStorage();

// Función para validar las entradas del formulario antes de proceder con el cálculo
function validarEntradas(valorProducto, pesoProducto, categoriaProducto, lugarCompra) {
    // Si cualquiera de los valores es inválido o falta, muestra un mensaje de error y detiene la ejecución
    if (valorProducto <= 0 || pesoProducto <= 0 || !categoriaProducto || !lugarCompra) {
        resultadoContainer.innerHTML = "<p class='text-danger'>Por favor, complete todos los campos con valores válidos.</p>";
        return false;
    }
    return true;  // Si todo es válido, devuelve true
}

// Función que calcula los costos asociados al envío (basado en el valor del producto, peso, categoría y lugar de compra)
function calcularCostos(valorProducto, pesoProducto, categoriaProducto, lugarCompra) {
    // Determina el costo por kilogramo según el lugar de compra
    const costoPorKg = lugarCompra === "china" ? 16 : 9;

    // Obtiene la categoría seleccionada
    const categoriaSeleccionada = categorias[categoriaProducto];

    // Si la categoría no es válida, muestra un mensaje de error y retorna null
    if (!categoriaSeleccionada) {
        resultadoContainer.innerHTML = "<p class='text-danger'>Categoría no válida. Por favor, seleccione una opción correcta.</p>";
        return null;
    }

    // Calcula el costo base del envío en función del peso del producto y el costo por kg
    const costoBaseEnvio = costoPorKg * pesoProducto;

    // Calcula los impuestos totales aplicando las tasas definidas en la categoría seleccionada
    const totalImpuestos = valorProducto * (
        categoriaSeleccionada.tasaEstadistica +
        categoriaSeleccionada.tasaDerechos +
        categoriaSeleccionada.iva +
        categoriaSeleccionada.impuestosInternos
    );

    // Define los costos fijos (modificados a 30 USD)
    const costosFijos = 30;

    // Calcula el costo total sumando el costo base del envío, los impuestos y los costos fijos
    const costoTotal = costoBaseEnvio + totalImpuestos + costosFijos;

    // Retorna un objeto con todos los costos calculados
    return { costoBaseEnvio, totalImpuestos, costosFijos, costoTotal };
}

// Función que capitaliza el texto, convirtiendo las palabras en formato "snake_case" a formato normal
function capitalizarTexto(texto) {
    return texto
        .split("_")  // Divide el texto por guiones bajos
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())  // Capitaliza la primera letra de cada palabra
        .join(" ");  // Une las palabras nuevamente con un espacio
}

// Función para mostrar los resultados del cálculo en la interfaz de usuario
function mostrarResultados(lugarCompra, categoriaProducto, valorProducto, pesoProducto, costos) {
    // Capitaliza el lugar de compra (China, Estados Unidos, etc.)
    const lugarCompraFormateado = capitalizarTexto(lugarCompra);

    // Añade la clase 'mostrar' al contenedor de resultados para hacerlo visible
    resultadoContainer.classList.add("mostrar");

    // Rellena el contenedor con los resultados formateados, incluyendo los valores calculados
    resultadoContainer.innerHTML = `
        <p class="titulo">Resultado Final</p>
        <ul>
            <li><span>Lugar de compra:</span><span>${lugarCompraFormateado}</span></li>
            <li><span>Categoría:</span><span>${categorias[categoriaProducto].nombre}</span></li>
            <li><span>Valor del producto:</span><span>USD$${valorProducto.toFixed(2)}</span></li>
            <li><span>Peso del producto:</span><span>${pesoProducto} kg</span></li>
            <li><span>Costo base del envío:</span><span>USD$${costos.costoBaseEnvio.toFixed(2)}</span></li>
            <li><span>Impuestos totales:</span><span>USD$${costos.totalImpuestos.toFixed(2)}</span></li>
            <!-- Línea divisoria después del peso -->
            <li class="honorarios"><span>Honorarios:</span><span>USD$${costos.costosFijos.toFixed(2)}</span></li>
        </ul>
        <div class="costo-total">
            <span>Costo total:</span><span class="costo-total-numero">USD$${costos.costoTotal.toFixed(2)}</span>
        </div>
    `;
}
