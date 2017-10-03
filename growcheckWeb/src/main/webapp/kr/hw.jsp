<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path = application.getContextPath(); %>
<!DOCTYPE html>
<html lang="ko" class="has-smooth-scroll">
<head>
	<title>그로첵 (Growcheck) - 하드웨어</title>
	<link rel="canonical" href="http://www.i-growcheck.com/kr/hw.jsp">
	<link rel="alternate" hreflang="x-default" href="http://www.i-growcheck.com/kr/hw.jsp"/>
	<link rel="alternate" hreflang="en-us" href="http://www.i-growcheck.com/hw.jsp" />
	<link rel="alternate" hreflang="ko-kr" href="http://www.i-growcheck.com/kr/hw.jsp" />
	<meta property="og:title" content="그로첵 (Growcheck) - 하드웨어">
	<meta property="og:url" content="http://www.i-growcheck.com/kr/hw.jsp">
	<meta name="twitter:title" content="그로첵 (Growcheck) - 하드웨어">
	<meta name="twitter:url" content="http://www.i-growcheck.com/kr/hw.jsp">
	<jsp:include page="/include/head.jsp" flush="true"></jsp:include> 
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="/include/nav-kr.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
            
            <div class="o-grid-wrap">
				<main class="o-main">
				    <section class="c-home" style="text-align:center; margin-top:3em">
				        <h3 class="fz60 thin">최초의 <span style="color:#0099ff">세로형</span> 체중계</h3>
				        <img src="<%=app_path%>/resources/img/open.jpg?ver=0.2">
				      </section>
				      
				      <section class="c-home">
				        <h4 class="fz60 thin m-s-fz3rem pt1em" id="allinone" style="text-align:center">멀티플레이 체중계</h4>
         <div class="c-home_carousel js-scroll js-anim is-show">
            <section class="c-card-carousel" data-module="Carousel">
                <div class="c-card-carousel_overflow_wrapper">
                    <section class="c-card-carousel_overflow">
                        <div class="c-card-carousel_background o-background js-carousel-background js-scroll is-show is-current" data-speed="0.6" style="background-image:url(<%=app_path%>/resources/img/fix01.jpg?ver=0.2); transform: translate3d(0px, 56.9761px, 0px);"></div>
                        <div class="c-card-carousel_background o-background js-carousel-background js-scroll is-show" data-speed="0.6" style="background-image:url(<%=app_path%>/resources/img/fix02.jpg?ver=0.2); transform: translate3d(0px, 56.9761px, 0px);"></div>
                        <div class="c-card-carousel_overlay"></div>
                    </section>
                </div>

                <section class="c-card-carousel_wrap">
                    <div class="c-card-carousel_content js-carousel-content is-current">
                        <h3 class="c-card-carousel_content_title">키재기</h3>
                        <p class="c-card-carousel_content_text">체중계에 내장된 바(bar)와 레이저 센서로 키와 체중을 동시에 잴 수 있고,
                        데이터가 스마트폰으로 자동으로 전송되어 손쉽게 아이의 성장을 관리할 수 있습니다.</p>
                    </div>
                    <div class="c-card-carousel_content js-carousel-content">
                        <h3 class="c-card-carousel_content_title">체중계</h3>
                        <p class="c-card-carousel_content_text">슬라이딩 되어 발판이 내려오면 체중을 잴 수 있습니다. 그리고 스마트폰으로 통계 데이터와 비교하여 자녀가 잘 자라고 있는지 확인할 수 있습니다.</p>
                    </div>
                </section>

                <section class="c-card-carousel_categories">
                    <div class="c-card-carousel_category js-carousel-category is-current">
                        <p class="c-card-carousel_category_label" data-letters="Play">키재기</p>
                        <div class="c-card-carousel_category_line"></div>
                    </div>
                    <div class="c-card-carousel_category js-carousel-category">
                        <p class="c-card-carousel_category_label" data-letters="Coach">체중계</p>
                        <div class="c-card-carousel_category_line"></div>
                    </div>
                </section>
            </section>
        </div>
				    </section>    
				        
				    <section class="c-home" style="text-align:center; padding-top:3em">
					    <h3 class="fz60 thin m-s-fz3rem mt1em">스펙</h3>
		        		<img src="<%=app_path%>/resources/img/spec-kr.jpg" style="display:block; margin: auto" alt="size:410x330x90, weight:max 180kg, height:max 5m, display:LCD 6 digit, wifi signaling time:802.11b 54Mbps, wifi processing time 11Mbps, charging voltage:12V 1800mA, charging time:3 hours, usage time:100 hours">
	       
				        <h4 class="fz60 thin m-s-fz3rem mt1em">매일매일 측정</h4>
				        <p class="fz18">더이상 체중계를 숨겨둘 필요가 없습니다. 그로첵이 항상 당신의 공간에 서있으니까요</p>
				        
				        <div style="position:relative"><img src="<%=app_path%>/resources/img/banner.jpg?ver=0.2">
				        <!-- <a class="btn02 fz48 c-white m-m-fz2rem m-s-fz1rem" style="text-decoration:none;position:absolute;top:50%;right:50%;margin-top:-1em" target="_blank">키Now on Kickstarter</a> --></div>
				        
				        <br><br><br><br><br><br><br><br><br>
				    </section>
				</main>
				
				<div class="js-sticky-stop">
				    <jsp:include page="/include/footer-kr.jsp" flush="true"></jsp:include>
				</div>
            </div> 
        </article>
		</div> 
    </div> 
</div> 
</body></html>