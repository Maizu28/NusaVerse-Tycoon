const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['material', 'booster', 'consumable'],
  },
  market_price: { // Akan diupdate oleh cron job
    type: Number,
    default: 0,
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

/*
Contoh item yang bisa Anda tambahkan ke database:
- name: "Panen Kripto", type: "material"
- name: "Paket Data", type: "material"
- name: "Fame Points", type: "material"
*/