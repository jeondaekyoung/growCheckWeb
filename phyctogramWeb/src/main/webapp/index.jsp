<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
 if(!request.getServerName().contains("i-growcheck.com")){
	 response.setStatus(301);
	 response.setHeader( "Location", "http://www.i-growCheck.com/" );
	 response.setHeader( "Connection", "close" );
 }
%>

<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<jsp:include page="/include/head.jsp" flush="true"></jsp:include> 
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="/include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" data-scrollbar="" tabindex="1" style="overflow: scroll; outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
            <header class="c-navigation-header">
                <div class="c-navigation-header_backgrounds">
                    <div class="o-background js-scroll is-show" data-speed="-1" data-position="top" style="background-image: url(<%=application.getContextPath()%>/resources/res2/img/banner.jpg);background transform: translate3d(0px, 0px, 0px);"></div>
                    <div class="c-navigation-header_overlay"></div>
                </div>

                <div class="c-navigation-header-content">
                    <h1 class="c-navigation-header-content_title js-header-title js-scroll is-show" data-position="top" data-speed="2" style="transform: translate3d(0px, 0px, 0px);">
                        <span class="c-navigation-header-content_title_inner" style="margin-top:1em;background:rgba(35,165,255,0.5)">Grow Check</span>
                    </h1>
                    <!--<p class="c-white" style="font-size:48px;margin:25px 0 10px;line-height:1.3">The most advanced<br>weight &amp; height<br>measuring device</p>-->
                    <p class="c-white m-opacity" style="font-size:1.1em;margin:1.5em 0;font-weight:300">GrowCheck is IoT based vertical type body scale &amp; stadiometer.<br>It gives you convenience &amp; joy! Enjoy various performance.</p>
                </div>
                <div class="go-kickstart">
                    <span >You can purchase GrowCheck on</span>
                    <img src="<%=application.getContextPath()%>/resources/res2/img/logo-kickStarter.png" alt="kickStarter">
                    <a class="btn02" >
                    	SEP 25th
                    </a>
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
                            <div class="c-card-bio_overflow">
                                <div class="c-card-bio_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/main.jpg);"></div>
                                <div class="c-card-bio_overlay"></div>
                            </div>
                            <div class="c-card-bio_content">
                                <p class="c-card-bio_content_text"></p>
                            </div>
                            <div class="c-card-bio_infos">
                                <p class="c-card-bio_infos_surtitle"></p>
                                <h3 class="c-card-bio_infos_name">A slant<br>perspective</h3>
                                <p class="c-card-bio_infos_type">The first vertical bodyscale</p>
                                <div class="c-card-bio_infos_view">
                                    <div class="c-card-bio_infos_view_line"></div>
                                    <p class="c-card-bio_infos_view_label" data-letters="Read more">Read more</p>
                                </div>
                            </div>
                    </section>

                    <section class="c-card-bio">
                            <div class="c-card-bio_overflow">
                                <div class="c-card-bio_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/main.jpg);"></div>
                                <div class="c-card-bio_overlay"></div>
                            </div>
                            <div class="c-card-bio_content">
                                <p class="c-card-bio_content_text"></p>
                            </div>
                            <div class="c-card-bio_infos">
                                <p class="c-card-bio_infos_surtitle"></p>
                                <h3 class="c-card-bio_infos_name">all-in-one</h3>
                                <p class="c-card-bio_infos_type">It can measure height by laser</p>
                                <div class="c-card-bio_infos_view">
                                    <div class="c-card-bio_infos_view_line"></div>
                                    <p class="c-card-bio_infos_view_label" data-letters="Read more">Read more</p>
                                </div>
                            </div>
                    </section>
                </div>
            </div>
        </div>

        <div class="c-home_news js-scroll o-grid is-show">
            <div class="o-g33_mobile js-scroll is-show" data-speed="1" data-position="middle" >
                <section class="c-card-news ">
                    <a class="c-card-news_link" href="app.jsp">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/feature1.jpg);"></div>
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
                    <a class="c-card-news_link" href="app.jsp">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/feature2.jpg);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">02</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">Children Care</h3>
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
                    <a class="c-card-news_link" href="app.jsp">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/feature3.jpg);"></div>
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
                    <div class="c-card-calltoaction_background o-background js-scroll is-show" data-speed="0.5" style="background-image: url(<%=application.getContextPath()%>/resources/res2/img/open.jpg); "></div>
                    <div class="c-card-calltoaction_overlay"></div>
                </div>
                <div class="c-card-calltoaction_content">
                    <h3 class="c-card-calltoaction_title">Shop Now</h3>
                    <p class="c-card-calltoaction_text">Start health care with GrowCheck</p>
                </div>
            </section>
        </div>
    </section>
        
</main>

<div class="js-sticky-stop">
	<jsp:include page="include/footer.jsp" flush="true"></jsp:include>
</div>
                </div> 
            </article>
        <aside class="scrollbar-track scrollbar-track-x" style="display: none;">
            <div class="scrollbar-thumb scrollbar-thumb-x" style="width: 1920px; transform: translate3d(0px, 0px, 0px);"></div>
        </aside>
        <aside class="scrollbar-track scrollbar-track-y" style="display: block;">
            <div class="scrollbar-thumb scrollbar-thumb-y" style="height: 121.141px; transform: translate3d(0px, 0px, 0px);"></div>
        </aside>
        <canvas class="overscroll-glow" style="display: none; pointer-events: none;"></canvas>
    </div> 
        </div> 
    </div> 
   <script src="<%=application.getContextPath()%>/resources/res2/js/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="<%=application.getContextPath()%>/resources/res2/js/jquery-3.0.0.min.js"><\/script>')</script>
    <script src="<%=application.getContextPath()%>/resources/res2/js/vendors.js"></script>
    <script src="<%=application.getContextPath()%>/resources/res2/js/app.js"></script>
 		<script type="text/javascript">
    $(document).ready(function(){
		if(location.host == 'phyctogram.com'||location.host == 'www.phyctogram.com'){
			location.href ="http://i-growcheck.com/";
		}    	 
		
    });

    </script>
</body></html>