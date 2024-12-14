import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    if (orders.length === 0) {
        return <div className="alert alert-warning text-center">Tidak ada pesanan yang tersedia.</div>;
    }

    return (
        <div className="row">
            {orders.map((order) => {
                const status = order.status?.trim().toLowerCase() || 'tidak diketahui';
                let statusClass, statusIcon, statusText;

                switch (status) {
                    case 'tertunda':
                        statusClass = 'bg-secondary text-white';
                        statusIcon = 'fas fa-clock';
                        statusText = 'Tertunda';
                        break;
                    case 'sedang diproses':
                        statusClass = 'bg-warning text-dark';
                        statusIcon = 'fas fa-hourglass-half';
                        statusText = 'Sedang Diproses';
                        break;
                    case 'selesai':
                        statusClass = 'bg-success text-white';
                        statusIcon = 'fas fa-check-circle';
                        statusText = 'Selesai';
                        break;
                    case 'dibatalkan':
                        statusClass = 'bg-danger text-white';
                        statusIcon = 'fas fa-times-circle';
                        statusText = 'Dibatalkan';
                        break;
                    default:
                        statusClass = 'bg-danger text-white';
                        statusIcon = 'fas fa-question-circle';
                        statusText = 'Tidak Diketahui';
                }

                //const tableNumber = order.table_number ?? 'Tidak Ditentukan';

                return (
                    <div className="col-md-12 mb-4" key={order.order_id}>
                        <div className="card shadow-sm">
                            <div className={`card-header d-flex justify-content-between align-items-center ${statusClass}`}>
                                <div>
                                    <span>ID Pesanan: {order.order_id}</span><br />
                                    <span><strong>Nomor Meja: {order.table_number}</strong></span><br />
                                    <strong>Customer: {order.customer_name}</strong>
                                </div>
                                <div>
                                    <i className={`${statusIcon} me-2`}></i>
                                    <strong>{statusText}</strong>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Gambar</th>
                                            <th>Nama Menu</th>
                                            <th>Jumlah</th>
                                            <th>Harga Satuan</th>
                                            <th>Total Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items?.split(', ').map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        src={order.images?.split(', ')[index] || ''}
                                                        alt="Gambar Produk"
                                                        className="rounded border"
                                                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td>{item}</td>
                                                <td>{order.quantities?.split(', ')[index] || ''}</td>
                                                <td>Rp {parseInt(order.prices?.split(', ')[index] || 0).toLocaleString()}</td>
                                                <td>Rp {(parseInt(order.quantities?.split(', ')[index] || 0) * parseInt(order.prices?.split(', ')[index] || 0)).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="text-end mt-3">
                                    <p><strong>Total Harga:</strong> Rp {order.total_price.toLocaleString()}</p>
                                    <a
                                        href={`orderdetail/${order.order_id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Detail Pesanan
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Orders;
