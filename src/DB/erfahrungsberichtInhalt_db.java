package src.DB;

import java.io.IOException;
import java.io.PrintWriter;
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
 * Servlet implementation class erfahrungsberichtInhalt_db
 */

@WebServlet("/erfahrungsberichtInhalt_db")
@MultipartConfig
public class erfahrungsberichtInhalt_db extends HttpServlet {

	private static final long serialVersionUID = 1L;
    
	// JDBC driver name and database URL
    final String DB_URL="jdbc:mysql://85.214.40.15:3306/mwi";
	// Database account
    final String USER = "mwi";
    final String PASS = "mwi2014";
    java.sql.Connection conn;
    java.sql.Statement stmt;
    ResultSet rs;

    
   
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public erfahrungsberichtInhalt_db() {
        super();
        System.err.println("FOUND IT");
        // TODO Auto-generated constructor stub
    }

  //**************************************************************************************************************************************
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
			response.setContentType("text/html; charset=UTF-8");
			PrintWriter out = response.getWriter();
			String action = request.getParameter("action");
			String sql = "";
			System.out.println("doPost called: " + request);
			int stern = Integer.parseInt(request.getParameter("stern"));
			int matrikelnummer = Integer.parseInt(request.getParameter("matrikelnummer"));
			int frageID = Integer.parseInt(request.getParameter("frageID"));
			
			if (action.equals("erfahrungsbericht_post") ){
				
				System.out.println("post_dokument == action.");
					//SQL-Statement -> Trage diese Daten in die Tabelle dokumente ein
					sql = "INSERT INTO erfahrungsbericht (matrikelnummer, frageID, frage, antworttext, stern) "
							+ "VALUES ('"	+ matrikelnummer +"','"
											+ frageID +"','" 
											+ request.getParameter("frage") + "', '" 
											+ request.getParameter("antworttext") + "', '"
											+ stern + "')";
			}
		     
			 else if( action.equals("post_stern") ) {
		    	 
					System.out.println("post_stern == action.");
			    		//SQL-Statement -> Trage diese Daten in die Tabelle dokumente ein
						sql = "INSERT INTO erfahrungsberichtStern (matrikelnummer,frageID, "
								+ " stern) "
								+ "VALUES ('"	+ matrikelnummer +"','"
												+ frageID +"','" 
												+ stern
												+ "')";
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
		          System.out.println("Fehler se " + se);
		     }
		     catch(Exception e){
		          //Handle errors for Class.forName
		          e.printStackTrace();
		          System.out.println("Fehler e "+ e);
		     }
		     finally{
		    	 System.out.println("Done doPost");
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
