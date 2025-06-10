// server.js - Starter Express server for Week 2 assignment


const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// === Middleware: Request Logger ===
const requestLogger = (req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
};

// === Middleware: Fake Authentication ===
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer secrettoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// === Middleware: Validate Product Input ===
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    throw new ValidationError('Invalid product data');
  }
  next();
};

// === Middleware: Async Error Handler Wrapper ===
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// === Custom Error Classes ===
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

// === Global Error Handler ===
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.name, message: err.message });
};

// === Initialize Express App ===
const app = express();
const PORT = process.env.PORT || 3000;

// === Apply Middlewares ===
app.use(bodyParser.json());
app.use(requestLogger);
app.use(auth);

// === In-memory Products ===
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// === Root Route ===
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// === Product Routes (Prefixed with /api/products) ===
const base = '/api/products';

// GET all products with optional category, pagination
app.get(base, asyncHandler((req, res) => {
  let result = [...products];
  const { category, page = 1, limit = 10 } = req.query;
  if (category) result = result.filter(p => p.category === category);
  const start = (page - 1) * limit;
  const end = start + +limit;
  res.json(result.slice(start, end));
}));

// GET a product by ID
app.get(`${base}/:id`, asyncHandler((req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
}));

// POST a new product
app.post(base, validateProduct, asyncHandler((req, res) => {
  const product = { id: uuidv4(), ...req.body };
  products.push(product);
  res.status(201).json(product);
}));

// PUT update product
app.put(`${base}/:id`, validateProduct, asyncHandler((req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError('Product not found');
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
}));

// DELETE a product
app.delete(`${base}/:id`, asyncHandler((req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError('Product not found');
  products.splice(index, 1);
  res.status(204).send();
}));

// GET by name (search)
app.get(`${base}/search/:name`, asyncHandler((req, res) => {
  const name = req.params.name.toLowerCase();
  const result = products.filter(p => p.name.toLowerCase().includes(name));
  res.json(result);
}));

// GET stats: count by category
app.get(`${base}/stats/count-by-category`, asyncHandler((req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
}));

// === Error Handling Middleware ===
app.use(errorHandler);

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
