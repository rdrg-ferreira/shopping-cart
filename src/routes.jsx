import App from './App.jsx'
import Shop from './components/Shop.jsx';
import CartPage from './components/CartPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Product from './components/Product.jsx';
import MainLayout from './components/MainLayout.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainLayout /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <CartPage /> },
      { path: "product/:id", element: <Product /> },
    ],
  }
];

export default routes;