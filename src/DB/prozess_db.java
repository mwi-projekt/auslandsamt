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
@WebServlet(description = "connection to DB for the prozess.jsp", urlPatterns = { "/prozess_db" })

public class prozess_db extends HttpServlet {
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
    public prozess_db() {
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
		if ( action.equals("get_prozesses") ){
			sql = "SELECT * FROM prozess";
		}
		if ( action.equals("get_srvStatus") ){
			sql = "SELECT status FROM prozess_srv";
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

		if ( action.equals("post_terms") ){
				//parsing from the date and time ist within the SQL-Statment. For the DATE the
				//form is YYYY-MM-DD. For TIME it is HH:MM:SS
				sql = "INSERT INTO prozess_terms (file, prozess, sortno,DEnd, TEnd, onlineB, postB) VALUES ('" + 
						request.getParameter("file") +"','" + request.getParameter("prozess") + "', " +
						"'" + request.getParameter("sortno") +  "', STR_TO_DATE('"+ request.getParameter("DEnd") +"','%Y-%m-%d')," +
						"STR_TO_DATE('"+request.getParameter("TEnd") +"','%H:%i:%s'),'" + request.getParameter("onlineB") +"','"+ 
						request.getParameter("postB") +"')";
		}
		
		if (action.equals("post_prozess") ){
				sql = "INSERT INTO prozess (name) VALUES ('" + request.getParameter("name") + "')";
		}

		if (action.equals("del_prozess") ) {
			sql = "DELETE prozess, prozess_terms FROM prozess, prozess_terms WHERE"+
					"prozess.id = '" + request.getParameter("id") + "'" +
					"AND prozess_terms.prozess = '" + request.getParameter("id") +"'";
		}

		if (action.equals("start_srv") ) {
			sql = "UPDATE prozess_srv SET do='up' WHERE id='1'";
			System.out.println( request.getParameter("Job Server wird gestartet !") );
		}
		
		if (action.equals("stop_srv") ) {
			sql = "UPDATE prozess_srv SET do='down' WHERE id='1'";
			System.out.println( request.getParameter("Job Server wird gestoppt !") );
		}
		
		if (action.equals("sort_list") ) {
			//array send_data = prozessName
			//array send_terms{sid,DEnd,TEnd,onlineB,postB} je 5 stk. ein Term
			//array send_sort{docID_}
			//
			String proz_id = "";
			sql = "INSERT INTO prozess (name) VALUES ('" + request.getParameter("send_data") + "')";
			proz_id = dbupdate(sql);
			//
			//
			String send_terms = request.getParameter("send_terms");
			String[] part = send_terms.split(";");
			for (int i = 0; i < part.length; i = i+5 ){
				sql = "INSERT INTO prozess_terms (file, prozess, DEnd, TEnd, onlineB, postB) VALUES ('" + 
						part[i] +"','" + proz_id + "', " +
						" STR_TO_DATE('"+ part[i+1] +"','%Y-%m-%d')," +
						"STR_TO_DATE('"+ part[i+2] +"','%H:%i:%s'),'" + part[i+3] +"','"+ 
						part[i+4] +"')";
				dbupdate(sql);
			}
				String send_sort = request.getParameter("send_sort");
				part = send_sort.split(";");
				for (int i = 0; i < part.length; i++ ){
					String[] zw = part[i].split("docID_");
					sql = "UPDATE prozess_terms SET sortno='" + i + "' WHERE prozess='" + 
							proz_id + "' AND file='" + zw[1] + "'";
					dbupdate(sql);
				}		
			
		return;
		}
		//
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
	/**
	 * Routine for the multiple update !!!
	 */
	public String dbupdate(String sql){
		String genID = "";
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
	              genID = "" + generatedKeys.getInt(1);
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
	return genID;
	}
//	
}
