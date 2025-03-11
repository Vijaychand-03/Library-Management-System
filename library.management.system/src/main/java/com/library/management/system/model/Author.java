package com.library.management.system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;


  
	public Author(String name) {
		super();
		this.name = name;
	}
	public Author() {
		super();
	}
	public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
