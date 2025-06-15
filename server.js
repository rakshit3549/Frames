require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

String.prototype.toCamelCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

app.get('/data', async (req, res) => {
  try {
    // Step 1: Get weather data
    const weatherRes = await axios.get(process.env.WEATHER_API_URL, {
      params: {
        lat: 52.52,
        lon: 13.40,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const temp = weatherRes.data.main.temp + ' °C';
    const description = weatherRes.data.weather[0].description.toCamelCase();

    // Step 2: Get image files from Cloudinary
    const cloudinaryRes = await axios.get(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/by_asset_folder`,
      {
        auth: {
          username: process.env.CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET
        },
        params: {
          asset_folder: 'Frame'
        }
      }
    );

    const files = cloudinaryRes.data.resources;

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No images found in folder' });
    }

    // Step 3: Pick a random image
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Step 4: Send single image and weather data
    const result = {
      filePath: randomFile.secure_url,
      temp,
      description
    };

    res.json(result);
  } catch (err) {
    console.error('Data route error:', err.message);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
