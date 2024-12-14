const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Endpoint: GET /orders
router.get("/", (req, res) => {
  const query = `
    SELECT sp.order_id, sp.status, 
           GROUP_CONCAT(CONCAT(p.item_name, ' (', p.quantity, ' x Rp', p.price, ')') SEPARATOR ', ') AS items, 
           GROUP_CONCAT(p.image_url SEPARATOR ', ') AS images,
           SUM(p.quantity * p.price) AS total_price, 
           p.customer_name,
           GROUP_CONCAT(p.quantity SEPARATOR ', ') AS quantities,
           GROUP_CONCAT(p.price SEPARATOR ', ') AS prices
    FROM statuspesanan sp
    LEFT JOIN pesanan p ON sp.order_id = p.order_id
    GROUP BY sp.order_id, p.customer_name`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
