import mongoose from 'mongoose';
import MenuItem from './models/MenuItem.js';

const MONGODB_URI = 'mongodb://localhost:27017/coffee_menu';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const dummyMenu = [
  {
    name: 'Vanilla Latte',
    price: 4.25,
    description: 'Espresso, steamed milk, and vanilla syrup',
    category: 'Latte',
    calories: 190
  },
  {
    name: 'Mocha',
    price: 4.75,
    description: 'Chocolate espresso with steamed milk and whipped cream',
    category: 'Mocha',
    calories: 270
  },
  {
    name: 'Chai Latte',
    price: 3.95,
    description: 'Spiced chai tea with milk',
    category: 'Tea',
    calories: 180
  },
  {
    name: 'Flat White',
    price: 3.85,
    description: 'Smooth and creamy espresso-based drink',
    category: 'Espresso',
    calories: 120
  },
  {
    name: 'Iced Caramel Macchiato',
    price: 5.15,
    description: 'Layered espresso with caramel drizzle over iced milk',
    category: 'Iced Coffee',
    calories: 250
  }
];

const seedData = async () => {
  try {
    await MenuItem.deleteMany(); // Clear existing data
    await MenuItem.insertMany(dummyMenu);
    console.log('Dummy data inserted!');
  } catch (err) {
    console.error('Failed to seed data:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
