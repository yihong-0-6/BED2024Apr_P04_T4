const booksController = require("../controllers/booksController.js");
const Book = require("../models/book.js");

// Mock the Book model
jest.mock("../models/book");

describe("booksController.updateBookAvailability", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the book availability and return the updated book", async () => {
    const bookId = 1;
    const newAvailability = "N";
    const updatedBook = {
      id: bookId,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      availability: newAvailability
    };

    // Mock the Book.updateBookAvailability function to return the updated book
    Book.updateBookAvailability.mockResolvedValue(updatedBook);

    const req = {
      params: { bookId: bookId.toString() },
      body: { newAvailability: newAvailability }
    };
    
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    // Mock console.log to check if it is called once
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementationOnce(() => {});

    await booksController.updateBookAvailability(req, res);

    // Check if updateBookAvailability was called with correct arguments
    expect(Book.updateBookAvailability).toHaveBeenCalledWith(bookId, newAvailability);
    
    // Check if res.json was called with the updated book
    expect(res.json).toHaveBeenCalledWith(updatedBook);

    // Ensure console.log is called only once
    expect(consoleLogMock).toHaveBeenCalledTimes(1);

    // Restore console.log
    consoleLogMock.mockRestore();
  });
});

describe("booksController.getAllBooks", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it("should fetch all books and return a JSON response", async () => {
    const mockBooks = [
      { id: 1, title: "The Lord of the Rings", author: 'J.R.R. Tolkien', availability: 'Y' },
      { id: 2, title: "The Hitchhiker's Guide to the Galaxy", author: 'Douglas Adams', availability: 'Y' }
    ];

    // Mock the Book.getAllBooks function to return the mock data
    Book.getAllBooks.mockResolvedValue(mockBooks);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzIxNDczOTk4LCJleHAiOjE3MjE0Nzc1OTh9.A6UJs2HeLm4_8wGHLczIpQDgnhABcfnUWY1JNRfVWaY";
    const req = {
      headers: { authorization: `Bearer ${token}` },
      user: { role: "user" }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await booksController.getAllBooks(req, res);

    // Check if getAllBooks was called
    expect(Book.getAllBooks).toHaveBeenCalledTimes(1);
    // Check the response body
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it("should handle errors and return a 500 status with error message", async () => {
    const errorMessage = "Database error";
    Book.getAllBooks.mockRejectedValue(new Error(errorMessage)); // Simulate an error

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock console.error to prevent the error from being logged to the console
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    await booksController.getAllBooks(req, res);

    // Restore console.error after the test
    consoleErrorMock.mockRestore();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error retrieving books");
  });
});

