const express = require('express')
const { searchArtworks, searchArtworksByType, searchArtworksWithFilters } = require('../controllers/artworkController')

const router = express.Router()

router.get('/search', searchArtworks);
router.get('/search/type', searchArtworksByType);
router.get('/search/advanced', searchArtworksWithFilters);

module.exports = router;

