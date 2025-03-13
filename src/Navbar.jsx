import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {

    const [isNavbarShowing, setNavbarShowing] = useState(false);

    const [location] = useLocation();

    // Sync the collapse state with screen size
    useEffect(() => {
        const syncNavbarState = () => {
            setNavbarShowing(window.innerWidth >= 992); // Show if larger than 992px, otherwise don't show
        };

        syncNavbarState(); // Run on mount to set the initial state

        // Listen for window resize events
        window.addEventListener('resize', syncNavbarState);

        // Cleanup the listener on unmount
        return () => window.removeEventListener('resize', syncNavbarState);
    }, []);

    // Toggle the collapse state
    const toggleNavbar = () => {
        setNavbarShowing(!isNavbarShowing);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">E-Shop</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleNavbar}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/cart" className={`nav-link ${location === '/cart' ? 'active' : ''}`}>Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}