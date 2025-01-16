import { useState, useEffect } from "react";
import { db } from "./data/db";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";

import { Fragment } from "react";
function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart") // localStorage obtiene el valor del objeto cart del useEffect
    return localStorageCart ? JSON.parse(localStorageCart) : []; //si hay algo en localStorage lo parsea, si no hay nada devuelve un array vacio
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => { //para tener sincronizado el cart con el localStorage
    localStorage.setItem("cart", JSON.stringify(cart)); // toma dos parametros, el nombre del objeto y el objeto que se va a guardar y hace que funcione de inmediato
  }, [cart])

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

    function clearCart() {
      setCart([]);
    }


  return (
    <Fragment>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
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
