import { Link } from "react-router";
import shoppingCart from '../assets/shopping_cart.png';

function Cart({ cartCounter }) {
    return (
        <div id="cart">
            <img src={shoppingCart} alt="cart" />
            <div className="cart-counter">{cartCounter}</div>
        </div>
    );
}

export default function Header({ cartCounter }) {
    return (
        <header id='header' className='flex space-between'>
            <Link to="/">
                <h1 className='title'>ShopIt</h1>
            </Link>
            <Link to="shop" className='products-link'>Products</Link>
            <Link to="cart">
                <Cart cartCounter={cartCounter}></Cart>
            </Link>
        </header>
    );
}