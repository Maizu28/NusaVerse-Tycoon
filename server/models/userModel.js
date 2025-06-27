const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const inventoryItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
}, {_id: false});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    profession: { 
      type: String, 
      enum: ['petani', 'streamer', 'hacker', null], 
      default: null 
    },
    energy: { type: Number, default: 100 },
  },
  wallet: {
    on_hand: { type: Number, default: 1000 },
    in_bank: { type: Number, default: 0 },
  },
  inventory: [inventoryItemSchema],
  security: {
    digital_footprint: { type: Number, default: 0 },
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;