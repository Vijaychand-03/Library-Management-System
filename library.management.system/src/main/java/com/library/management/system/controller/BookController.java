package com.library.management.system.controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.management.system.model.Author;
import com.library.management.system.model.Book;
import com.library.management.system.model.Genre;
import com.library.management.system.repository.AuthorRepository;
import com.library.management.system.repository.BookRepository;
import com.library.management.system.repository.GenreRepository;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin("*") // Allows frontend requests
public class BookController {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public BookController(BookRepository bookRepository, AuthorRepository authorRepository, GenreRepository genreRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
    }

    // ✅ Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // ✅ Add a new book
    @PostMapping
    public Book addBook(@RequestBody BookRequest bookRequest) {
        Author author = authorRepository.findByName(bookRequest.getAuthorName());
        if (author == null) {
            author = authorRepository.save(new Author(bookRequest.getAuthorName()));
        }

        Genre genre = genreRepository.findByName(bookRequest.getGenreName());
        if (genre == null) {
            genre = genreRepository.save(new Genre(bookRequest.getGenreName()));
        }

        Book book = new Book(bookRequest.getTitle(), author, genre);
        return bookRepository.save(book);
    }

    // ✅ Update an existing book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody BookRequest bookRequest) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookRequest.getTitle());

            Author author = authorRepository.findByName(bookRequest.getAuthorName());
            if (author == null) {
                author = authorRepository.save(new Author(bookRequest.getAuthorName()));
            }
            book.setAuthor(author);

            Genre genre = genreRepository.findByName(bookRequest.getGenreName());
            if (genre == null) {
                genre = genreRepository.save(new Genre(bookRequest.getGenreName()));
            }
            book.setGenre(genre);

            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok().body("Book deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Book not found....");
        }
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String query) {
        return bookRepository.findByTitleContainingIgnoreCase(query);
    }


    // DTO class for handling book requests
    public static class BookRequest {
        private String title;
        private String authorName;
        private String genreName;

        public String getTitle() { return title; }
        public String getAuthorName() { return authorName; }
        public String getGenreName() { return genreName; }
    }
}
