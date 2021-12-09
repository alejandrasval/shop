import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase/firebaseConfig";
import { BsSearch } from 'react-icons/bs';
import './styles/App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [list, setList] = useState('');

  //Obtener la data
  useEffect(() => {
    const getDatos = async () => {
      const datos = await getDocs(collection(db, "products"));
      setProducts(datos.docs.map((obj) => obj.data()));
    };

    getDatos();
  }, []);

  //Listas organizadas por precios
  useEffect(() => {
    if (list === "Menor a mayor precio") {
      const newSortedList = [...products].sort((a, b) => a.Precio - b.Precio);
      setProducts(newSortedList);
    } else if (list === "Mayor a menor precio") {
      const newSortedList = [...products].sort((a, b) => b.Precio - a.Precio);
      setProducts(newSortedList);
    }
  }, [list]);

  function handleSelect(e) {
    setList(e.target.value)
  }

  return (
    <div className="App">
      <h1>Fashion shop</h1>
      <div className="header">
      <div className="input">
      <input className="inputSearch" placeholder="Busca tu producto" /><BsSearch className="logoInput"/>
      </div>
      <select className="selector" value={list} onChange={handleSelect}>
        <option>Menor a mayor precio</option>
        <option>Mayor a menor precio</option>
      </select>
      </div>
      {products.map((obj) => (
        <div className="products" key={obj.Id}>
          <img className="imgProducts" src={obj.Img} alt="" />
          <h2 className="titleProducts">{obj.Nombre}</h2>
          <p className="priceProducts">${obj.Precio}</p>
          <button className="buttonProducts">Comprar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
