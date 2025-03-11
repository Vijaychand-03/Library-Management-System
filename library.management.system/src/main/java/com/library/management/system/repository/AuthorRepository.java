package com.library.management.system.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.library.management.system.model.Author;





public interface AuthorRepository extends JpaRepository<Author, Long> {
	Author findByName(String name);
}