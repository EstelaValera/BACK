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
    console.log('Request received:', req.query);
    try {
        let params = {
            apikey: API_KEY,
            size: 26,
        };

        if(req.query.query)  params.q = req.query.query; //general
        if(req.query.person) params.person = req.query.person; //artista
        if(req.query.title)  params.title = req.query.title; //titulo
        if(req.query.period) params.period = req.query.period; //periodo

        const response = await axios.get('https://api.harvardartmuseums.org/object', { params });

        if (response.data.records.length > 0) {
            res.json(response.data.records);
        } else {
            res.status(404).json({ message: 'No artworks with descriptions found' });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

