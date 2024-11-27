const axios = require('axios');

const API_KEY = process.env.HARVARD_API_KEY; 
const BASE_URL = 'https://api.harvardartmuseums.org';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
});

const searchArtworks = async (req, res) => {
    try {
        const query = req.query.query;  
        const { data } = await axiosInstance.get('/object', {
            params: {
                q: query,    
                size: 10,   
                page: req.query.page || 1  
            }
        });

        if (data.records.length > 0) {
            res.json(data.records); 
        } else {
            res.status(404).json({ message: `No artworks found for query: ${query}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const searchArtworksByType = async (req, res) => {
    try {
        const type = req.query.type || 'painting';  
        const { data } = await axiosInstance.get('/object', {
            params: {
                type: type,  
                size: 10,     
                page: req.query.page || 1
            }
        });

        if (data.records.length > 0) {
            res.json(data.records);  
        } else {
            res.status(404).json({ message: `No ${type} artworks found.` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const searchArtworksWithFilters = async (req, res) => {
    try {
        const { query, artist, title, classification, century } = req.query;
        const { data } = await axiosInstance.get('/object', {
            params: {
                q: query,
                artist: artist,
                title: title,
                classification: classification,
                century: century,
                size: 10,  
                page: req.query.page || 1
            }
        });

        if (data.records.length > 0) {
            res.json(data.records);
        } else {
            res.status(404).json({ message: 'No artworks found matching the criteria.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { searchArtworks, searchArtworksByType,searchArtworksWithFilters };

