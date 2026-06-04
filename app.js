require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');

const bookRoutes = require('./routes/livroRoutes');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Biblioteca funcionando!'
  });
});

app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});