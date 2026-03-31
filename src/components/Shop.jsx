import { Link, useOutletContext } from 'react-router';
import styles from '../styles/Shop.module.css';

function ProductItem({ id, name, image, price }) {
    return (
        <div className={`flex flex-column ${styles.card}`}>
            <img src={image} alt={name} className={styles.productImage}/>
            <div className={`flex flex-column ${styles.productInfo}`}>
                <span className={styles.productPrice}>{price} €</span>
                <Link to={`/product/${id}`} className={styles.productName}>{name}</Link>
            </div>
        </div>
    );
}

export default function Shop() {
    const context = useOutletContext();

    return (
        context.productsError !== null ? (
            <main className={styles.main}>
                <h1 className={styles.fetchError}>{context.productsError}</h1>
            </main>
        ) : (
            <>
                <main className={styles.main}>
                    <h1>Our products</h1>
                    <div id={styles.productsList} className='grid'>
                        {context.products.map(p => {
                            return <ProductItem key={p.id} id={p.id} name={p.title} image={p.image} price={p.price}></ProductItem>
                        })}
                    </div>
                </main>
            </>
        )
    );
}
