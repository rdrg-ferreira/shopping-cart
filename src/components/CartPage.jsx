import { Link, useOutletContext } from "react-router";
import styles from '../styles/CartPage.module.css';

export default function CartPage() {
    const context = useOutletContext();

    const productTotalPrice = (p) => {
        const price = p.data.price;
        const floatPrice = parseFloat(price.split(",").join("."));
        const floatTotalPrice = floatPrice * parseInt(p.count);
        return floatTotalPrice;
    }

    const totalPrice = () => {
        let totalPrice = 0;
        context.cart.forEach(p => {
            totalPrice += productTotalPrice(p);
        });
        
        return totalPrice;
    }

    return (
        context.cart.length > 0 ? (
            <main className={`flex ${styles.cartPage} item-center`}>
                <div className={`${styles.productList} flex flex-column`}>
                    {context.cart.map(p => {
                        
                        
                        return (
                            <div className={`${styles.item} flex space-between`} key={p.data.id}>
                                <div className="flex flex-column">
                                    <div className={styles.productName}>{p.data.title}</div>
                                    <div className="flex" style={{"gap": "4px", }}>
                                        <div className="product-price">{p.data.price} € each</div>
                                        <div className="product-total-price">{`(Subtotal: ${productTotalPrice(p).toFixed(2).split(".").join(",")} €)`}</div>
                                    </div>
                                </div>
                                <div className={`${styles.productCountHandler} flex align-center`}>
                                    <button onClick={() => context.onProductQuantityChange(p.data.id, -1)}>-</button>
                                    <div className={styles.productCount} data-testid="count">{p.count}</div>
                                    <button onClick={() => context.onProductQuantityChange(p.data.id, +1)}>+</button>
                                </div>
                            </div>
                    )})}
                </div>
                <div className={`${styles.priceDetails} flex flex-column`}>
                    <span><strong>Total:</strong> {totalPrice().toFixed(2).split(".").join(",")} €</span>
                    <button className="button-link">Checkout</button>
                </div>
            </main>
        ) : (
            <main className={styles.empty}>
                <h2>Looks like you have nothing on your cart!</h2>
                <span>
                    Go check out our <Link to="/shop" className={styles.productsLink}>products</Link></span>
            </main>
        )
    );
}