<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <div class="c-transitions-masks o-grid">
            <div class="c-transitions_mask o-grid_item -small"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -big"></div>
            <div class="c-transitions_mask o-grid_item -small"></div>
            <figure class="c-transitions-masks_logo">
                <img src="<%=application.getContextPath()%>/resources/res2/img/logo-loading.svg" class="c-header_logo_image" alt="그로우첵">
            </figure>
        </div>
        <div class="c-header_wrapper js-header-wrapper" data-module="HeaderCategories">
        	<div class="nav_wrap">
		        <button class="c-header-burger js-header-burger" data-module="HeaderBurger" title="Menu" type="button">
		          <span class="c-header-burger_lines">
		            <span class="c-header-burger_line"></span>
		            <span class="c-header-burger_line"></span>
		            <span class="c-header-burger_line"></span>
		          </span>
		        </button>
		        <div class="logo">
		          <a class="logo-lg" href="index.jsp"><img src="<%=application.getContextPath()%>/resources/res2/img/logo-hzt.svg"></a>
		          <a class="logo-sm" href="index.jsp"><img src="<%=application.getContextPath()%>/resources/res2/img/logo.svg"></a>
		        </div>
		        <nav class="nav">
		          <ul>
		            <li><a href="index.jsp">HOME</a></li>
		            <li><a href="hw.jsp">HARDWARE</a></li>
		            <li><a href="app.jsp">APP</a></li>
		            <li><a href="about.jsp">ABOUT</a></li>
		            <li><a href="javascript:alert('Page is under construction.')">FAQ</a></li>
		          </ul>
		            <ul class="mobile_list">
		                <li><a href="contact.jsp">Contact Us</a></li>
		                <li><a href="terms.jsp">Term and Conditions</a></li>
		                <li><a href="privacy.jsp">Privacy</a></li>
		                <li><a href="https://www.kickstarter.com/">Kickstarter</a></li>
		            </ul>
		            <p class="mobile_copyright">copyright © 2017 by Growcheck</p>
		        </nav>
		        <div class="language">
			        <a href="javascript:langToggle()"><img src="<%=application.getContextPath()%>/resources/res2/img/lang_ko.png" alt="korean" style="opacity: 0.3"></a>
			        <a><img src="<%=application.getContextPath()%>/resources/res2/img/lang_en.png" alt="english"></a></div>
		      </div>
            
            <div class="c-header_overlay js-header-overlay"></div>
                
        </div>
        <script>
        
        function langToggle() {
        	String.prototype.replaceAt=function(index, replacement) {
        	    return this.substr(0, index) + replacement+ this.substr(index , this.length);
        	}
        	var path=location.pathname.replaceAt(location.pathname.lastIndexOf("/"),"/kr");
			window.location.href=path;
		}
        </script>