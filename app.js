//importing necessary libraries
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

// importando funções locais
const { initializeCanvas } = require('./routes/canvasUtils.js');
const { drawMap } = require('./routes/noiseUtils.js');

// initializing express app and setting the port
const app = express();
const port = process.env.PORT || 3000;

// middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// start the server
app.listen(port, () => {
    console.log("Server is running and listening on port 3000.")
})

// routes
app.get('/', (req, res) => {
    // make index.html the homepage
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// this get requests uses the imported functions to create a png image of the map and returns it as a response
app.get('/noise', (req, res) => {
    const { scale, octaves, persistence, lacunarity, seed, style_num } = req.query;
    const { canvas, ctx, imageData } = initializeCanvas();
    const buffer = drawMap(canvas, ctx, imageData, scale, octaves, persistence, lacunarity, seed, style_num);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
}) 