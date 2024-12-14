import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const { order_id } = useParams(); // Mendapatkan order_id dari URL
  const navigate = useNavigate(); // Untuk navigasi ke halaman tertentu
  const [order, setOrder] = useState(null); // State untuk menyimpan detail pesanan
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk menyimpan error
  const [newStatus, setNewStatus] = useState(''); // State untuk status baru

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

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
        // Membuat salinan dari order dan mengupdate status
        const updatedOrder = { ...order, status: newStatus };
        
        // Mengirimkan permintaan PUT ke server
        const response = await axios.put(`http://localhost:5000/api/orderstatus/${order_id}`, updatedOrder);

        // Mengupdate state dengan data terbaru
        setOrder(response.data);
    } catch (err) {
        console.error('Error saat update status:', err);
        setError('Terjadi kesalahan saat memperbarui status pesanan.');
    }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Pesanan tidak ditemukan atau tidak memiliki item.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-4">Detail Pesanan</h1>
      <div className="card border-success">
        <div className="card-header bg-success text-white">
          <h4>ID Pesanan: {order.order_id}</h4>
          <h5>Status Pesanan: {order.status}</h5>
        </div>
        <div className="card-body">
          <p><strong>Nama Customer:</strong> {order.customer_name}</p>
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
          <form onSubmit={handleStatusChange} className="mt-4">
            <div className="form-group">
              <label htmlFor="status">Update Status Pesanan:</label>
              <select
                id="status"
                className="form-control"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Tertunda">Tertunda</option>
                <option value="Sedang Diproses">Sedang Diproses</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Kembali
              </button>
              <button type="submit" className="btn btn-success">
                Perbarui Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
