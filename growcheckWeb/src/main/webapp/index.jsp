<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path=application.getContextPath(); %>    
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<title>Growcheck - The First IoT Body Measurement Device Ever</title>
	<meta name="naver-site-verification" content="b5c6de529108b528bdc4d119fd6a5086e67ad0c3"/>
	<link rel="canonical" href="http://www.i-growcheck.com">
	<link rel="alternate" hreflang="x-default" href="http://www.i-growcheck.com"/>
	<link rel="alternate" hreflang="en-us" href="http://www.i-growcheck.com" />
	<link rel="alternate" hreflang="ko-kr" href="http://www.i-growcheck.com/kr/index.jsp" />
	<meta property="og:title" content="Growcheck - The First IoT Body Measurement Device Ever">
	<meta property="og:url" content="http://www.i-growcheck.com">
	<meta property="og:description" content="Weight, Height measure, Weight scale, Smart scale, Bathroom scale">
	<meta name="twitter:title" content="Growcheck - The First Vertical Body Scale">
	<meta name="twitter:url" content="http://www.i-growcheck.com">
	<meta name="description" content="Weight, Height measure, Weight scale, Smart scale, Bathroom scale">
	<meta name="keywords" content="growCheck,그로첵,vertical smart scale,vertical scale, Weight, Height measure, bodyscale, smart scale">
	<jsp:include page="/include/head.jsp" flush="true"></jsp:include>
</head>
<script type="application/ld+json">
{
  "@context" : "http://schema.org",
  "@type" : "Product",
  "name" : "Growcheck",
  "image" : "http://www.i-growcheck.com/resources/img/banner.jpg?ver=0.1",
  "description" : "Growcheck is The First IoT Body Measurement Device Ever!\n                    <BR/>Feel comfort and fun at the same time.\n                    <BR/>Experience various performances.",
  "brand" : {
    "@type" : "Brand",
    "name" : "Growcheck",
    "logo" : "http://www.i-growcheck.com/resources/img/logo.svg"
  }
}
</script>

<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="/include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);z-index:-1;">
            <header class="c-navigation-header">
                <div class="c-navigation-header_backgrounds">
                    <div class="o-background js-scroll is-show" data-position="top" style="background-image: url(<%=app_path%>/resources/img/banner.jpg?ver=0.2);"></div>
                </div>

                <div class="c-navigation-header-content">
                    <h1 class="c-navigation-header-content_title js-header-title js-scroll is-show" data-position="top" data-speed="2" style="transform: translate3d(0px, 0px, 0px);">
                        <span class="c-navigation-header-content_title_inner" style="margin-top:1em;background:rgba(35,165,255,0.6)">Growcheck</span>
                    </h1>
                    <p class="m-opacity c-white" style="font-size:1.3em;margin:1.5em 0;font-weight:300">Growcheck is The First IoT Body Measurement Device Ever!
                    <br>Feel comfort and fun at the same time.
                    <br>Experience various performances.</p>
                </div>
                <div class="go-kickstart">
                    <img src="<%=app_path%>/resources/img/launchOn.png" alt="kickstarter">
                    <%-- <a href="" targrt="_blank"><img src="<%=app_path%>/resources/img/goKickstarter.png" alt="go kickstarter"></a> --%>
                </div>        
            </header>
            <!-- No Navigation header -->

            <div class="o-grid-wrap">
           
