package dbService;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class PilotService {
	
	@SuppressWarnings("unchecked")
	public static JSONArray getRequests(int caseId) {
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement ps = DatabaseConnection.con.prepareStatement("select * from request where case_id = ?");
			ps.setInt(1, caseId);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				JSONObject json = new JSONObject();
				int requestId = rs.getInt("request_id");
				json.put("requestId", requestId);
				json.put("requestType", rs.getString("request_type"));
				json.put("url", rs.getString("url"));
				json.put("param", getParams(caseId, requestId));
				jsonArray.add(json);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return jsonArray;
	}
	
	@SuppressWarnings("unchecked")
	public static JSONArray getParams(int caseId, int requestId) {
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement ps = DatabaseConnection.con.prepareStatement("select * from param where case_id = ? and request_id = ?");
			ps.setInt(1, caseId);
			ps.setInt(2, requestId);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				JSONObject json = new JSONObject();
				json.put("key", rs.getString("request_key"));
				json.put("value", rs.getString("request_value"));
				jsonArray.add(json);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return jsonArray;
	}
	
	
	@SuppressWarnings("unchecked")
	public static JSONObject url(String url1, String methodType, Set<Entry<String, String>> entrySet) {
		String result="";
		JSONObject json = new JSONObject();
		try {
			if(url1.endsWith("&")) {
				url1.substring(0, url1.length()-1);
			}
//			System.out.println("url : "+url1);
			if(methodType.equals("POST")) {
				url1 = url1.split("\\?")[0];
			}
//			System.out.println(url1);
			
			
			
			URL url = new URL(url1);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(methodType);
			if(methodType.equals("POST")) {
				conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
				String urlParameters = "";
				for(Entry e: entrySet) {
					urlParameters += e.getKey() + "=";
					urlParameters += e.getValue();
					urlParameters += "&";
				}
				
				if(urlParameters.endsWith("&")) {
					urlParameters.substring(0, urlParameters.length()-1);
				}
				byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8);
		        conn.setRequestProperty("content-Length", String.valueOf(postData.length));
				conn.setDoOutput(true);
				try (DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
		            wr.write(urlParameters.getBytes());
		        }
//		        
		        
			}
			
			conn.connect();
			
			int statusCode = conn.getResponseCode();
			json.put("statusCode", statusCode);
			System.out.println(statusCode);
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
				sb.append("\n");
			}
			reader.close();
        

			result = sb.toString();
			System.out.println(result);
			
			json.put("result", result);
			
		}
		catch(Exception e) {
			e.printStackTrace();
			json.put("result", e.getMessage());
		}
		return json;
	}
	
	


}
