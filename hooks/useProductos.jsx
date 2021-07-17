import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useProductos = orden => {
    const [ productos, setProductos ] = useState([]);
    const { firebase } = useContext(FirebaseContext);
  
    useEffect(() => {
      const getProductos = () => {
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot)
      }
      getProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return {
        productos
    }
}

export default useProductos;