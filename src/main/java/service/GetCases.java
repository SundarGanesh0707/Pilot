package service;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dbService.DatabaseConnection;
import dbService.PilotService;
import model.Case;

@WebServlet("/GetCases")
public class GetCases extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement ps = DatabaseConnection.con.prepareStatement("select * from cases");
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				JSONObject json = new JSONObject();
				int caseId = rs.getInt("case_id");
				json.put("caseId", caseId);
				json.put("caseName", rs.getString("case_name"));
//				json.put("request", PilotService.getRequests(caseId));
				jsonArray.add(json);
			}
			response.getWriter().append(jsonArray.toJSONString());
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
