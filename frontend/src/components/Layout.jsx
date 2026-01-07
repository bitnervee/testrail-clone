import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-header">TestClone</div>
                <nav>
                    <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    <Link to="/reports" className="nav-item">
                        Reports
                    </Link>
                    <Link to="/admin" className="nav-item">
                        Administration
                    </Link>
                </nav>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
