<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/ress.min.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/wide-gs-fluid.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/appcss/style.css">
<title>Login</title>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
</head>
<body class="bg-gradient">
<div>
<h1 class="align-center logo col-10 prefix-1 suffix-1"><img src="<%=application.getContextPath()%>/resources/res/appimg/login_logo.png" alt="phyctogram"></h1>

<div class="wrap login-wrap">
	<form action="">
	<div class=" col-10 prefix-1 suffix-1">
		<input type="text" name="id" placeholder="이메일 주소">
	</div>
	<div class=" col-10 prefix-1 suffix-1">
		<input type="password" name="password"  placeholder="비밀번호">
	</div>
	<div class=" col-10 prefix-1 suffix-1">
		<input type="submit" value="로그인">
	</div>
	</form>
	<div class="align-center txt-white">
		<a href="" class="txt-white fz-80">비밀번호 찾기</a> | <a href="" class="txt-white fz-80">회원가입</a>
	</div>
	
</div>

<p class="txt-white align-center copy">COPYRIGHT ⓒ 2017 Knowledge-Seek Co., Ltd. All Rights Reserved</p>
</div>
</body>
</html>