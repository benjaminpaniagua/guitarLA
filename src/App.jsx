import { useState, useEffect } from "react";
import { db } from "./data/db";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";

import { Fragment } from "react";
function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    
    if (itemExists >= 0) { //existe en el carrito
      const updatedCart = [...cart]; //crea una copia del state del carrito para que no se mute, ya que los state son inmutables
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  return (
    <Fragment>
      <Header 
        cart={cart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Coleccion</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
