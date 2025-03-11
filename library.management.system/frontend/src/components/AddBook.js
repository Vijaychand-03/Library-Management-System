import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const addBook = async () => {
    // Validate input fields
    if (!title || !authorName || !genreName) {
      setErrorMessage("All fields are required."); // Set error message
      setTimeout(() => setErrorMessage(""), 3000); // Clear error message after 3 seconds
      return; // Prevent adding the book if fields are empty
    }

    try {
      await axios.post("/api/books", { title, authorName, genreName });
      setMessage("Book added successfully!");
      fetchBooks(); // Refresh the book list immediately
      setTitle("");
      setAuthorName("");
      setGenreName("");

      setTimeout(() => setMessage(""), 3000); // Remove message after 3 seconds
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Show error message */}

      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre Name"
        value={genreName}
        onChange={(e) => setGenreName(e.target.value)}
      />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
};

export default AddBook;
