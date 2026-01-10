import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogout = () => {
        // Clear any auth tokens if implemented
        navigate('/login');
    };

    return (
        <div className="layout" style={{ flexDirection: 'column' }}>
            <header style={{
                backgroundColor: 'var(--card-bg)',
                borderBottom: '1px solid var(--border-color)',
                padding: '0 2rem',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: '3rem' }}>
                        <img src="/logo.png" alt="ReportAnalyzer" style={{ height: '32px', marginRight: '0.75rem' }} />
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>ReportAnalyzer</span>
                    </Link>

                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: isActive('/') ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: '500' }}>Dashboard</Link>
                        <Link to="/reports" style={{ textDecoration: 'none', color: isActive('/reports') ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: '500' }}>Reports</Link>
                        <Link to="/runs" style={{ textDecoration: 'none', color: isActive('/runs') ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: '500' }}>Test Runs & Results</Link>
                        <Link to="/admin" style={{ textDecoration: 'none', color: isActive('/admin') ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: '500' }}>Administration</Link>
                    </nav>
                </div>

                <div style={{ position: 'relative' }}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>John Doe</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin</div>
                        </div>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                        }}>
                            JD
                        </div>
                    </div>

                    {showDropdown && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '200px',
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--border-color)',
                            overflow: 'hidden',
                            zIndex: 20
                        }}>
                            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>John Doe</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>john.doe@example.com</div>
                            </div>
                            <button
                                onClick={() => setShowDropdown(false)}
                                style={{
                                    display: 'block', width: '100%', padding: '0.75rem 1rem', textAlign: 'left',
                                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)',
                                    fontSize: '0.875rem', transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                style={{
                                    display: 'block', width: '100%', padding: '0.75rem 1rem', textAlign: 'left',
                                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)',
                                    fontSize: '0.875rem', borderTop: '1px solid var(--border-color)', transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
