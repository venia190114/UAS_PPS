const path = require("path");
const express = require("express");
const app = express();

// Melayani file statis dari build React
app.use(express.static(path.join(__dirname, "frontend/build")));

// Tangani rute yang tidak dikenal dengan index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
