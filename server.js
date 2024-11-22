const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const artworksRoutes = require('./routes/artworks')

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/artworks', artworksRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))