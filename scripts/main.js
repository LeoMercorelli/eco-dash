// FUNCION PARA CALCULAR EL PRECIO DEL ENVIO
function calcularEnvio() {
    alert("¡Bienvenido a la calculador de envios de EcoDASH!");

    // DECLARACION DE VARIABLES LET
    let lugarCompra, destinoEntrega, valorProducto, pesoProducto, condicionFiscal;
    let costoEnvio, costoTotal, costoProvincia;

    // PROVINCIAS Y SUS COSTOS DE ENVIO
    const provincias = {
        "buenosaires": 18, "caba": 15, "catamarca": 12, "chaco": 15, "chubut": 14,
        "corrientes": 13, "entrerios": 16, "formosa": 17, "jujuy": 16, "lapampa": 14,
        "larioja": 15, "mendoza": 19, "misiones": 17, "neuquen": 16, "rionegro": 15,
        "salta": 19, "sanjuan": 18, "sanluis": 16, "santacruz": 13, "santafe": 19,
        "santiagodelestero": 14, "tierradelfuego": 12, "tucuman": 17
    };






    // SOLICITAR PAIS DE COMPRA 
    lugarCompra = prompt("¿En que pais realizo la compra? (Responda: China o Estados Unidos)").toLowerCase().replace(/\s+/g, '');
    // VALIDACION PAIS DE COMPRA (EEUU O CHINA)
    while (lugarCompra !== "china" && lugarCompra !== "estadosunidos") {
        alert("Las unicas respuestas validas son China o Estados Unidos.");
        lugarCompra = prompt("¿En que pais realizo la compra? (Responda: China o Estados Unidos)").toLowerCase().replace(/\s+/g, '');
    }
    // PRECIO SEGUN EL LUGAR DE COMPRA
    if (lugarCompra === "china") {
        costoEnvio = 30;  // PRECIO DESDE CHINA
    } else {
        costoEnvio = 20;  // PRECIO DESDE EEUU
    }







    // SOLICITUD DE PROVINCIA DE ENTREGA 
    destinoEntrega = prompt("¿A que provincia desea entregar el pedido? (Ingrese solo el nombre de la provincia)").toLowerCase().replace(/\s+/g, '');
    // VALIDACION DE PROVINCIA DE ENTREGA (ALGUNA DE LAS 23 DECLARADAS EN LA VARIABLE CONST)
    while (!provincias.hasOwnProperty(destinoEntrega)) {
        alert("Las únicas respuestas válidas son las provincias argentinas. Por favor, ingrese una provincia valida.");
        destinoEntrega = prompt("¿A que provincia desea entregar el pedido? (Ingrese solo el nombre de la provincia)").toLowerCase().replace(/\s+/g, '');
    }
    // PRECIO SEGUN LA PROVINCIA DE ENTREGA
    costoProvincia = provincias[destinoEntrega];








    // SOLICITUD PRECIO TOTAL DEL PRODUCTO COMPRADO
    valorProducto = prompt("¿Cual es el valor total del producto comprado en dolares? (Ingrese solo numeros)");
    // VALIDACION DE PRECIO TOTAL DEL PRODUCTO COPMRADO
    while (isNaN(valorProducto) || valorProducto.trim() === '') {
        alert("Por favor, ingrese un valor numerico valido.");
        valorProducto = prompt("¿Cual es el valor total del producto comprado en dolares? (Ingrese solo numeros)");
    }
    // CADENA DE TEXTO A NUMERO
    valorProducto = parseFloat(valorProducto);







    // SOLICITUD PESO DEL PRODUCTO
    pesoProducto = prompt("¿Cuanto pesa el producto en kg? (Ingrese solo numeros)");
    // VALIDACION PESO DEL PRODUCTO
    while (isNaN(pesoProducto) || pesoProducto.trim() === '') {
        alert("Por favor, ingrese un valor numerico valido para el peso.");
        pesoProducto = prompt("¿Cuanto pesa el producto en kg? (Ingrese solo numeros)");
    }
    // CADENA DE TEXTO A NUMERO
    pesoProducto = parseFloat(pesoProducto);

    // SOLOCITUD CONDICION FISCAL
    condicionFiscal = prompt("¿Cual es su condición fiscal? (Ejemplo: Responsable Inscripto, Monotributista, Consumidor Final)").toLowerCase().replace(/\s+/g, '');
    // VALIDACION CONDICION FISCAL (CONSUMIDOR FINAL, MONOTRIUTISTA, RESPONSABLE INSCRIPTO)
    while (condicionFiscal !== "monotributista" && condicionFiscal !== "responsableinscripto" && condicionFiscal !== "consumidorfinal") {
        alert("Por favor, ingrese una condición fiscal valida (Monotributista, Responsable Inscripto, Consumidor Final).");
        condicionFiscal = prompt("¿Cual es su condición fiscal? (Ejemplo: Responsable Inscripto, Monotributista, Consumidor Final)").toLowerCase().replace(/\s+/g, '');
    }








    // CALCULO COSTOS TOTAL ENVIO
    const costoBase = 50; // COSTO DE BASE POR ENVIO
    const costoPorKg = 10; // COSTO EXTRA POR CADA KILO
    const costoTotalEnvio = costoBase + costoEnvio + (costoPorKg * pesoProducto) + costoProvincia; // COSTP TOTAL ENVIO



    // CALCULO IMPUESTOS
    let impuesto = 0;
    if (condicionFiscal === "consumidorfinal") {
        impuesto = 0.21;  // 21% de IMPUESTOS PARA CONSUMIDOR FINAL
    } else if (condicionFiscal === "monotributista") {
        impuesto = 0.15;  // 15% de IMPUESTOS MONOTRIBUTISTA
    } else if (condicionFiscal === "responsableinscripto") {
        impuesto = 0.10;  // 10% de IMPUESTOS RESPONSABLE INSCRIPTO
    }
    const totalConImpuesto = costoTotalEnvio + (costoTotalEnvio * impuesto); // COSTO TOTAL (ENVIO + IMPUESTOS)










    // PRESUPUESTO FINAL
    alert(`
        Resumen de su envio:
        - Lugar de compra: ${lugarCompra.charAt(0).toUpperCase() + lugarCompra.slice(1)} (Costo: USD$${costoEnvio})
        - Destino de entrega: ${destinoEntrega.charAt(0).toUpperCase() + destinoEntrega.slice(1)} (Costo: USD$${costoProvincia})
        - Valor del producto: $${valorProducto.toFixed(2)} USD
        - Peso del producto: ${pesoProducto.toFixed(2)} kg
        - Condicion fiscal: ${condicionFiscal.charAt(0).toUpperCase() + condicionFiscal.slice(1)}
        - Costo de envio total: $${costoTotalEnvio.toFixed(2)} USD
        - Impuesto aplicado: $${(costoTotalEnvio * impuesto).toFixed(2)} USD

        Precio total (producto + envio + impuestos): $${(valorProducto + totalConImpuesto).toFixed(2)} USD

        ¡Envianos un WhatsApp asi avanzamos con el envio :)!
    `);
}

// LLLAMADO FUNCION INICIAL
calcularEnvio();
