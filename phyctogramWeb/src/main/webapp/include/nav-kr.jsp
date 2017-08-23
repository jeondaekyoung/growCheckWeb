<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<section class="c-transitions-loader js-loader" data-module="Loader" data-delay="0.8">
            <div class="c-transitions-loader_logo js-loader-logo" >                
                <img class="c-transitions-loader_logo_image" src="<%=application.getContextPath()%>/resources/res2/img/logo-loading.svg">
            </div>
            <div class="c-grid-loader">
                <div data-grid="gh-l1" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh1" style="transform-origin: left center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gh-l2" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh2" style="transform-origin: left center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gh-l3" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh3" style="transform-origin: right center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gh-l4" class="js-loader-line c-grid-loader_line c-grid-loader_h -lh4" style="transform-origin: right center 0px; transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div data-grid="gv-l1" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv1" style="transform-origin: center top 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div data-grid="gv-l2" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv3" style="transform-origin: center top 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div data-grid="gv-l3" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv4 -red -top c-grid-loader_line_red_top" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 0, 0, 25);"></div>
                <div data-grid="gv-l4" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv4 -red -bottom c-grid-loader_line_red_bottom" style="transform-origin: center top 0px; transform: matrix(1, 0, 0, 0, 0, 10);"></div>
                <div data-grid="gv-l5" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv5" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div data-grid="gv-l6" class="js-loader-line c-grid-loader_line c-grid-loader_v -lv7" style="transform-origin: center bottom 0px; transform: matrix(1, 0, 0, 1, 0, -441);"></div>
                <div class="c-grid-loader_cols">
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                    <div class="c-grid-loader_col"></div>
                </div>
            </div>
        </section>
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
		            <li><a href="javascript:alert('이 페이지는 준비중입니다.')">FAQ</a></li>
		          </ul>
		            <ul class="mobile_list">
		                <li><a href="contact.jsp">contact Us</a></li>
		                <li><a href="terms.jsp">Term and Conditions</a></li>
		                <li><a href="privacy.jsp">Privacy</a></li>
		                <li><a href="https://www.kickstarter.com/">Kickstarter</a></li>
		            </ul>
		            <p class="mobile_copyright">© Growcheck, 2017</p>
		        </nav>
		        <div class="language">
			        <a><img src="<%=application.getContextPath()%>/resources/res2/img/lang_ko.png" alt="korean"></a>
			        <a href="<%=application.getContextPath()%>/index.jsp"><img src="<%=application.getContextPath()%>/resources/res2/img/lang_en.png" alt="english" style="opacity: 0.3"></a></div>
		      </div>
            
            <div class="c-header_overlay js-header-overlay"></div>
                
        </div>