const express = require('express')
const { getArtworks, getArtworkByCategory, saveArtwork } = require('../controllers/artworkController')

const router = express.Router()

router.get('/', getArtworks) // obtener obras 
router.get('/category/:category', getArtworkByCategory) // obtener obras por cateoría 
router.post('/save', saveArtwork) //guardar obra en la base de datos

module.exports = router;

