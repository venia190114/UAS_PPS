// src/components/OrderCard.js
import React from 'react';
import { FaClock, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

function OrderCard({ order }) {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'tertunda':
        return { className: 'bg-secondary text-white', icon: FaClock };
      case 'sedang diproses':
        return { className: 'bg-warning text-dark', icon: FaHourglassHalf };
      case 'selesai':
        return { className: 'bg-success text-white', icon: FaCheckCircle };
      case 'dibatalkan':
        return { className: 'bg-danger text-white', icon: FaTimesCircle };
      default:
        return { className: 'bg-dark text-white', icon: FaQuestionCircle };
    }
  };

  const { className, icon: StatusIcon } = getStatusStyle(order.status);

  return (
    <div className="col-md-12 mb-3">
      <div className="card shadow-sm">
        <div className={`card-header d-flex justify-content-between align-items-center ${className}`}>
          <div>
            <span>ID Pesanan: {order.order_id}</span><br />
            <strong>Customer: {order.customer_name}</strong>
          </div>
          <div>
            <StatusIcon className="me-2" />
            <strong>{order.status}</strong>
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
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={order.images[index]}
                      alt="Gambar Produk"
                      className="rounded border"
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item}</td>
                  <td>{order.quantities[index]}</td>
                  <td>Rp {order.prices[index].toLocaleString()}</td>
                  <td>Rp {(order.quantities[index] * order.prices[index]).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end mt-3">
            <p><strong>Total Harga:</strong> Rp {order.total_price.toLocaleString()}</p>
            <button className="btn btn-primary btn-sm">Detail Pesanan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
