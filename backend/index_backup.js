const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let coffeeMenu = [
  {
    id: 1,
    name: "Espresso",
    price: 3.0,
    description: "Strong and bold single espresso shot",
    category: "Coffee"
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 4.0,
    description: "Espresso with steamed milk and foam",
    category: "Coffee"
  },
  {
    id: 3,
    name: "Latte",
    price: 3.5,
    description: "Light and refreshing latte",
    category: "Coffee"
  },
  {
    id: 4,
    name: "Cold Brew Coffee",
    price: 2.5,
    description: "Brewed fresh every morning",
    category: "Coffee"
  }
];

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/menu', (req, res) => {
  res.json(coffeeMenu);
});

app.post('/api/menu', (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  coffeeMenu.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = coffeeMenu.findIndex(item => item.id === id);

  if (index !== -1) {
    coffeeMenu[index] = { ...coffeeMenu[index], ...req.body };
    res.json(coffeeMenu[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  coffeeMenu = coffeeMenu.filter(item => item.id !== id);
  res.status(204).end();
});