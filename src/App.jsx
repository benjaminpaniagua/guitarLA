import { useState, useEffect } from "react";
import { db } from "./data/db";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";

import { Fragment } from "react";
function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) { //existe en el carrito
      if(cart[itemExists].quantity >= MAX_QUANTITY) return
      const updatedCart = [...cart]; //crea una copia del state del carrito para que no se mute, ya que los state son inmutables
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = MIN_QUANTITY;
      setCart([...cart, item]);
    }
  }
    function removeFromCart(id) {
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));//filter obtiene el objeto guitar y lo compara con el id que se le pasa, si es diferente lo mantiene en el carrito y si es igual lo elimina
    }

    function increaseQuantity(id) {
      // Crea una nueva versión del carrito con la cantidad actualizada
      const updatedCart = cart.map(item => {
        // Verifica si el id del item coincide con el id pasado como parámetro
        if (item.id === id && item.quantity < MAX_QUANTITY) {
          // Retorna un nuevo objeto con la cantidad incrementada
          return {
            ...item,
            quantity: item.quantity + MIN_QUANTITY
          };
        }
        // Si no coincide, retorna el item sin cambios
        return item;
      });
      // Actualiza el estado del carrito con el nuevo array
      setCart(updatedCart);
    }

    function decreaseQuantity(id) { 
      const updatedCart = cart.map(item => {
        if (item.id === id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - MIN_QUANTITY
          };
        }
        return item;
      });
      setCart(updatedCart);
    }


  return (
    <Fragment>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
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
