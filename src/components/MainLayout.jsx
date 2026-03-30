import { Link } from 'react-router';
import styles from '../styles/MainLayout.module.css';

export default function MainLayout() {
    return (
        <main className={`flex flex-column item-center ${styles.main}`}>
            <h1 className={styles.title}>Shop It</h1>
            <span>Find everything you need at a nice price!</span>
            <Link to="/shop" className='button-link'>Shop Now</Link>
        </main>
    );
}