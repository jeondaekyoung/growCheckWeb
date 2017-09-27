<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<section class="c-transitions-loader js-loader" data-module="Loader" data-delay="0.8">
            <div class="c-transitions-loader_logo js-loader-logo" >                
                <img class="c-transitions-loader_logo_image" src="<%=application.getContextPath()%>/resources/img/logo-loading.svg">
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
                <img src="<%=application.getContextPath()%>/resources/img/logo-loading.svg" class="c-header_logo_image" alt="그로우첵">
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
		          <a class="logo-lg" href="<%=application.getContextPath()%>/kr/index.jsp"><img src="<%=application.getContextPath()%>/resources/img/logo-hzt.svg"></a>
		          <a class="logo-sm" href="<%=application.getContextPath()%>/kr/index.jsp"><img src="<%=application.getContextPath()%>/resources/img/logo.svg"></a>
		        </div>
		        <nav class="nav">
		          <ul>
		            <li><a href="<%=application.getContextPath()%>/kr/index.jsp">HOME</a></li>
		            <li><a href="<%=application.getContextPath()%>/kr/hw.jsp">HARDWARE</a></li>
		            <li><a href="<%=application.getContextPath()%>/kr/app.jsp">APP</a></li>
		            <li><a href="<%=application.getContextPath()%>/kr/about.jsp">ABOUT</a></li>
		          </ul>
		            <ul class="mobile_list">
		                <li><a href="<%=application.getContextPath()%>/kr/contact.jsp">문의하기</a></li>
		                <li><a href="<%=application.getContextPath()%>/kr/terms.jsp">이용약관</a></li>
		                <li><a href="<%=application.getContextPath()%>/kr/privacy.jsp">개인정보방침</a></li>
		            	<li><a href="javascript:alert('이 페이지는 준비중입니다.')">자주묻는질문</a></li>
		            </ul>
		            <p class="mobile_copyright">Copyright ⓒ 2017 by Knowledge-seek &amp; Company</p>
		        </nav>
		        <div class="language">
			        <a><img src="<%=application.getContextPath()%>/resources/img/lang_ko.png" alt="korean"></a>
			        <a href="javascript:langToggle()"><img src="<%=application.getContextPath()%>/resources/img/lang_en.png" alt="english" style="opacity: 0.3"></a></div>
		      </div>
            
            <div class="c-header_overlay js-header-overlay"></div>
                
        </div>
        
         <form name = "frm" method="post">
		<input type = "hidden" name = "nowScroll" value = "">
		</form>
		
        <script>
        function langToggle() {
        	var path=location.pathname.replace("/kr","");
        	var nowScroll = getNowScroll();
       		var frm = document.frm;
        	if(location.host.indexOf("kr.") != -1 ){
           		frm.action="http://i-growcheck.com"+path;
        	}else{
      		 frm.action=path;
        	}
        	frm.nowScroll.value = nowScroll.Y;
        	frm.submit(); 
			
		}

        var getNowScroll = function(){
        	var de = document.documentElement;
        	var b = document.body;
        	var now = {};
        	now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
        	now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);

        	return now;
        	}
        </script>