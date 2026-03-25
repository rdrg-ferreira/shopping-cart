import { useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router";

function AddToCart({ count, incrementCount, decrementCount, onAddToCart, data }) {
    return (
        <div className="cart-options flex">
            <div className="product-count-handler">
                <button onClick={decrementCount}>-</button>
                <div className="product-count">{count}</div>
                <button onClick={incrementCount}>+</button>
            </div>
            <div className="add-product" onClick={() => onAddToCart(data, count)}>Add to cart</div>
        </div>
    );
}

export default function Product() {
    const [count, setCount] = useState(1);
    const { cartCounter, data, onAddToCart } = useLocation().state;

    function incrementCount() {
        setCount(prev => prev + 1);
    }

    function decrementCount() {
        if (count > 1) setCount(prev => prev - 1);
    }

    return (
        <>
            <Header cartCounter={cartCounter}></Header>
            <main className="flex">
                <img src={data.image} alt={data.title.toLowerCase()} className="product-img" />
                <div className="product-info flex flex-column">
                    <h1 className="product-name">{data.title}</h1>
                    <div className="product-description">{data.description}</div>
                    <div className="product-price">{data.price}</div>
                    <AddToCart
                        count={count}
                        incrementCount={incrementCount}
                        decrementCount={decrementCount}
                        onAddToCart={onAddToCart}
                        data={{ id: data.id, title: data.title, price: data.price}}
                    ></AddToCart>
                </div>
            </main>
        </>
    );
}