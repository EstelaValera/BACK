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





// const API_URL = 'https://api.artic.edu/api/v1/artworks';

// //obtener todas las obras 
// const getArtworks = async (req, res) => {
//     try {
//         const { data } = await axios.get(API_URL, {
//             params: { page: 1, limit: 10 },
//         });
//         console.log(data)
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// //filtrar por título 
// const getArtworkByTitle = async (req, res) => {
//     try {
//         const title = req.params.title.toLowerCase(); 
//         const { data } = await axios.get(API_URL, {
//             params: { q: title, page: req.query.page || 1, limit: req.query.limit || 10 },
//         });

//         if (data.data.length > 0) {
//             res.json(data.data);  
//         } else {
//             res.status(404).json({ message: `No artworks found for title: ${title}` });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// //filtrar por artista 
// const getArtworkByArtist = async (req, res) => {
//     try {
//         const artist = req.params.artist.toLowerCase(); 
//         const { data } = await axios.get(API_URL, {
//             params: { q: artist, page: req.query.page || 1, limit: req.query.limit || 10 },
//         });

//         const filteredArtworks = data.data.filter((artwork) =>
//             artwork.artist_title && artwork.artist_title.toLowerCase().includes(artist)
//         );

//         if (filteredArtworks.length > 0) {
//             res.json(filteredArtworks);  
//         } else {
//             res.status(404).json({ message: `No artworks found for artist: ${artist}` });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = { getArtworks, getArtworkByTitle, getArtworkByArtist };