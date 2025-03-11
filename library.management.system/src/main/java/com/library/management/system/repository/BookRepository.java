package com.library.management.system.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.management.system.model.Book;



public interface BookRepository extends JpaRepository<Book, Long> {
	 List<Book> findByTitleContainingIgnoreCase(String title);
}