const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://oak:code98932@cluster0.qgdsza7.mongodb.net/food_fact?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const makananSchema = new mongoose.Schema({
  nama_makanan: String,
  kalori: Number,
  lemak: Number,
  gula: Number,
  protein: Number,
  serat: Number,
  kategori: String
});

const Makanan = mongoose.model('Makanan', makananSchema, 'review'); // gunakan collection 'review'

app.get('/api/reviews', async (req, res) => {
  try {
    const data = await Makanan.find().limit(20);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
