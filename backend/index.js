import 'dotenv/config'; // To read CLERK_API_KEY
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { requireAuth } from '@clerk/express'; 
import MenuItem from './models/MenuItem.js';
import fs from 'fs';
import path from 'path';

console.log(".env exists:", fs.existsSync(path.resolve('.env')));

console.log("CLERK_SECRET_KEY loaded:", !!process.env.CLERK_SECRET_KEY);
console.log("CLERK_PUBLISHABLE_KEY loaded:", !!process.env.CLERK_PUBLISHABLE_KEY);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/coffee_menu', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Public route: Get all menu items
app.get('/api/menu', async (req, res) => {
  console.log("GET", req.url);
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Protected route: Add new item
app.post('/api/menu', requireAuth(), async (req, res) => {
  console.log("POST", req.url);
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
    console.log("Item added:", newItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create item' });
  }
});

// Protected route: Update item
app.put('/api/menu/:id', requireAuth(), async (req, res) => {
  console.log("PUT", req.url);
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(updatedItem);
      console.log("Item updated:", updatedItem);
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item' });
  }
});

app.delete('/api/menu/:id', requireAuth(), async (req, res) => {
  console.log("DELETE", req.url);
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted' });
      console.log("Item deleted:", deletedItem);
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete item' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
