import React from 'react';
import Sidebar from './Sidebar'; // Pastikan Sidebar.js ada di dalam folder yang sama
import { Chart } from 'chart.js';

class Dashboard extends React.Component {
    componentDidMount() {
        // Data untuk Grafik Penjualan
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [{
                    label: 'Penjualan',
                    data: [12, 19, 3, 5, 2, 3, 7],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-3">
                        <Sidebar />
                    </div>

                    {/* Konten Utama Dashboard */}
                    <div className="col-9 content">
                        <h1 className="mb-4">Dashboard</h1>

                        <div className="row">
                            {/* Card 1 */}
                            <div className="col-md-4">
                                <div className="card text-white bg-primary mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Pesanan</h5>
                                        <p className="card-text fs-4">123</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="col-md-4">
                                <div className="card text-white bg-success mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Pendapatan Hari Ini</h5>
                                        <p className="card-text fs-4">Rp 1.500.000</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="col-md-4">
                                <div className="card text-white bg-warning mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Pesanan Tertunda</h5>
                                        <p className="card-text fs-4">5</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Grafik atau Statistik */}
                            <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-header bg-dark text-white">
                                        Statistik Penjualan
                                    </div>
                                    <div className="card-body">
                                        <canvas id="salesChart" style={{ width: '100%', height: '400px' }}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;

