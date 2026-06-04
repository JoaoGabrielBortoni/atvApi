const Book = require('../models/livro');

// Criar livro
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

// Listar livros
exports.getBooks = async (req, res) => {
  try {
    const filters = {};

    if (req.query.author) {
      filters.author = req.query.author;
    }

    if (req.query.genre) {
      filters.genre = req.query.genre;
    }

    const books = await Book.find(filters);

    res.json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Buscar por ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Atualizar livro
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

// Remover livro
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    res.json({
      message: 'Livro removido com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Emprestar livro
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    if (!book.available) {
      return res.status(400).json({
        message: 'Livro já está emprestado'
      });
    }

    book.available = false;

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Devolver livro
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Livro não encontrado'
      });
    }

    book.available = true;

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};