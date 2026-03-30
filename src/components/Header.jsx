import { Link } from "react-router";
import shoppingCart from '../assets/shopping_cart.png';
import styles from '../styles/Header.module.css';

function Cart({ cartCounter }) {
    return (
        <div id={styles.cart} className="flex align-center">
            <img src={shoppingCart} alt="cart" />
            <div>{cartCounter}</div>
        </div>
    );
}

export default function Header({ cartCounter }) {
    return (
        <header id={styles.header} className='flex align-center'>
            <Link to="/">
                <h1>Shop It</h1>
            </Link>
            <Link to="shop" className={styles.productsLink}>Products</Link>
            <Link to="cart" className={styles.cartLink}>
                <Cart cartCounter={cartCounter}></Cart>
            </Link>
        </header>
    );
}