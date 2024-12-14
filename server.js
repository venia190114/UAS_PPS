const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project',
});

// Route untuk mengambil detail pesanan berdasarkan order_id
app.get('/api/orderdetail/:order_id', (req, res) => {
    const { order_id } = req.params;
    const query = `
        SELECT 
            sp.order_id, 
            sp.status, 
            p.customer_name,
            p.table_number,
            p.customer_id,  
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

        const status = results[0].status.trim().toLowerCase() || 'tidak diketahui';
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

        const orderDetail = {
            order_id,
            status: statusText,
            items: results.map(row => ({
                item_name: row.item_name,
                quantity: row.quantity,
                price: row.price,
                image_url: row.image_url,
                customer_name: row.customer_name,
                table_number: row.table_number,
                customer_id: row.customer_id,
            }))
        };

        res.json(orderDetail);
    });
});

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
