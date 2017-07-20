<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<title>그로첵(GrowCheck)</title>
<meta charset="utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="x-ua-compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<meta name="naver-site-verification" content="7d9236cf7e95df108ca0bab54628c50d198628cd"/>
<meta name="robots" content="all">
<meta name="description" content="체중계, 스마트체중계, 샤오미체중계, 건강관리, 키재기, 키재기자, 아기키재기, 출산선물, 아기용품" />
<meta property="og:description" content="체중계, 스마트체중계, 샤오미체중계, 건강관리, 키재기, 키재기자, 아기키재기, 출산선물, 아기용품" >
<meta property="og:title" content="그로첵(GrowCheck)" >
<meta property="og:url" content="http://i-growcheck.com" >
<meta property="og:image" content="<%=application.getContextPath()%>/resources/res/imgs/mobile.jpg">
<link rel="shortcut icon" href="<%=application.getContextPath()%>/resources/res/imgs/favicon.ico">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/ress.min.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/wide-gs-fluid.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/jquery.fullPage.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/examples.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/style.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/animate.css">

<!--[if IE]>
<script type="text/javascript">
	 var console = { log: function() {} };
</script>
<![endif]-->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>

<script type="text/javascript" src="<%=application.getContextPath()%>/resources/res/js/jquery.fullPage.js"></script>
<script type="text/javascript" src="<%=application.getContextPath()%>/resources/res/js/examples.js"></script>
<script type="text/javascript" src="<%=application.getContextPath()%>/resources/res/vendors/jquery.easings.min.js"></script>
<script type="text/javascript" src="<%=application.getContextPath()%>/resources/res/vendors/jquery.slimscroll.min.js"></script>
<script>
$(document).ready(function(){
    $(".btn-menu").click(function(){
        $(".menu").show();
        $(".lang").show();
        $(".btn-close").show();
    });
    $(".btn-close").click(function(){
        $(".menu").hide();
        $(".lang").hide();
    });
});
</script>
