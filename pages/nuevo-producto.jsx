import { useState, useContext } from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import FileUploader from 'react-firebase-file-uploader';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario';
import Router, { useRouter } from 'next/router';

import { FirebaseContext } from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const initialState = {
  nombre: '',
  empresa: '',
  // imagen: '',
  url: '',
  descripcion: ''
}

const NuevoProducto = () => {

  // State de las imagenes
  const [ nombreimagen, setNombreImagen ] = useState('');
  const [ subiendo, setSubiendo ] = useState(false);
  const [ progreso, setProgreso ] = useState(0);
  const [ urlimagen, setUrlImagen ] = useState('');

  const [ error, setError ] = useState(false);
  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(initialState, validarCrearProducto, crearProducto );
  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Hook de routing para redireccionar
  const router = useRouter();

  // Context con las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    // Si el usuario no está autenticado llevar al login
    if(!usuario) {
      return router.push('/login');
    }

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now()
    }

    // Insertarlo en la base de datos
    firebase.db.collection('productos').add(producto);
    return router.push('/');
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleProgress = progreso => setProgreso({ progreso });

  const handleUploadError = error => {
    setSubiendo(error);
    console.log(error);
  };

  const handleUploadSuccess = nombre => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setUrlImagen(url);
      });
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
          >Nuevo Producto</h1>
          <Formulario
              onSubmit={handleSubmit}
              noValidate
          >

            <fieldset>
              <legend>Información General</legend>
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
                  <label htmlForm="empresa">Empresa:</label>
                  <input 
                      type="text" 
                      name="empresa" 
                      id="empresa"
                      placeholder="Nombre de la Empresa o Compañía" 
                      value={empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlForm="imagen">Imagen:</label>
                  <FileUploader 
                    accept="image/*"
                    name="imagen" 
                    id="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
              </Campo>

              <Campo>
                  <label htmlForm="url">Url:</label>
                    <input 
                        type="url" 
                        name="url" 
                        id="url"
                        placeholder="URL de tu producto"
                        value={url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>
              <Campo>
                <label htmlForm="descripcion">Descripción:</label>
                  <textarea 
                    name="descripcion" 
                    id="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit 
                type="submit"
                value="Crear Producto"
            />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default NuevoProducto;