import { Link, useOutletContext } from 'react-router';

export default function Shop() {
    const context = useOutletContext();

    return (
        <>
            <main>
                <h1>Our products</h1>
                <div id="products-list" className='grid'>
                    {context.products.map(p => {
                        return <Link key={p.id} to={`/product/${p.id}`}>{p.title}</Link>
                    })}
                </div>
            </main>
        </>
    );
}
