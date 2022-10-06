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
        String sql = "select * from orl_jornada";
        PreparedStatement ps = conn.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        
        String registros = "[";
        
        while(rs.next()){
            
            if(!registros.equals("[")) registros += ",";
            
            registros += rs.getString("datos") != null ? rs.getString("datos"): "{}";
        }
        
        registros += "]";
        
        ps.close();
        rs.close();
        
        out.println("{\"status\" : \"ok\", \"registros\" : "+ registros +"}");
        
    }catch(Exception e){
        
        out.println("{ \"status\" : \""+ e.getMessage() +"\"}");
    } finally {
        
        if(conn != null && !conn.isClosed()){
            conn.close();
        }
    }
%>