<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path=application.getContextPath(); %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-cache"/> 
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta property="og:image" content="<%=app_path%>/resources/img/sns.jpg">
<meta property="og:type" content="article">
<meta name="twitter:card" content="photo">
<meta name="twitter:image" content="<%=app_path%>/resources/img/sns.jpg">
<meta name="twitter:image:src" content="<%=app_path%>/resources/img/sns.jpg">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="theme-color" content="#ffffff">
<!-- <meta name="robots" content="index,follow" /> -->
<link rel="apple-touch-icon" sizes="180x180" href="<%=app_path%>/resources/img/logo@2x.png">
<link rel="icon" type="image/png" href="<%=app_path%>/resources/img/logo.png" sizes="32x32">
<link rel="icon" type="image/png" href="<%=app_path%>/resources/img/logo.png" sizes="16x16">
<link rel="icon" href="<%=app_path%>/resources/img/favicon.ico">
<link rel="manifest" href="<%=app_path%>/resources/js/manifest.json">
<link rel="mask-icon" href="<%=app_path%>/resources/img/logo.svg" color="#00AEFF">
<link rel="stylesheet" type="text/css" media="all and (min-width: 1024px)" href="http://fonts.googleapis.com/earlyaccess/notosanskr.css">
<link rel="stylesheet" href="<%=app_path%>/resources/css/main.css?ver=0.9.1">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44600417-2', 'auto');
  ga('send', 'pageview');
  var scroll='<%= request.getParameter("ns") %>';
</script>