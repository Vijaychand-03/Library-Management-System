import React, { useState } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("/api/books");
    setBooks(response.data);
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <AddBook fetchBooks={fetchBooks} />
      <BookList books={books} fetchBooks={fetchBooks} />
    </div>
  );
};

export default App;