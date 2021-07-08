import { useState } from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario';
import Router from 'next/router';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const initialState = {
    nombre: '',
    email: '',
    password: ''
}

const CrearCuenta = () => {

    const [ error, setError ] = useState(false);
    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(initialState, validarCrearCuenta, crearCuenta );
    const { nombre, email, password } = valores;

    async function crearCuenta() {
        try {
            await firebase.registrarUsuario(nombre, email, password);
            Router.push('/')
        } catch (error) {
            console.error('Hubo un error al crear el usuario', error);
            setError(error.message);
        }
    }

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Crear Cuenta</h1>
                    <Formulario
                        onSubmit={handleSubmit}
                        noValidate
                    >
                      <Campo>
                          <label htmlForm="nombre">Nombre:</label>
                          <input 
                              type="text" 
                              name="nombre" 
                              id="nombre"
                              placeholder="Tu Nombre"
                              value={nombre}
                              onChange={handleChange}
                              onBlur={handleBlur}
                          />
                      </Campo>
                      {errores.nombre && <Error>{errores.nombre}</Error>}
      
                      <Campo>
                          <label htmlForm="email">Email:</label>
                          <input 
                              type="email" 
                              name="email" 
                              id="email"
                              placeholder="Tu email" 
                              value={email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                          />
                      </Campo>
                      {errores.email && <Error>{errores.email}</Error>}
      
                      <Campo>
                          <label htmlForm="password">Password:</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="Tu password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                      </Campo>
                      {errores.password && <Error>{errores.password}</Error>}

                      {error && <Error>{error}</Error>}

                      <InputSubmit 
                          type="submit"
                          value="Crear Cuenta"
                      />
                    </Formulario>
                </>
            </Layout>
        </div>
    )
}

export default CrearCuenta;