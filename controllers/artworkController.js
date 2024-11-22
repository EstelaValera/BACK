const axios = require('axios');

const API_URL = 'https://api.artic.edu/api/v1/artworks';

//obtener todas las obras 
const getArtworks = async (req, res) => {
    try {
        const { data } = await axios.get(API_URL, {
            params: { page: 1, limit: 10 },
        });
        console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//filtrar por título 
const getArtworkByTitle = async (req, res) => {
    try {
        const title = req.params.title.toLowerCase(); 
        const { data } = await axios.get(API_URL, {
            params: { q: title, page: req.query.page || 1, limit: req.query.limit || 10 },
        });

        if (data.data.length > 0) {
            res.json(data.data);  
        } else {
            res.status(404).json({ message: `No artworks found for title: ${title}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//filtrar por artista 
const getArtworkByArtist = async (req, res) => {
    try {
        const artist = req.params.artist.toLowerCase(); 
        const { data } = await axios.get(API_URL, {
            params: { q: artist, page: req.query.page || 1, limit: req.query.limit || 10 },
        });

        const filteredArtworks = data.data.filter((artwork) =>
            artwork.artist_title && artwork.artist_title.toLowerCase().includes(artist)
        );

        if (filteredArtworks.length > 0) {
            res.json(filteredArtworks);  
        } else {
            res.status(404).json({ message: `No artworks found for artist: ${artist}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getArtworks, getArtworkByTitle, getArtworkByArtist };