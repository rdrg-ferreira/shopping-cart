import { Link, useOutletContext } from "react-router";

export default function CartPage() {
    const context = useOutletContext();

    return (
        context.cart.length > 0 ? (
            <main>
                <div className="product-list">
                    {context.cart.map(p => {
                        return (
                            <div className="item flex" key={p.data.id}>
                                <div className="product-name">{p.data.title}</div>
                                <div className="product-price">{p.data.price}</div>
                                <div className="product-count-handler">
                                    <button onClick={() => context.onProductQuantityChange(p.data.id, -1)}>-</button>
                                    <div className="product-count" data-testid="count">{p.count}</div>
                                    <button onClick={() => context.onProductQuantityChange(p.data.id, +1)}>+</button>
                                </div>
                            </div>
                        )})}
                </div>
                <button id="checkout">Checkout</button>
            </main>
        ) : (
            <main>
                <h2>Looks like you have nothing on your cart!</h2>
                <span>Go check out our <Link to="/shop">products</Link></span>
            </main>
        )
    );
}