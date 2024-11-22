const express = require('express')
const { searchArtworks, searchArtworksByType, searchArtworksWithFilters } = require('../controllers/artworkController')

const router = express.Router()

router.get('/search', searchArtworks);
router.get('/search/type', searchArtworksByType);
router.get('/search/advanced', searchArtworksWithFilters);

// router.get('/', getArtworks) // obtener obras 
// router.get('/title/:title', getArtworkByTitle); // obtener obras por título 
// router.get('/artist/:artist', getArtworkByArtist); // obtener obras por artista 

module.exports = router;

