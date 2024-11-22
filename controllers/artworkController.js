const axios = require('axios');
const Artwork = require('../models/Artwork')

const API_URL = 'https://api.artic.edu/api/v1/artworks';

const getArtworks = async (req, res) => {
    try {
        const { data } = await axios.get(API_URL, {
            params: { page: req.query.page || 1, limit: req.query.limit || 10 },
        });
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getArtworkByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const artworks = await Artwork.find ({ category })
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const saveArtwork = async (req, res) => {
    try {
        const artwork = new Artwork(req.body)
        const saveArtwork = await artwork.save()
        res.status(201).son(saveArtwork)
    } catch (error) {
        res.status(500).son({ error: error.message })
    }
}

module.exports = { getArtworks, getArtworkByCategory, saveArtwork };