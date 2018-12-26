package com.example.demo.dto;

/**
 * 处理请求成功与失败的两种情况，减少代码冗余
 * @author zhao
 *
 */
public class ResultUtil {

	public static Result success(Object object){
		Result result = new Result();
		result.setCode(1);
		result.setMsg("succeed");
		result.setData(object);
		return result;
	}
	public static Result success() {
		return success(null);
	}
	public static Result failed(String msg){
		Result result = new Result();
		result.setCode(0);
		result.setMsg(msg);
		result.setData(null);
		return result;
	}
	public static Result failed(Integer code ,String msg){
		Result result = new Result();
		result.setCode(code);
		result.setMsg(msg);
		result.setData(null);
		return result;
	}
	
}
