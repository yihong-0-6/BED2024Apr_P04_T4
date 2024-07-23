const Book = require("../models/book");

// Get all Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving books");
  }
}

// Update book
const updateBookAvailability = async (req, res) => {
  const bookId = parseInt(req.params.id, 10); // Parse as integer with radix 10
  const newAvailability = req.body.availability;

  try {
    const updatedBook = await Book.updateAvailability(bookId, newAvailability);

    if (updatedBook) {
      return res.status(200).json({
        message: "Book availability updated successfully",
        book: updatedBook
      });
    } 
    
    else {
      return res.status(404).send("Book not found");
    }
  } 
  
  catch (error) {
    console.error("Error updating book availability:", error);
    
    return res.status(500).send("Error updating book availability");
  }
};


module.exports = {
  getAllBooks,
  updateBookAvailability
};