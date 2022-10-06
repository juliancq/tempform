<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="org.apache.commons.io.IOUtils"%>
<%
    String datos = IOUtils.toString(request.getInputStream() , "UTF-8");
    
    //mysql
    Class.forName("com.mysql.jdbc.Driver").newInstance();
    java.sql.Connection conn;

    String con = "jdbc:mysql://tc.hpc.org.ar:3306/turnosonline";
    String user = "turnos1@hpc.org.";
    String password = "30603015";

    conn = DriverManager.getConnection(con, user, password);
    

    try{
        String sql = "insert into orl_jornada (datos) values (?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, datos);
        ps.execute();
        
        ps.close();
        
        out.println("{ \"status\" : \"ok\" }");
        
    }catch(Exception e){
        
        out.println("{ \"status\" : "+ e.getMessage() +" }");
        System.out.println(e.getMessage());
    } finally {
        
        if(conn != null && !conn.isClosed()){
            conn.close();
        }
    }
%>