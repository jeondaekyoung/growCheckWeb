<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" >
	<meta http-equiv="X-UA-Compatible" content="IE=edge" >
    <meta name="apple-mobile-web-app-capable" content="yes" >
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<title>로그인</title>
	
	<style>
        *{padding:0; margin:0; font-size: 13px; font-family: '맑은 고딕', sans-serif}
        body { background-image: url(<%=application.getContextPath()%>/resources/img/banner.jpg?ver=0.2);background transform: translate3d(0px, 0px, 0px);}
        #wrap {width: 100%; height: 100%; overflow:hidden;}
        #container {width: 400px; height:auto; border-radius: 3px; margin: 200px auto 0; border : white solid 2px;}
        #header { border-radius: 3px; padding: 15px 0}
        #header h3 { color: #fff; text-align: center}
        #contents {margin-top: 30px; padding: 20px;}
        #contents .formgroup {margin-bottom: 10px}
        #contents .formgroup label {display: inline-block;}
        #contents .formgroup input {color:white; width: 100%; padding: 15px 0; border-radius: 3px; border: 1px solid #ddd; background: linear-gradient( to right, #00B8E6, #00FFC9 );}
        #contents .loginBtn {color:white; width:100%; padding: 15px 0; margin-top: 30px; background: linear-gradient( to right, #00B8E6, #00FFC9 ); border:none; border-radius: 3px;}
    </style>
</head>

<body>
        <div id="wrap">
            <div id="container">
                <div id="header">
                    <h3>Login</h3>
                </div>
                
                <form action="<%=application.getContextPath()%>/admin/login.do" method="POST">
	                <div id="contents">
	                    <div class="formgroup">
	                        <label>ID</label>
	                        <input type="text" name="id" placeholder=" ID">
	                    </div>
	                    <div class="formgroup">
	                        <label>Password</label>
	                        <input type="password" name="pw" placeholder=" Password">
	                        <font color="red">${loginError}</font>
	                    </div>
	                    <input type="submit" value="Sign In" class="loginBtn">
	                </div>
                </form>
                
            </div>
        </div>
</body>
</html>