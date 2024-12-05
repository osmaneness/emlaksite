const express = require('express');
const router = express.Router();
const { getAllListings } = require('../Controllers/listingController.js'); // Listing controller'ını import et

// Tüm ilanları getiren route
router.get('/listings', getAllListings); // GET isteği için route


module.exports = router; // Router'ı dışa aktar
