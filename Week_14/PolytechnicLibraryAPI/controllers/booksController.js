const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const books = await Book.getAllBooks();
   
    res.json(books);
  } 
  
  catch (error) {
    return res.status(500).send("Error retrieving books");
  }
};

const updateBookAvailability = async (req, res) => {
    const bookId = parseInt(req.params.bookId);

    const newBookAvailability = req.body.newAvailability;

    console.log(req.body);

    try {
      const updatedBook = await Book.updateBookAvailability(bookId, newBookAvailability);
      if (!updatedBook) {
        return res.status(404).send("Book not found.");
      }
      res.json(updatedBook);
    } 
    
    catch (error) {
      console.error(error);
      res.status(500).send("Error updating book");
    }
};

const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
      const book = await Book.getBookById(bookId);

      if (!book) {
        return res.status(404).send("Book not found");
      }
      res.json(book);
    } 
    
    catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book");
    }
};

module.exports ={
    getAllBooks,
    updateBookAvailability,
    getBookById
}