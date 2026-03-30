import { Link } from 'react-router';

export default function MainLayout() {
    return (
        <main>
            <h1>Shop It</h1>
            <span>Find everything you need at a nice price!</span>
            <Link to="/shop">Shop Now</Link>
        </main>
    );
}