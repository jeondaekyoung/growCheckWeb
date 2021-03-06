<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> 
  	<link rel="stylesheet" href="<%=application.getContextPath()%>/resources/res/css/bootstrap.css" type="text/css" />
	<title>Error Page</title>
	
	<style>
		.col-sm-offset-4 {margin-left: 33.33333333333333%;}
		.m-n {margin: 0;}
		.m-b-lg {margin-bottom: 2em;}
    </style>
</head>

<body>

<section id="content">
    <div class="row m-n">
	      <div class="col-sm-4 col-sm-offset-4">
		        <div class="text-center m-b-lg">		   
		          <h1 class="h">GrowCheck</h1>
		          <p><strong style="font-size:1.5em">The requested URL was not found on this server</strong></p>
		          <p>The Web server cannot find the file or script you asked for.</p> 
		          <p>Please check the URL to ensure that the path is correct. </p>
				  <p>Please contact the server's administration if this problem persists.</p>
				  <br>
				  <p><strong style="font-size:1.5em">죄송합니다.요청하신 페이지를 찾을 수 없습니다.</strong></p>
		          <p>방문하시려는 페이지의 주소가 잘못 입력되었거나, 페이지의 주소가 변경 혹은 삭제되어<br>요청하신 페이지를 찾을 수 없습니다.</p>
		          <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
		          <p>이문제가 지속된다면 관리팀에게 연락 바랍니다.</p>
		        </div>
	        	<div class="list-group m-b-sm bg-white m-b-lg">
		          <a href="javascript:history.go(-1)" class="list-group-item">History Back</a>
		        </div>
	      </div>
    </div>
</section>

</body>
</html>