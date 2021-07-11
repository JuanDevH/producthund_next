import { useState, useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';
import DetallesProductos from '../components/layout/DetallesProductos';

const Home = () => {

  const [ productos, setProductos ] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }
    getProductos();
  }, []);

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setProductos(productos)
  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map(producto => (
                <DetallesProductos 
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Home;