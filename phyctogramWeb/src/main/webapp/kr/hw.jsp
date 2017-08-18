<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<jsp:include page="../include/head.jsp" flush="true"></jsp:include> 
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="../include/nav-kr.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" data-scrollbar="" tabindex="1" style="outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
            
            <div class="o-grid-wrap">
				<main class="o-main">
				    <section class="c-home" style="text-align:center; margin-top:3em">
				        <h3 class="fz60 thin">최초의 <span style="color:#0099ff">세로형</span> 체중계</h3>
				        <img src="<%=application.getContextPath()%>/resources/res2/img/open.jpg?ver=0.2">
				        
				        <h4 class="fz60 thin m-s-fz3rem mt1em">정밀한 측정</h4>
				      </section>
				      
				      <section class="c-home">
         <div class="c-home_carousel js-scroll js-anim is-show">
            <section class="c-card-carousel" data-module="Carousel">
                <div class="c-card-carousel_overflow_wrapper">
                    <section class="c-card-carousel_overflow">
                        <div class="c-card-carousel_background o-background js-carousel-background js-scroll is-show" data-speed="0.6" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/fix01.jpg?ver=0.2); transform: translate3d(0px, 56.9761px, 0px);"></div>
                        <div class="c-card-carousel_background o-background js-carousel-background js-scroll is-show" data-speed="0.6" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/fix02.jpg?ver=0.2); transform: translate3d(0px, 56.9761px, 0px);"></div>
                        <div class="c-card-carousel_overlay"></div>
                    </section>
                </div>

                <section class="c-card-carousel_labels">
                    <p class="c-card-carousel_label js-carousel-label">01</p>
                    <p class="c-card-carousel_label js-carousel-label">02</p>
                </section>

                <section class="c-card-carousel_wrap">
                    <div class="c-card-carousel_content js-carousel-content">
                        <h3 class="c-card-carousel_content_title">체중계</h3>
                        <p class="c-card-carousel_content_text">네 개의 압력 센서가 아주 작은 체중 변화까지 측정합니다<br>
					        스마트폰으로 자동으로 전송되어 아이의 성장을 어플리케이션으로 확인할 수 있습니다</p>
                        <a class="c-card-carousel_content_btn">
                            <div class="c-card-carousel_content_btn_line"></div>
                            <p class="c-card-carousel_content_btn_label" data-letters="Play now">구매하기</p>
                        </a>
                    </div>
                    <div class="c-card-carousel_content js-carousel-content is-current">
                        <h3 class="c-card-carousel_content_title">키재기</h3>
                        <p class="c-card-carousel_content_text">체중계에 내장된 바와 레이저 센서를 통해 키를 잴 수 있습니다<br>스마트폰으로 자동으로 전송되어 아이의 성장을 어플리케이션으로 확인할 수 있습니다</p>
                        <a class="c-card-carousel_content_btn">
                            <div class="c-card-carousel_content_btn_line"></div>
                            <p class="c-card-carousel_content_btn_label" data-letters="Find out more">Shop now</p>
                        </a>
                    </div>
                </section>

                <section class="c-card-carousel_categories">
                    <div class="c-card-carousel_category js-carousel-category">
                        <p class="c-card-carousel_category_label" data-letters="Play">Body scale</p>
                        <div class="c-card-carousel_category_line"></div>
                    </div>
                    <div class="c-card-carousel_category js-carousel-category is-current">
                        <p class="c-card-carousel_category_label" data-letters="Coach">Stadiometer</p>
                        <div class="c-card-carousel_category_line"></div>
                    </div>
                </section>
            </section>
        </div>
				    </section>    
				        
				    <section class="c-home" style="text-align:center; padding-top:3em">
					    <h3 class="fz60 thin m-s-fz3rem mt1em">스펙</h3>
		        		<img src="<%=application.getContextPath()%>/resources/res2/img/spec.jpg?ver=0.7" style="display:block; margin: auto" alt="size:410x330x90, weight:max 180kg, height:max 5m, display:LCD 6 digit, wifi signaling time:802.11b 54Mbps, wifi processing time 11Mbps, charging voltage:12V 1800mA, charging time:3 hours, usage time:100 hours">
	       
				        <h4 class="fz60 thin m-s-fz3rem mt1em">매일매일 측정</h4>
				        <p class="fz18">더이상 체중계를 숨겨둘 필요가 없습니다. 그로첵이 항상 당신의 공간에 서있으니까요</p>
				        
				        <div style="position:relative"><img src="<%=application.getContextPath()%>/resources/res2/img/banner.jpg?ver=0.2">
				        <!-- <a class="btn02 fz48 c-white m-m-fz2rem m-s-fz1rem" style="text-decoration:none;position:absolute;top:50%;right:50%;margin-top:-1em" target="_blank">키Now on Kickstarter</a> --></div>
				        
				        <br><br><br><br><br><br><br><br><br>
				    </section>
				</main>
				
				<div class="js-sticky-stop">
				    <jsp:include page="../include/footer-kr.jsp" flush="true"></jsp:include>
				</div>
            </div> 
        </article>
		</div> 
    </div> 
</div> 
</body></html>