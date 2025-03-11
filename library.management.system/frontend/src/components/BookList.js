import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBook from "./EditBook";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState({ type: null, book: null });

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Disable page scroll when modal is open, and enable it when closed
    if (modalState.type) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  }, [modalState]); // Re-run when modal state changes

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchBooks();
      return;
    }
    try {
      const response = await axios.get(`/api/books/search?query=${searchQuery}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      closeModal();
    }
  };

  const openEditModal = (book) => {
    setModalState({ type: "edit", book });
  };

  const openDeleteModal = (id) => {
    setModalState({ type: "delete", book: { id } });
  };

  const closeModal = () => {
    setModalState({ type: null, book: null });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📚 Book List</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Scrollable Container with explicit height */}
      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <table className="w-full border-collapse border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-1/3 text-center">Title</th>
              <th className="border border-gray-300 p-2 w-1/4 text-center">Author</th>
              <th className="border border-gray-300 p-2 w-1/4 text-center">Genre</th>
              <th className="border border-gray-300 p-2 w-1/6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="text-center">
                <td className="border border-gray-300 p-2">{book.title}</td>
                <td className="border border-gray-300 p-2">{book.author?.name}</td>
                <td className="border border-gray-300 p-2">{book.genre?.name}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(book)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(book.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Edit Popup (Modal) */}
      {modalState.type === "edit" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditBook
              book={modalState.book}
              fetchBooks={fetchBooks}
              onClose={closeModal}
            />
          </div>
        </div>
      )}

      {modalState.type === "delete" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-bold mb-4">Delete Book</h3>
            <p className="mb-4">Are you sure you want to delete this book?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(modalState.book.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