<main class="o-main">

    <section class="c-home">
        <div class="c-home_intro o-grid">
            <div class="c-home_intro_card_bio_wrapper">
                <div class="js-scroll  is-show" data-speed="-0.6" data-position="top" style="transform: translate3d(0px, 0px, 0px);">
                    <section class="c-card-bio">
                    	<a href="hw.jsp">
                            <div class="c-card-bio_overflow">
                                <div class="c-card-bio_background o-background" style="background-image:url(<%=app_path%>/resources/img/main1.jpg?ver=0.2);"></div>
                                <div class="c-card-bio_overlay"></div>
                            </div>
                            <div class="c-card-bio_content">
                                <p class="c-card-bio_content_text"></p>
                            </div>
                            <div class="c-card-bio_infos">
                                <p class="c-card-bio_infos_surtitle"></p>
                                <h3 class="c-card-bio_infos_name">A slant<br>perspective</h3>
                                <p class="c-card-bio_infos_type">The first vertical weight scale</p>
                                <div class="c-card-bio_infos_view">
                                    <div class="c-card-bio_infos_view_line"></div>
                                    <p class="c-card-bio_infos_view_label" data-letters="Read more">Read more</p>
                                </div>
                            </div>
                        </a>
                    </section>

                    <section class="c-card-bio">
                    	<a href="hw.jsp#allinone">
                            <div class="c-card-bio_overflow">
                                <div class="c-card-bio_background o-background" style="background-image:url(<%=app_path%>/resources/img/main2.jpg?ver=0.2);"></div>
                                <div class="c-card-bio_overlay"></div>
                            </div>
                            <div class="c-card-bio_content">
                                <p class="c-card-bio_content_text"></p>
                            </div>
                            <div class="c-card-bio_infos">
                                <p class="c-card-bio_infos_surtitle"></p>
                                <h3 class="c-card-bio_infos_name">All-in-one</h3>
                                <p class="c-card-bio_infos_type">It can measure height and weight at the same time</p>
                                <div class="c-card-bio_infos_view">
                                    <div class="c-card-bio_infos_view_line"></div>
                                    <p class="c-card-bio_infos_view_label" data-letters="Read more">Read more</p>
                                </div>
                            </div>
                        </a>
                    </section>
                </div>
            </div>
        </div>

        <div class="c-home_news js-scroll o-grid is-show">
            <div class="o-g33_mobile js-scroll is-show" data-speed="1" data-position="middle" >
                <section class="c-card-news ">
                    <a class="c-card-news_link" href="app.jsp#app01">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=app_path%>/resources/img/feature1.png);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">01</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">Personal Care</h3>
                            <div class="c-card-news_infos_readmore">
                                <div class="c-card-news_infos_readmore_line"></div>
                                <p class="c-card-news_infos_readmore_label" data-letters="Read More">
                                    Read More</p>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
            <div class="o-g33_mobile js-scroll is-show" data-speed="1" data-position="middle" >
                <section class="c-card-news ">
                    <a class="c-card-news_link" href="app.jsp#app03">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=app_path%>/resources/img/feature2.png);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">02</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">Child Care</h3>
                            <div class="c-card-news_infos_readmore">
                                <div class="c-card-news_infos_readmore_line"></div>
                                <p class="c-card-news_infos_readmore_label" data-letters="Read More">
                                    Read More</p>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
            <div class="o-g33_mobile js-scroll is-show" data-speed="1" data-position="middle" >
                <section class="c-card-news ">
                    <a class="c-card-news_link" href="app.jsp#app05">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=app_path%>/resources/img/feature3.png);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">03</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">Following Others</h3>
                            <div class="c-card-news_infos_readmore">
                                <div class="c-card-news_infos_readmore_line"></div>
                                <p class="c-card-news_infos_readmore_label" data-letters="Read More">
                                    Read More</p>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
        </div>

        <div class="c-home_calltoaction js-scroll js-anim is-show">
            <section class="c-card-calltoaction js-scroll is-show">
                <div class="c-card-calltoaction_overflow">
                	<div class="video-background">
					    <div class="video-foreground">
					      <iframe src="https://www.youtube.com/embed/Z4y-_YAmivY?autoplay=1&autohide=0&controls=1" frameborder="0" allowfullscreen></iframe>
					    </div>
					</div> 
                    <%-- <div class="c-card-calltoaction_background o-background js-scroll is-show" style="background-image: url(<%=app_path%>/resources/img/startNow.jpg?ver=0.2); "></div>
                    <div class="c-card-calltoaction_overlay"></div> --%>
                </div>
                <!-- <div class="c-card-calltoaction_content">
                    <a href="kickstarter_url" class="c-card-shop_content">
                    	<h3 class="c-card-calltoaction_title">Start helath care with Growcheck</h3>
                    </a>
                </div> -->
            </section>
        </div>
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
