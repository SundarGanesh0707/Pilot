package service;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import dbService.PilotService;

@WebServlet("/Run")
public class Run extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			StringBuffer jb = new StringBuffer();
			String line = null;
			
			
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null)
			jb.append(line);
							
			JSONArray jsonArray = null;
			JSONParser jsonParser=new JSONParser();
			jsonArray = (JSONArray) jsonParser.parse(jb.toString());
			
			JSONArray resultJsonArray = new JSONArray();
			
			for(int i=0; i<jsonArray.size(); i++) {
				JSONObject json = (JSONObject) jsonArray.get(i);
				
				String paramString = (String) json.get("params");
				JSONParser parser=new JSONParser();
				JSONObject params = (JSONObject) parser.parse(paramString);
				
				Set<Entry<String, String>> entrySet = params.entrySet();
				long startTime = System.currentTimeMillis();
				JSONObject resultJson = PilotService.url((String)json.get("url"),(String)json.get("methodType"), entrySet);
				startTime = System.currentTimeMillis() - startTime;
				resultJson.put("duration", startTime+" ms");
				resultJsonArray.add(resultJson);
				System.out.println(resultJson);
			}
			
			response.getWriter().append(resultJsonArray.toString());
		 
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
