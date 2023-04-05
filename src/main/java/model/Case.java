package model;

import java.util.*;

public class Case {
	
	private Map<Integer, List<Request>> requests = new LinkedHashMap<Integer, List<Request>>();
	
	
	public Map<Integer, List<Request>> getRequests() {
		return requests;
	}
	
	public void setRequests(Map<Integer, List<Request>> requests) {
		this.requests = requests;
	}
	
}
