<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path=application.getContextPath(); %>    
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<title>Growcheck - Hardware</title>
	<link rel="canonical" href="http://www.i-growcheck.com/hw.jsp">
	<link rel="alternate" hreflang="x-default" href="http://www.i-growcheck.com/hw.jsp"/>
	<link rel="alternate" hreflang="en-us" href="http://www.i-growcheck.com/hw.jsp" />
	<link rel="alternate" hreflang="ko-kr" href="http://www.i-growcheck.com/kr/hw.jsp" />
	<meta property="og:title" content="Growcheck - Hardware">
	<meta property="og:url" content="http://www.i-growcheck.com/hw.jsp">
	<meta name="twitter:title" content="Growcheck - Hardware">
	<meta name="twitter:url" content="http://www.i-growcheck.com/hw.jsp">
	<jsp:include page="include/head.jsp" flush="true"></jsp:include> 
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
            
            <div class="o-grid-wrap">
				<main class="o-main">
				    <section class="c-home" style="text-align:center; margin-top:3em">
				        <h3 class="fz60 thin">The first <span style="color:#0099ff">Vertical</span> weight scale</h3>
				        <img src="<%=app_path%>/resources/img/hw1img.jpg?ver=0.2">				        
				      </section>
				      
				      <section class="c-home">
				        <h4 class="fz60 thin m-s-fz3rem pt1em" id="allinone" style="text-align:center">Multifunctional weight scale</h4>
         <div class="c-home_carousel js-scroll js-anim is-show">
            <section class="c-card-carousel" data-module="Carousel">
                <div class="c-card-carousel_overflow_wrapper">
                    <section class="c-card-carousel_overflow">
                        <div class="c-card-carousel_background o-background js-carousel-background js-scroll is-show is-current" data-speed="0.6" style="background-image:url(<%=app_path%>/resources/img/heightMeasure0.jpg?ver=0.3);"></div>
                        <div class="c-card-carousel_background o-background js-carousel-background js-scroll is-show" data-speed="0.6" style="background-image:url(<%=app_path%>/resources/img/weightScale00.jpg);"></div>
                        <div class="c-card-carousel_overlay"></div>
                    </section>
                </div>

               <!--  <section class="c-card-carousel_labels">
                    <p class="c-card-carousel_label js-carousel-label is-current">01</p>
                    <p class="c-card-carousel_label js-carousel-label">02</p>
                </section> -->

                <section class="c-card-carousel_wrap">
                    <div class="c-card-carousel_content js-carousel-content is-current">
                     <h3 class="c-card-carousel_content_title">Height Measure</h3>
                        <p class="c-card-carousel_content_text">You can measure height by picking up the height measuring bar.
                        <br>Laser sensor guides you where to put the height measuring bar.</p>
                    </div>    
                    <div class="c-card-carousel_content js-carousel-content">                        
                        <h3 class="c-card-carousel_content_title">Weight Scale</h3>
                        <p class="c-card-carousel_content_text">When sliding part opens fully, you can weigh yourself.<br>
                        You can also compare the growth of your child by checking growth distribution.</p>
                    </div>
                </section>

                <section class="c-card-carousel_categories">
                    <div class="c-card-carousel_category js-carousel-category is-current">
                        <p class="c-card-carousel_category_label" data-letters="Play">Height Measure</p>
                        <div class="c-card-carousel_category_line"></div>
                    </div>
                    <div class="c-card-carousel_category js-carousel-category">
                        <p class="c-card-carousel_category_label" data-letters="Coach">Weight scale</p>
                        <div class="c-card-carousel_category_line"></div>
                    </div>
                </section>
            </section>
        </div>
				    </section>    
				        
				    <section class="c-home" style="text-align:center; padding-top:3em">
					    <h3 class="fz60 thin m-s-fz3rem mt1em">Specification</h3>
		        		<img src="<%=app_path%>/resources/img/spec_en.jpg" style="display:block; margin: auto" alt="size:410x330x90, weight:max 180kg, height:max 5m, display:LCD 6 digit, wifi signaling time:802.11b 54Mbps, wifi processing time 11Mbps, charging voltage:12V 1800mA, charging time:3 hours, usage time:100 hours">
	       
				        <h4 class="fz60 thin m-s-fz3rem mt1em">Daily Measurement</h4>
				        <p class="fz18">You do not need to hide your weight scale anymore. Growcheck always stands in your room.</p>
				        
				        <div style="position:relative"><img src="<%=app_path%>/resources/img/putItAnyWhere00.jpg"></div>
				        
				        <br><br><br><br><br><br><br><br><br>
				    </section>
				</main>
				
				<div class="js-sticky-stop">
				    <jsp:include page="include/footer.jsp" flush="true"></jsp:include>
				</div>
            </div> 
        </article>
		</div> 
    </div> 
</div> 
</body></html>
