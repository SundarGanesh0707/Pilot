package model;

import java.util.LinkedHashMap;
import java.util.Map;

public class Request {
	
	private RequestType requestType;
	private String url;
	private Map<String, String> params = new LinkedHashMap<String, String>();
	
	public RequestType getRequestType() {
		return requestType;
	}
	public void setRequestType(RequestType requestType) {
		this.requestType = requestType;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Map<String, String> getParams() {
		return params;
	}
	public void setParams(Map<String, String> params) {
		this.params = params;
	}
	
}


//Map<String, String> body = new LinkedHashMap<String, String>();
