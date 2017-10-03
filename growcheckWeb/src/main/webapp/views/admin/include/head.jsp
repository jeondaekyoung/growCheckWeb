<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% String app_path=application.getContextPath(); %>
<meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="stylesheet" href="<%=app_path%>/resources/res/css/bootstrap.css" type="text/css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
<link rel="stylesheet" href="<%=app_path%>/resources/res/css/app.css" type="text/css" />

<script src="<%=app_path%>/resources/res/js/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="<%=app_path%>/resources/res/js/bootstrap.js"></script>
<!-- App -->
<script src="<%=app_path%>/resources/res/js/app.js"></script>

<c:if test="${sessionScope.USERID != 'naree'}" >
	<script>
		alert("관리자용 페이지 입니다. ");
		location.href="<c:url value='/admin/index.do'/>";
	</script>
</c:if>

<script type="text/javascript">
  //로컬과 실서버 구분 로직
  if( window.location.host =='localhost:8080'){
	  var rootPath = window.location.protocol + '//' + window.location.host+'/growcheckWeb';  
  }
  else
  var rootPath = window.location.protocol + '//' + window.location.host;
</script>