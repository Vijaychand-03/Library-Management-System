package com.library.management.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.management.system.model.Genre;



public interface GenreRepository extends JpaRepository<Genre, Long> {
	 Genre findByName(String name);
}