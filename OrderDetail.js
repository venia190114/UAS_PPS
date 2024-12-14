import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { order_id } = useParams(); // Mendapatkan order_id dari URL
  const [order, setOrder] = useState(null); // State untuk menyimpan detail pesanan
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk menyimpan error

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orderdetail/${order_id}`);
        setOrder(response.data); // Menyimpan data pesanan ke state
      } catch (err) {
        console.error('Error saat fetch data:', err);
        setError('Terjadi kesalahan saat mengambil data pesanan.');
      } finally {
        setLoading(false); // Mengatur loading selesai
      }
    };

    fetchOrderDetail();
  }, [order_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Pesanan tidak ditemukan atau tidak memiliki item.</div>;
  }

  const statusStyles = {
    tertunda: { bgClass: 'bg-secondary text-white', iconClass: 'fas fa-clock', text: 'Tertunda' },
    'sedang diproses': { bgClass: 'bg-warning text-dark', iconClass: 'fas fa-hourglass-half', text: 'Sedang Diproses' },
    selesai: { bgClass: 'bg-success text-white', iconClass: 'fas fa-check-circle', text: 'Selesai' },
    dibatalkan: { bgClass: 'bg-danger text-white', iconClass: 'fas fa-times-circle', text: 'Dibatalkan' },
    default: { bgClass: 'bg-danger text-white', iconClass: 'fas fa-question-circle', text: 'Tidak Diketahui' }
  };

  const { bgClass, iconClass, text } = statusStyles[order.status?.trim().toLowerCase()] || statusStyles.default;

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Status Pesanan</h1>
      <div className="card border-success">
        <div className={`card-header ${bgClass}`}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>ID Pesanan: {order.order_id}</h4>
            <div className="d-flex align-items-center">
              <i className={`${iconClass} fa-lg`}></i>
              <span className="ml-2">{text}</span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p><strong>Nama Customer:</strong> {order.items[0].customer_name}</p>
          <p><strong>Nomor Meja:</strong> {order.items[0].table_number}</p>
          <p><strong>ID Customer:</strong> {order.items[0].customer_id}</p>
          <table className="table table-bordered">
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
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image_url}
                      alt={item.item_name}
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item.item_name}</td>
                  <td>{item.quantity}</td>
                  <td>Rp {item.price.toLocaleString()}</td>
                  <td>Rp {(item.quantity * item.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <h5>Total Harga Keseluruhan:</h5>
            <h5>Rp {order.items.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
