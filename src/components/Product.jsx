import { useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router";

function AddToCart({ count, incrementCount, decrementCount, onAddToCart, data }) {
    return (
        <div className="cart-options flex">
            <div className="product-count-handler">
                <button onClick={decrementCount}>-</button>
                <div className="product-count">{count}</div>
                <button onClick={incrementCount}>+</button>
            </div>
            <button className="add-product" onClick={() => onAddToCart(data, count)}>Add to cart</button>
        </div>
    );
}

export default function Product() {
    const [count, setCount] = useState(1);
    const context = useOutletContext();
    const { id } = useParams();

    const product = useMemo(
        () => context.products.find((p) => String(p.id) === String(id)),
        [context.products, id]
    );

    function incrementCount() {
        setCount(prev => prev + 1);
    }

    function decrementCount() {
        if (count > 1) setCount(prev => prev - 1);
    }

    if (context.productsLoading) {
        return <main>Loading product...</main>;
    }

    if (context.productsError) {
        return <main>{context.productsError}</main>;
    }

    if (!product) {
        return <main>Product not found.</main>;
    }

    return (
        <>
            <main className="flex">
                <img src={product.image} alt={product.title.toLowerCase()} className="product-img" />
                <div className="product-info flex flex-column">
                    <h1 className="product-name">{product.title}</h1>
                    <div className="product-description">{product.description}</div>
                    <div className="product-price">{product.price}</div>
                    <AddToCart
                        count={count}
                        incrementCount={incrementCount}
                        decrementCount={decrementCount}
                        onAddToCart={context.onAddToCart}
                        data={{ id: product.id, title: product.title, price: product.price}}
                    ></AddToCart>
                </div>
            </main>
        </>
    );
}