import React, { useState, useEffect } from 'react';
import './App.css';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  isAvailable: boolean;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const API_URL = 'http://localhost:5262/api/books';

  // Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  // Add or Update book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookData = {
      title,
      author,
      isbn,
      publishedYear: parseInt(publishedYear),
      isAvailable
    };

    try {
      if (isEditing && currentBook) {
        // Update
        const response = await fetch(`${API_URL}/${currentBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...bookData, id: currentBook.id })
        });
        
        if (response.ok) {
          fetchBooks();
          resetForm();
        }
      } else {
        // Create
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData)
        });
        
        if (response.ok) {
          fetchBooks();
          resetForm();
        }
      }
    } catch (err) {
      setError('Failed to save book');
    }
  };

  // Delete book
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchBooks();
        }
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  // Edit book
  const handleEdit = (book: Book) => {
    setIsEditing(true);
    setCurrentBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setPublishedYear(book.publishedYear.toString());
    setIsAvailable(book.isAvailable);
  };

  // Reset form
  const resetForm = () => {
    setIsEditing(false);
    setCurrentBook(null);
    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublishedYear('');
    setIsAvailable(true);
  };

  if (loading) return <div className="App">Loading...</div>;

  return (
    <div className="App">
      <h1>Library Management System</h1>
      
      {error && <div className="error">{error}</div>}

      {/* Form */}
      <div className="form-container">
        <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
            Available
          </label>
          
          <div className="form-buttons">
            <button type="submit">{isEditing ? 'Update' : 'Add'} Book</button>
            {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Book List */}
      <div className="books-container">
        <h2>Books ({books.length})</h2>
        {books.length === 0 ? (
          <p>No books found. Add your first book above!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publishedYear}</td>
                  <td>
                    <span className={book.isAvailable ? 'available' : 'unavailable'}>
                      {book.isAvailable ? 'Available' : 'Checked Out'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(book)}>Edit</button>
                    <button onClick={() => handleDelete(book.id)} className="delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
