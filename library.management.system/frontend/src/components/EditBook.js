import React, { useState } from "react";
import axios from "axios";

const EditBook = ({ book, fetchBooks, onClose }) => {
  const [title, setTitle] = useState(book.title);
  const [authorName, setAuthorName] = useState(book.author?.name || "");
  const [genreName, setGenreName] = useState(book.genre?.name || "");

  const updateBook = async () => {
    try {
      await axios.put(`/api/books/${book.id}`, {
        title,
        authorName,
        genreName,
      });
      fetchBooks();
      onClose(); // Close modal after update
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-stretch max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-6 text-center">Edit Book</h2>

      <table className="w-full mb-4">
        <tbody>
          <tr>
            <td className="p-2 w-1/3">
              <label className="block mb-2">Book Title</label>
            </td>
            <td className="p-2">
              <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 w-1/3">
              <label className="block mb-2">Author Name</label>
            </td>
            <td className="p-2">
              <input
                type="text"
                placeholder="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 w-1/3">
              <label className="block mb-2">Genre Name</label>
            </td>
            <td className="p-2">
              <input
                type="text"
                placeholder="Genre Name"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={updateBook} className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
