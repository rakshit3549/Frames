require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

String.prototype.toCamelCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

app.get('/', async (req, res) => {
  res.json('😎');
});

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

    // Step 3: Send image URLs and weather data
    const result = {
      filePath: files.map(file => file.secure_url),
      temp,
      description
    };

    res.json(result);
  } catch (err) {
    console.error('Data route error:', err.message);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
});

app.get('/list', async (req, res) => {
  try {
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

    const images = cloudinaryRes.data.resources.map(file => ({
      public_id: file.public_id,
      created_at: file.created_at,
      secure_url: file.secure_url
    }));

    res.json(images);
  } catch (err) {
    console.error('List route error:', err.message);
    res.status(500).json({ error: 'Failed to fetch image list' });
  }
});

app.delete('/delete', async (req, res) => {
  try {
    const { public_id } = req.query;

    if (!public_id) {
      return res.status(400).json({ error: 'public_id is required' });
    }

    const form = new FormData();
    form.append('public_ids[]', public_id); // can append more if deleting multiple

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const response = await axios.delete(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/`,
      {
        auth: {
          username: apiKey,
          password: apiSecret
        },
        data: form,
        headers: form.getHeaders()
      }
    );

    res.json({ message: 'Image deleted successfully', result: response.data });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Optional direct route
app.get('/frame', (req, res) => {
  res.sendFile(__dirname + '/public/index_frame.html');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
