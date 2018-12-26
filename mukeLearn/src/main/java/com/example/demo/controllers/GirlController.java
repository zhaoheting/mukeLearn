package com.example.demo.controllers;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.dto.Girl;
import com.example.demo.dto.Result;
import com.example.demo.dto.ResultUtil;
import com.example.demo.repositories.GirlRepository;
import com.example.demo.services.GirlService;

@RestController
public class GirlController {

//	@Autowired
//	private GirlProperties girlProperties;

	private final static Logger logger = LoggerFactory.getLogger(GirlController.class);

	@Autowired
	private GirlRepository girlRepository;

	@Autowired
	private GirlService girlService;

	@RequestMapping("/helloWorld")
	public String helloWorld() {
		return "helloworld";
	}

	@RequestMapping(value="/girlListP",method=RequestMethod.POST)
	public List<Girl> girlListP() {
		logger.info("doing method");
		return girlRepository.findAll();
	}

	@RequestMapping(value = "/girlListG", method = RequestMethod.GET)
	public List<Girl> girlListG() {
		return girlRepository.findAll();
	}

	
	
	
	
	
	
	@RequestMapping("addGirl")
	public Result<Girl> addGirl(@Valid Girl girl, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return null;
//			return ResultUtil.failed(bindingResult.getFieldError().getDefaultMessage());
			
		}
		
		return ResultUtil.success(girlService.insertGirl(girl));
	}
	
	
	
	

	@RequestMapping(value = "/findGirlById/{id}", method = RequestMethod.GET)
	public Girl findGirlById(@PathVariable Integer id) throws Exception {
		return girlService.getGirl(id);
	}

	@RequestMapping("/deleteGirlById/{id}")
	public void deleteGirlById(@PathVariable("id") Integer id) {
		girlRepository.deleteById(id);
	}

	// can't be used without defining personal method
	@RequestMapping("/girlListByAge/{age}")
	public List<Girl> girlListByAge(@PathVariable("age") Integer age) {
		return girlRepository.findByAge(age);
	}


//	
//	@RequestMapping("/updateGirl")
//	public Girl updateGirl(@RequestParam("girl") Girl girl) {
//		return girlRepository.save(girl);
//	}

//	@RequestMapping("/deleteGirl")
//	public void deleteGirl(@RequestParam("girl") Girl girl) {
//		girlRepository.delete(girl);
//	}
}
