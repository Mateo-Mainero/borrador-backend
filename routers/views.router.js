const express = require('express');
const router = express.Router();

// Datos iniciales (pueden venir de una base de datos en vez de memoria)
let products = [];

// Ruta para la vista home
router.get('/', (req, res) => {
    res.render('home', { products });
});

// Ruta para la vista realTimeProducts
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;
