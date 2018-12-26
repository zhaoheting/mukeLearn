package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.Girl;
import com.example.demo.enums.ResultEnum;
import com.example.demo.repositories.GirlRepository;

import exception.GirlException;

@Service
public class GirlService implements IGirlService{

	@Autowired
	private GirlRepository girlRepository;

	public Girl insertGirl(Girl girl) {
		return girlRepository.save(girl);
	}

	public Girl getGirl(Integer id) throws Exception {
		Girl girl = girlRepository.getOne(id);
		Integer age = girl.getAge();
		if( age >= 6 && age < 13) {
			throw new GirlException(ResultEnum.PRIMARY_SCHOOL);
		}
		else if(age >= 13 && age < 18) {
			throw new GirlException(ResultEnum.MIDDLE_SCHOOL);

		}
		return girl;
	}
}