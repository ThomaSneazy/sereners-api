require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/check-availability', async (req, res) => {
    try {
        const response = await fetch('https://api2.pickaflat.com/v1/availabilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur du serveur');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
