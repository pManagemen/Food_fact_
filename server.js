const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Koneksi pakai env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Schema
const makananSchema = new mongoose.Schema({
  nama_makanan: String,
  kalori: Number,
  lemak: Number,
  gula: Number,
  protein: Number,
  serat: Number,
  kategori: String
});

const Makanan = mongoose.model('Makanan', makananSchema, 'review');

app.get('/api/reviews', async (req, res) => {
  try {
    const data = await Makanan.find().limit(20);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Gunakan PORT dari Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
