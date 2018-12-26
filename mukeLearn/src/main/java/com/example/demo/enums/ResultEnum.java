package com.example.demo.enums;

public enum ResultEnum {

	UNKNOWN_ERROR(-1,"未知错误"),
	SUCCESS(0,"成功"),
	PRIMARY_SCHOOL(101,"你还在上小学"),
	MIDDLE_SCHOOL(102,"你还在上初中");
	
	
	private Integer code;
	
	private String msg;

	private ResultEnum(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public Integer getCode() {
		return code;
	}

	public String getMsg() {
		return msg;
	}

}
