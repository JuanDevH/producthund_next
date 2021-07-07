import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    const [ valores, setValores ] = useState(stateInicial)
    const [ errores, setErrores] = useState({})
    const [ submitForm, setSubmitForm ] = useState(false)

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores) {
                fn(); // Fn = Función que se ejecuta en el componente
            }
            setSubmitForm(false);
        }
    }, [errores]);

    // Función que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        // validar es la fn que le pasamos al hook, esta tendrá las reglas de validación y le pasamos los valores que el usuario esta escribiendo
        const erroresValidacion = validar(valores);
        // si hay errores usamos la funcion de errores y le pasamos los errores de validación
        setErrores(erroresValidacion);
        // Pasamos a true submitform xq el useEffect 
        setSubmitForm(true);
    }

    // Cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    }

    
    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}
 
export default useValidacion;