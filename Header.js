import React from 'react';
import './header.css'; // Impor file CSS

function Header() {
    return (
        <header className="header">
            {/* Bagian Logo dan Tulisan */}
            <div className="logo-section">
                <img src="logo.png" alt="GreenBite Logo" className="logo" />
                <h1 className="title">GreenBite</h1>
            </div>

            {/* Bagian Admin Info */}
            <div className="admin-section">
                <div className="admin-info">
                    <i className="fas fa-user-circle admin-icon"></i>
                    <span className="admin-text">Admin</span>
                </div>
                <div className="settings">
                    <i className="fas fa-cog settings-icon"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;
