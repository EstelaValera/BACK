require('dotenv').config();  
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.HARVARD_API_KEY;  

app.use(cors());
app.use(express.json());


app.get('/api/artworks/search', async (req, res) => {
    console.log('1');

    try {
        const query = req.query.query; 
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const response = await axios.get('https://api.harvardartmuseums.org/object', {

            params: {
                apikey: API_KEY,
                q: query, 
                size: 10   
            }
        });

        if (response.data.records.length > 0) {
            res.json(response.data.records);
        } else {
            res.status(404).json({ message: 'No artworks found' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

