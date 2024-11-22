const express = require('express')
const { getArtworks, getArtworkByTitle, getArtworkByArtist } = require('../controllers/artworkController')

const router = express.Router()

router.get('/', getArtworks) // obtener obras 
router.get('/title/:title', getArtworkByTitle); // obtener obras por título 
router.get('/artist/:artist', getArtworkByArtist); // obtener obras por artista 

module.exports = router;

