package com.example.demo.services;

import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.Girl;

public interface IGirlService {

	public Girl insertGirl(Girl girl);
	
	public Girl getGirl(Integer id) throws Exception;
}
