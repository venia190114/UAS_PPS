// Import dependencies
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project',
});

// Tes koneksi database
db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err.message);
        return;
    }
    console.log('Terhubung ke database.');
});

// Endpoint untuk mendapatkan semua pesanan
app.get('/api/orders', (req, res) => {
    const query = `
        SELECT sp.order_id, sp.status, p.table_number,
               GROUP_CONCAT(CONCAT(p.item_name, ' (', p.quantity, ' x Rp', p.price, ')') SEPARATOR ', ') AS items, 
               GROUP_CONCAT(p.image_url SEPARATOR ', ') AS images,
               SUM(p.quantity * p.price) AS total_price, 
               p.customer_name
        FROM statuspesanan sp
        LEFT JOIN pesanan p ON sp.order_id = p.order_id
        GROUP BY sp.order_id, p.customer_name
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Endpoint untuk mendapatkan detail order
app.get('/api/orderdetail/:order_id', (req, res) => {
    const { order_id } = req.params;
    const query = `
        SELECT 
            sp.order_id, 
            sp.status, 
            p.customer_name,
            p.table_number,
            p.item_name, 
            p.quantity, 
            p.price, 
            p.image_url
        FROM statuspesanan sp
        LEFT JOIN pesanan p ON sp.order_id = p.order_id
        WHERE sp.order_id = ?
    `;

    db.query(query, [order_id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Order tidak ditemukan' });
            return;
        }

        const { status, customer_name } = results[0];
        const items = results.map(row => ({
            item_name: row.item_name,
            quantity: row.quantity,
            price: row.price,
            image_url: row.image_url,
            table_number: row.table_number
        }));

        const orderDetail = {
            order_id,
            status,
            customer_name,
            items,
        };
        res.json(orderDetail);
    });
});

// Endpoint untuk memperbarui status pesanan
app.put('/api/orderstatus/:order_id', (req, res) => {
    const { order_id, status } = req.body;

    // Validasi input
    if (!Array.isArray(order_id) || order_id.length === 0) {
        return res.status(400).send('Daftar ID pesanan tidak valid atau kosong.');
    }

    if (!['Sedang diproses', 'Selesai', 'Dibatalkan'].includes(status)) {
        return res.status(400).send('Status tidak valid.');
    }

    // Buat placeholder untuk ID
    const placeholders = order_id.map(() => '?').join(', ');
    const updateQuery = `
        UPDATE statuspesanan
        SET status = ?
        WHERE order_id IN (${placeholders})
    `;

    // Eksekusi query
    db.query(updateQuery, [status, ...order_id], (err, results) => {
        if (err) {
            console.error('Error saat update status:', err);
            return res.status(500).send('Terjadi kesalahan saat memperbarui status pesanan.');
        }

        res.json({
            message: `${results.affectedRows} pesanan berhasil diperbarui ke status ${status}.`,
        });
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
