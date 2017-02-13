package scnreader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.*;

/**
 * Servlet implementation class Blogs
 */
public class FeedMe extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FeedMe() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//create URL    
        try {
        	String address = request.getParameter("address");
        	String numItems = request.getParameter("numItems");
        	String completeAddress = address + "&numItems=" +  numItems;
    		URL url = new URL(completeAddress);

    		// Read all the text returned by the server
            BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
            StringBuilder fullResponse = new StringBuilder();
            String str;
            while ((str = in.readLine()) != null) {
                // str is one line of text; readLine() strips the newline character(s)
            	  fullResponse.append(str);            	
            }
            in.close();
            JSONObject jsonObj = org.json.XML.toJSONObject(fullResponse.toString());
            response.getWriter().println( jsonObj.toString() );
        } 
        catch (MalformedURLException e) {
        	response.getWriter().println(e);
        }
        catch (JSONException e){
        	response.getWriter().println(e);        	
        }
	    catch (IOException e) {
        	response.getWriter().println(e);	    	
	    }
       
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
