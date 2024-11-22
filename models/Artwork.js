const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    title: String,
    artist: String,
    category: String,
    date_display: String,
    image_url: String,
});

module.exports = mongoose.model('Artwork', ArtworkSchema)