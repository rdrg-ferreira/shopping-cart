import { Link, useOutletContext } from 'react-router';

function ProductItem({ name, image, price }) {
    return (
        <div className="product flex flex-column">
            <img src={image} alt={name} className='product-image'/>
            <div className="product-info flex flex-column">
                <span className="product-price">{price} €</span>
                <span className="product-name">{name}</span>
            </div>
        </div>
    );
}

export default function Shop() {
    const context = useOutletContext();

    return (
        <>
            <main>
                <h1>Our products</h1>
                <div id="products-list" className='grid'>
                    {context.products.map(p => {
                        return (
                        <Link key={p.id} to={`/product/${p.id}`}>
                            <ProductItem name={p.title} image={p.image} price={p.price}></ProductItem>
                        </Link>
                    )})}
                </div>
            </main>
        </>
    );
}
