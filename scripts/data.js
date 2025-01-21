// Definición de la clase Categorias que representa una categoría de producto y sus impuestos asociados
class Categorias {
    constructor(nombre, tasaEstadistica, tasaDerechos, iva, impuestosInternos) {
        // Inicialización de los atributos de la clase con los valores proporcionados al crear un objeto
        this.nombre = nombre;  // Nombre de la categoría (ej. Artículo de librería, Bicicleta, etc.)
        this.tasaEstadistica = tasaEstadistica;  // Tasa de estadística aplicada a la categoría
        this.tasaDerechos = tasaDerechos;  // Tasa de derechos de importación o aranceles
        this.iva = iva;  // Tasa de IVA aplicada a la categoría
        this.impuestosInternos = impuestosInternos;  // Impuestos internos específicos para la categoría
    }
}

// Creación de un objeto "categorias" que almacena instancias de la clase Categorias para diferentes productos
const categorias = {
    articulo_libreria: new Categorias("Artículo de librería", 0.01, 0.05, 0.21, 0.00),  // Categoría de artículos de librería
    bicicleta: new Categorias("Bicicleta", 0.02, 0.15, 0.21, 0.03),  // Categoría de bicicletas
    electrodomesticos: new Categorias("Electrodomésticos", 0.03, 0.20, 0.21, 0.04),  // Categoría de electrodomésticos
    celulares: new Categorias("Celulares", 0.03, 0.25, 0.21, 0.05),  // Categoría de celulares
    videojuegos: new Categorias("Videojuegos", 0.02, 0.10, 0.21, 0.00),  // Categoría de videojuegos
    bebidas_alcoholicas: new Categorias("Bebidas Alcohólicas", 0.04, 0.30, 0.21, 0.10),  // Categoría de bebidas alcohólicas
    lentes: new Categorias("Lentes", 0.01, 0.08, 0.21, 0.00),  // Categoría de lentes
    luces_led: new Categorias("Luces LED", 0.01, 0.07, 0.21, 0.00),  // Categoría de luces LED
    otros: new Categorias("Otros", 0.02, 0.12, 0.21, 0.02)  // Categoría de otros productos no clasificados
};
