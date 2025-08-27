# 🌏 Digital Photo Frame – Update Photos from Anywhere  

A modern digital photo frame powered by **Node.js** and **Cloudinary** that lets you **change and update photos from anywhere in the world**.  
The frame also displays additional contextual information like current **weather**.  

---

## 🚀 Project Overview  

This project simulates a **connected digital photo frame**:  

- Displays images hosted in a **Cloudinary folder**  
- Updates the displayed photo in real-time, no matter where you are  
- Shows weather information on the frame (temperature & description)  
- Can fetch, list, and delete images programmatically  
- Built using **Node.js, Express, Axios, and Cloudinary API**  

---

## 🛠️ Tech Stack  

- **Node.js & Express** – backend server  
- **Axios** – API requests  
- **CORS** – cross-origin requests  
- **FormData** – sending structured form data  
- **Cloudinary** – image storage and management  
- **dotenv** – environment variables  

---

## ⚙️ Features  

- Fetch and display **photos** from a remote folder  
- Show **weather data** on the frame  
- List all images in the folder via API  
- Delete images remotely  
- Optional direct access route to the frame (`/frame`)  

---

## 🔧 Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2️⃣ Install dependencies  
```bash
npm install
```

### 3️⃣ Configure environment variables  

Create a `.env` file and include:  
```dotenv
PORT=8080
WEATHER_API_URL=<Your OpenWeatherMap API URL>
WEATHER_API_KEY=<Your OpenWeatherMap API Key>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
```

### 4️⃣ Run the server  
```bash
node server.js
```

- Visit `http://localhost:8080/frame` to see the digital photo frame in action  
- Use the `/data`, `/list`, and `/delete` routes to interact with the images  

---

## 📌 API Endpoints  

- **GET `/data`** – Fetch latest photos and weather data  
- **GET `/list`** – List all images in Cloudinary folder  
- **DELETE `/delete?public_id=<id>`** – Delete a specific image  
- **GET `/frame`** – View the digital frame  

---

## 🤝 Contribution  

This is an experimental project for fun and learning. Contributions are welcome!  

- Fork the repo  
- Add new features (e.g., multiple frames, animations)  
- Submit a pull request  

---

## 📧 Contact  

Created with 💡 by **Rakshit Shetty**  
- 🌐 [GitHub](https://github.com/rakshit3549)  
- 💼 [LinkedIn](https://www.linkedin.com/in/rakshit-shetty/)  
