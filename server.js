require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ImageKit = require('imagekit');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// — ImageKit Setup —
const imagekit = new ImageKit({
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT
});

String.prototype.toCamelCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Route for ImageKit auth parameters
app.get('/auth', (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.json(authParams);
  } catch (err) {
    res.status(500).json({ error: 'Auth failure' });
  }
});

// Route to list all ImageKit files (returns URLs)
app.get('/images', async (req, res) => {
  try {
    const response = await imagekit.listFiles({ fileType:'image',path:'Frame' });

    const files = response
      .map(file => {
        return {
          filePath: process.env.URLENDPOINT + file.filePath,
        };
      });

    res.json(files);

  } catch (err) {
    console.error('ImageKit list error:', err);
    res.status(500).json({ error: 'Unable to fetch images' });
  }
});

// — Weather API Setup —
app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get(process.env.WEATHER_API_URL, {
      params: {
        lat: 52.52,
        lon: 13.40,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });

    res.json({
          temp: response.data.main.temp + ' °C',
          description: response.data.weather[0].description.toCamelCase()
        });

  } catch (error) {
    console.error("Weather API error:", error.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// — Start Server —
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

