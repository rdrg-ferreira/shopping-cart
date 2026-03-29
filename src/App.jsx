import Header from './components/Header';
import './App.css'
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

function App() {
  const [cartCounter, setCartCounter] = useState(0);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
      fetch("https://fakestoreapi.com/products")
      .then((response) => {
          if (response.status >= 400) {
              throw new Error("server error");
          }
          return response.json();
      })
      .then((response) => setProducts(response))
      .catch((error) => {
        setProductsError(error.message || "Could not load products");
        console.error(error);
      })
      .finally(() => setProductsLoading(false));
  }, []);

  function onAddToCart(data, count) {
    const id = data.id;
    const idx = cart.findIndex(p => p.data.id === id);
    const previousCount = cart[idx] ? cart[idx].count : 0;

    if (idx !== -1) {
      const newCart = cart.slice();
      newCart[idx].count = previousCount + count;
      setCart(newCart);
    } else {
      const newCart = cart.slice();
      newCart.push({ data, count });
      setCart(newCart);
    }
    
    setCartCounter(prev => prev + count);
  }

  function onProductQuantityChange(id, change) {
    const idx = cart.findIndex(p => p.data.id === id);
    const currCount = cart[idx].count;
    const newCount = currCount + change;

    if (newCount === 0) {
      const newCart = cart.slice();
      newCart.splice(idx, 1);
      setCart(newCart);
    } else {
      const newCart = cart.slice();
      newCart[idx].count += change;
      setCart(newCart);
    }

    setCartCounter(prev => prev + change);
  }

  return (
    <>
      <Header cartCounter={cartCounter}></Header>
      <Outlet context={{ onAddToCart, products, productsLoading, productsError, onProductQuantityChange, cart }}></Outlet>
    </>
  )
}

export default App
