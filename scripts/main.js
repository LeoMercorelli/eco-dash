// ---------------------------------------- DECLARACION DE CLASE ----------------------------------------
class Categorias {
    constructor(nombre, tasaEstadistica, tasaDerechos, iva, impuestosInternos) {
        this.nombre = nombre;
        this.tasaEstadistica = tasaEstadistica;
        this.tasaDerechos = tasaDerechos;
        this.iva = iva;
        this.impuestosInternos = impuestosInternos;
    }
}





// --------------------------- COSNTRUCCION DE OBJETO CON CLASE ---------------------------
const categorias = {
    electronica: new Categorias("Electronica", 0.03, 0.20, 0.21, 0.05),
    ropa: new Categorias("Ropa", 0.02, 0.15, 0.21, 0.00),
    juguetes: new Categorias("Juguetes", 0.01, 0.10, 0.21, 0.00)
};





// ---------------------------------------- OBJETO GASTOS VARIABLES ---------------------------------------- 
const costosVariables = {
    honorarios: 35,
    gastosAdministrativos: 5,
    corte: 5,
    handling: 5,
    corteGuia: 5,
    res3466: 5,
    actualizarCosto(costo, nuevoValor) {
        if (this.hasOwnProperty(costo)) {
            this[costo] = nuevoValor;
            console.log(`Costo ${costo} actualizado a $${nuevoValor}`);
        } else {
            console.log(`El costo ${costo} no existe.`);
        }
    }
};





// ---------------------------------------- ARRAY PARA GUARDAR LOS ENVIOS REALIZADOS ----------------------------------------
const enviosRealizados = [];





// ---------------------------------------- FUNCION AUXILIAR PARA VALIDAR NUMEROS ----------------------------------------
function validarNumero(input, mensaje) {
    while (isNaN(input) || input.trim() === "" || input.includes(',')) {
        alert("Por favor, ingrese un valor numerico valido con punto como separador decimal.");
        input = prompt(mensaje);
    }
    return parseFloat(input);
}










// !---------------------------------------------------------------------------------------------------
// !---------------------------------------- FUNCION PRINCIPAL ----------------------------------------
// !---------------------------------------------------------------------------------------------------

function calcularEnvio() {
    alert("¡Bienvenido a la calculadora de envios de EcoDASH!");





    // -------------DECLARACION DE VARIABLES ------------------
    let lugarCompra, categoriaProducto, valorProducto, pesoProducto, costoPorKg;





    // ------------- LUGAR DE COMPRA ----------------
    lugarCompra = prompt("¿Donde realizo la compra?\nA) China\nB) Estados Unidos").toUpperCase();
    while (lugarCompra !== "A" && lugarCompra !== "B") {
        alert("Respuesta no valida. Por favor, ingrese 'A' para China o 'B' para Estados Unidos.");
        lugarCompra = prompt("¿Donde realizo la compra?\nA) China\nB) Estados Unidos").toUpperCase();
    }



    // ------------- COSTO POR Kg, SEGUN LUGAR DE COMPRA --------------------
    costoPorKg = lugarCompra === "A" ? 16 : 9;



    // ---------------- ELECCION DE CATEGORIA -------------------
    categoriaProducto = prompt("¿A que categoria pertenece su producto?\n- Electronica\n- Ropa\n- Juguetes").toLowerCase();
    while (!categorias[categoriaProducto]) {
        alert("Categoria no valida. Por favor, elija entre: Electronica, Ropa o Juguetes.");
        categoriaProducto = prompt("¿A que categoria pertenece su producto?\n- Electronica\n- Ropa\n- Juguetes").toLowerCase();
    }



    // ------------- VALOR DEL PRODUCTO ----------------
    valorProducto = validarNumero(
        prompt("¿Cual es el valor total del producto en dolares?"),
        "¿Cual es el valor total del producto en dolares?"
    );



    // ------------- PESO DEL PRODUCTO ----------------
    pesoProducto = validarNumero(
        prompt("¿Cuanto pesa el producto en kilogramos?"),
        "¿Cuanto pesa el producto en kilogramos?"
    );






    // ------------------- CALCULO DE COSTOS -----------------
    const costoBaseEnvio = costoPorKg * pesoProducto;
    const categoriaSeleccionada = categorias[categoriaProducto];
    const totalImpuestos = valorProducto * (
        categoriaSeleccionada.tasaEstadistica +
        categoriaSeleccionada.tasaDerechos +
        categoriaSeleccionada.iva +
        categoriaSeleccionada.impuestosInternos
    );





    // ------------------- FILTRAR COSTOS NUMERICOS Y SUMA -----------
    const costosFijos = Object.entries(costosVariables)
        .filter(([key, value]) => typeof value === "number")
        .reduce((total, [key, value]) => total + value, 0);
    const costoTotal = valorProducto + costoBaseEnvio + totalImpuestos + costosFijos;





    // ----------------------- PUSH DE ENVIO RELAIZADO DENTRO DEL ARRAY ------------------
    enviosRealizados.push({
        lugarCompra: lugarCompra === "A" ? "China" : "Estados Unidos",
        categoriaProducto,
        valorProducto,
        pesoProducto,
        costoBaseEnvio,
        totalImpuestos,
        costosFijos,
        costoTotal
    });




    // !---------------------------------------------------------------------------------------------------
    // !-------------------------------------- MOSTRAR RESUMEN FINAL --------------------------------------
    // !---------------------------------------------------------------------------------------------------

    alert(`
        Resumen de su envio:
        - Lugar de compra: ${lugarCompra === "A" ? "China" : "Estados Unidos"}
        - Costo por kg: $${costoPorKg}
        - Peso del producto: ${pesoProducto} kg
        - Categoria: ${categoriaProducto.charAt(0).toUpperCase() + categoriaProducto.slice(1)}
        - Valor del producto: $${valorProducto.toFixed(2)}
        - Impuestos totales: $${totalImpuestos.toFixed(2)}
        - Costos variables: $${costosFijos.toFixed(2)}
        - Costo total: $${costoTotal.toFixed(2)}

        ¡Gracias por usar EcoDASH!
    `);
}





// ------------------ METODOS DE BUSQUEDA Y FILTRADO -------------------
function buscarEnvioPorCategoria(categoria) {
    return enviosRealizados.filter(envio => envio.categoriaProducto === categoria.toLowerCase());
}

function buscarEnviosPorLugarCompra(lugar) {
    return enviosRealizados.filter(envio => envio.lugarCompra.toLowerCase() === lugar.toLowerCase());
}





// ------------------------LLAMADO DE FUNCION PRINCIPAL ----------------------
calcularEnvio();
