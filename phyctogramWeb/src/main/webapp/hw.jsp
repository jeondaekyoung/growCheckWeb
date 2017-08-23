<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<jsp:include page="include/head.jsp" flush="true"></jsp:include> 
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" data-scrollbar="" tabindex="1" style="outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
            
            <div class="o-grid-wrap">
				<main class="o-main">
				    <section class="c-home" style="text-align:center; margin-top:3em">
				        <h3 class="fz60 thin">The first <span style="color:#0099ff">Vertical</span> body scale</h3>
				        <img src="<%=application.getContextPath()%>/resources/res2/img/open.jpg?ver=0.2">
				        
				        <h4 class="fz60 thin m-s-fz3rem mt1em">accurate measurement</h4>
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
                        <h3 class="c-card-carousel_content_title">Body Scale</h3>
                        <p class="c-card-carousel_content_text">Four higher-precision pressure sensors measure your very small weight changes.<br>
					        The data send automatically to your phone and then check your children's growth in app.</p>
                        <a class="c-card-carousel_content_btn">
                            <div class="c-card-carousel_content_btn_line"></div>
                            <p class="c-card-carousel_content_btn_label" data-letters="Play now">Shop now</p>
                        </a>
                    </div>
                    <div class="c-card-carousel_content js-carousel-content is-current">
                        <h3 class="c-card-carousel_content_title">Stadiometer</h3>
                        <p class="c-card-carousel_content_text">You can measure height by laser sensor with the bar inside Growcheck.<br>The data send automatically to your phone and then check your children's growth in app.</p>
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
					    <h3 class="fz60 thin m-s-fz3rem mt1em">Spec</h3>
		        		<img src="<%=application.getContextPath()%>/resources/res2/img/spec.jpg?ver=0.7" style="display:block; margin: auto" alt="size:410x330x90, weight:max 180kg, height:max 5m, display:LCD 6 digit, wifi signaling time:802.11b 54Mbps, wifi processing time 11Mbps, charging voltage:12V 1800mA, charging time:3 hours, usage time:100 hours">
	       
				        <h4 class="fz60 thin m-s-fz3rem mt1em">Daily Check</h4>
				        <p class="fz18">You don't need to hide bodyscale anymore. It will always stand in your room</p>
				        
				        <div style="position:relative"><img src="<%=application.getContextPath()%>/resources/res2/img/banner.jpg?ver=0.2">
				        <!-- <a class="btn02 fz48 c-white m-m-fz2rem m-s-fz1rem" style="text-decoration:none;position:absolute;top:50%;right:50%;margin-top:-1em" target="_blank">Now on Kickstarter</a> --></div>
				        
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