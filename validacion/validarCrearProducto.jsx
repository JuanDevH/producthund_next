export default function validarCrearProducto(valores) {
    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // Validar Empresa
    if(!valores.empresa) {
        errores.empresa = "Nombre de la Empresa es obligatorio";
    }

    // Validar la url
    if(!valores.url) {
        errores.url = "La URL del producto es obligatoria";
    }else if ( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = "URL no válida";
    }

    // Validar descripcion
    if(!valores.descripcion) {
        errores.descripcion = "Agrega una descipción de tu producto";
    }
    return errores;
}