const express = require("express");
const cors = require("cors");
const ordersRoutes = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", ordersRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
