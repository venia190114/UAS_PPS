import React from 'react';

function OrdersList({ orders }) {
  const getStatusClassAndIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'tertunda':
        return { className: 'bg-secondary text-white', icon: 'fas fa-clock', text: 'Tertunda' };
      case 'sedang diproses':
        return { className: 'bg-warning text-dark', icon: 'fas fa-hourglass-half', text: 'Sedang Diproses' };
      case 'selesai':
        return { className: 'bg-success text-white', icon: 'fas fa-check-circle', text: 'Selesai' };
      case 'dibatalkan':
        return { className: 'bg-danger text-white', icon: 'fas fa-times-circle', text: 'Dibatalkan' };
      default:
        return { className: 'bg-danger text-white', icon: 'fas fa-question-circle', text: 'Tidak Diketahui' };
    }
  };

  return (
    <div className="row">
      {orders.length > 0 ? (
        orders.map(order => {
          const statusDetails = getStatusClassAndIcon(order.status);
          const items = order.items.split(', ');
          const quantities = order.quantities.split(', ');
          const prices = order.prices.split(', ');
          const images = order.images.split(', ');

          return (
            <div className="col-md-12 mb-4" key={order.order_id}>
              <div className="card shadow-sm">
                <div className={`card-header d-flex justify-content-between align-items-center ${statusDetails.className}`}>
                  <div>
                    <span>ID Pesanan: {order.order_id}</span><br />
                    <strong>Customer: {order.customer_name}</strong>
                  </div>
                  <div>
                    <i className={`${statusDetails.icon} me-2`}></i>
                    <strong>{statusDetails.text}</strong>
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
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img src={images[index]} alt={item} className="rounded border" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                          </td>
                          <td>{item}</td>
                          <td>{quantities[index]}</td>
                          <td>Rp {parseInt(prices[index]).toLocaleString()}</td>
                          <td>Rp {(quantities[index] * prices[index]).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end mt-3">
                    <p><strong>Total Harga:</strong> Rp {parseInt(order.total_price).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="alert alert-warning text-center">Tidak ada pesanan yang tersedia.</div>
      )}
    </div>
  );
}

export default OrdersList;
