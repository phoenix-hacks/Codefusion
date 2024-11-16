import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            {/* ... existing nav items ... */}
            <Link to="/about" className="nav-link">About Us</Link>
            {/* ... other nav items ... */}
        </nav>
    );
} 