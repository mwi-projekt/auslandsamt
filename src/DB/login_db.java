package DB;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class prozess_db
 */
@MultipartConfig(maxFileSize = 16177215) //file size up to 16MB
@WebServlet(description = "connection to DB for the prozess.jsp", urlPatterns = { "/login_db" })

public class login_db extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	// JDBC driver name and database URL
    final String DB_URL="jdbc:mysql://85.214.40.15:3306/mwi";
	// Database account
    final String USER = "mwi";
    final String PASS = "mwi2014";
    Connection conn;
    Statement stmt;
    ResultSet rs;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login_db() {
        super();  
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		String sql = "";
		
		if ( action.equals("get_files") ){
			sql = "SELECT id, name, comment FROM prozess_files";
		}

	    try{
	    	// Register JDBC driver
	          Class.forName("com.mysql.jdbc.Driver").newInstance();
	          // Open a connection
	          conn = DriverManager.getConnection(DB_URL,USER,PASS);
	          // Execute SQL query
	          stmt = conn.createStatement();
	          rs = stmt.executeQuery(sql);
	          int spalten = rs.getMetaData().getColumnCount(); 
	          while(rs.next()){	        	  
	        	  for (int k = 1; k <= spalten; k++) {
	                   out.println( rs.getString(k)+ ";" );
	                   System.out.println(rs.getString(k)+ ";" );
	              }
	          }
	     }
	     catch(SQLException se){
	          //Handle errors for JDBC
	          se.printStackTrace();
	          System.out.println("Fehler se");
	     }
	     catch(Exception e){
	          //Handle errors for Class.forName
	          e.printStackTrace();
	          System.out.println("Fehler e");
	     }
	     finally{
	    	 System.out.println("Done doGet");
			 try{
				// Clean-up environment
				rs.close();
				stmt.close();
				conn.close();
			 }
			 catch(Exception ex){
				System.out.println( "Exception : " + ex.getMessage() );
			 }
	     }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		String action = request.getParameter("action");
		String sql = "";
		int uid = 0;
		int rolle = 0;

		if ( action.equals("post_login") ){
				//parsing from the date and time ist within the SQL-Statment. For the DATE the
				//form is YYYY-MM-DD. For TIME it is HH:MM:SS
				sql = "SELECT matrikelnummer FROM student  ('" + 
						request.getParameter("file") +"','" + request.getParameter("prozess") + "', " +
						"'" + request.getParameter("sortno") +  "', STR_TO_DATE('"+ request.getParameter("DEnd") +"','%Y-%m-%d')," +
						"STR_TO_DATE('"+request.getParameter("TEnd") +"','%H:%i:%s'),'" + request.getParameter("onlineB") +"','"+ 
						request.getParameter("postB") +"')";
		} else if (action.equals("post_register") ) {
			if (request.getParameter("rolle").equals("Student")) {
				rolle = 3;
			} else if (request.getParameter("rolle").equals("Auslandsmitarbeiter")) {
				rolle = 2;
			}
			sql = "INSERT INTO user (vorname, nachname, passwort, rolleID) VALUES ('" + request.getParameter("vorname") + "', '" + request.getParameter("nachname") + "', '" + request.getParameter("passwort") + "', '" + rolle + "')";
			try{
		    	// Register JDBC driver
		          Class.forName("com.mysql.jdbc.Driver").newInstance();
		          // Open a connection
		          conn = DriverManager.getConnection(DB_URL,USER,PASS);
		          // Execute SQL query
		          stmt = conn.createStatement();
		          
		          stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);      
		          
		          ResultSet generatedKeys = stmt.getGeneratedKeys();
		          if(generatedKeys.next()){
		              uid = generatedKeys.getInt(1);
		              out.println(generatedKeys.getInt(1));
		          }
		     }
		     catch(SQLException se){
		          //Handle errors for JDBC
		          se.printStackTrace();
		          System.out.println("Fehler se");
		     }
		     catch(Exception e){
		          //Handle errors for Class.forName
		          e.printStackTrace();
		          System.out.println("Fehler e");
		     }
		     finally{
		    	 System.out.println("Done doGet");
				 try{
					// Clean-up environment
					rs.close();
					stmt.close();
					conn.close();
				 }
				 catch(Exception ex){
					System.out.println( "Exception : " + ex.getMessage());
				 }
		     }		
			if (request.getParameter("rolle").equals("Student")) {
				sql = "INSERT INTO student (studiengang, userid, kursname, email) VALUES ('" + request.getParameter("studiengang") + "', '" + uid + "', '" + request.getParameter("kursname") + "', '" + request.getParameter("email") + "')";
			} else if (request.getParameter("rolle").equals("Auslandsmitarbeiter")) {
				sql = "INSERT INTO auslandsmitarbeiter (email, userid, auslandsmitarbeitTel) VALUES ('" + request.getParameter("email") + "', '" + uid + "', '" + request.getParameter("tel") + "')";
			} /*else if (request.getParameter.equals("Unternehmen")) {
				sql = "INSERT INTO unternehmen"
			}*/
				
		}
		
		System.out.println(sql);
		
	    try{
	    	// Register JDBC driver
	          Class.forName("com.mysql.jdbc.Driver").newInstance();
	          // Open a connection
	          conn = DriverManager.getConnection(DB_URL,USER,PASS);
	          // Execute SQL query
	          stmt = conn.createStatement();
	          
	          stmt.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);      
	          
	          ResultSet generatedKeys = stmt.getGeneratedKeys();
	          if(generatedKeys.next()){
	              System.out.println("ID_DB = " + generatedKeys.getInt(1));
	              out.println(generatedKeys.getInt(1));
	          }
	     }
	     catch(SQLException se){
	          //Handle errors for JDBC
	          se.printStackTrace();
	          System.out.println("Fehler se");
	     }
	     catch(Exception e){
	          //Handle errors for Class.forName
	          e.printStackTrace();
	          System.out.println("Fehler e");
	     }
	     finally{
	    	 System.out.println("Done doGet");
			 try{
				// Clean-up environment
				rs.close();
				stmt.close();
				conn.close();
			 }
			 catch(Exception ex){
				System.out.println( "Exception : " + ex.getMessage() );
			 }
	     }	
	}
}



