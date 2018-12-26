package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.Girl;


public interface GirlRepository extends JpaRepository<Girl, Integer> {
	
//	public Girl save(Girl girl);

	public List<Girl> findByAge(Integer age);
}
