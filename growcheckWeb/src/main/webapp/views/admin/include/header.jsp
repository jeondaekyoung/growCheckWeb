<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path=application.getContextPath(); %>
<header id="header" class="navbar navbar-fixed-top bg-white box-shadow b-b b-light"  data-spy="affix" data-offset-top="1">
    <div class="container">
      <div class="navbar-header">        
        <a href="<%=app_path%>" class="navbar-brand"><span class="text-muted">GrowCheck</span></a>
        <button class="btn btn-link visible-xs" type="button" data-toggle="collapse" data-target=".navbar-collapse">
          <i class="fa fa-bars"></i>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="active">
            <a href="<%=app_path%>/views/admin/noticeList.jsp">공지사항</a>
          </li>
          <li>
            <a href="<%=app_path%>/views/admin/qaList.jsp">문의(App)</a>
          </li>
          <li>
            <a href="<%=app_path%>/views/admin/qaList-web.jsp">문의(Web)</a>
          </li>
        </ul>
      </div>
    </div>
</header>