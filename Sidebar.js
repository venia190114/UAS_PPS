import React from 'react';
import './sidebar.css'; // Impor file CSS

function Sidebar() {
    return (
        <div className="sidebar">
            <h4 className="sidebar-title">Admin Panel</h4>
            <nav className="nav flex-column">
                <a href="http://localhost:3000/dashboard" className="nav-link">Dashboard</a>
                <a href="menu_makanan.php" className="nav-link">Menu Makanan</a>
                <a href="menu_minuman.php" className="nav-link">Menu Minuman</a>
                <a href="http://localhost:3000/" className="nav-link">Pesanan</a>
                <a href="data_status_pesanan.php" className="nav-link">Data Status Pesanan</a>
                <a href="report_penjualan.php" className="nav-link">Report Penjualan</a>
                <a href="logout.php" className="nav-link">Logout</a>
            </nav>
        </div>
    );
}

export default Sidebar;
