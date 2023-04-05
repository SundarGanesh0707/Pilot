package service;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import dbService.DatabaseConnection;
import dbService.PilotService;

@WebServlet("/GetCase")
public class GetCase extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		JSONObject json = new JSONObject();
		
		int caseId = Integer.valueOf(request.getParameter("caseId"));
		
		try {
			PreparedStatement ps = DatabaseConnection.con.prepareStatement("select * from cases where case_id = ?");
			ps.setInt(1, caseId);
			ResultSet rs = ps.executeQuery();
			if(rs.next()) {
				json.put("request", PilotService.getRequests(caseId));
			}
			response.getWriter().append(JSONObject.toJSONString(json));
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
