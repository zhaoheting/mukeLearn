package com.example.demo.handle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.Result;
import com.example.demo.dto.ResultUtil;

import exception.GirlException;

/**
 * 捕获异常
 * @author zhao
 *
 */
@ControllerAdvice
public class Exceptionhandle {

	private static final Logger logger =LoggerFactory.getLogger(Exceptionhandle.class);
	
	@ExceptionHandler(value=Exception.class)
	@ResponseBody
	public Result handler(Exception e) {
		if(e instanceof GirlException) {
			GirlException girlException = (GirlException)e;
			return ResultUtil.failed(girlException.getCode(),girlException.getMessage());
		}
		else {
			logger.error("【系统异常】{}", e);
			return ResultUtil.failed(-1,"未知错误");
		}
	}
}
