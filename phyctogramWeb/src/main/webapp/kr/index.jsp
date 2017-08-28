<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<title>그로첵 (Growcheck)</title>
	<meta property="og:title" content="그로첵 (Growcheck)">
	<meta name="twitter:title" content="그로첵 (Growcheck)">
	<jsp:include page="/include/head.jsp" flush="true"></jsp:include> 
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="/include/nav-kr.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">        
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);z-index:-1;">
            <header class="c-navigation-header">
                <div class="c-navigation-header_backgrounds">
                    <div class="o-background js-scroll is-show" data-speed="-1" data-position="top" style="background-image: url(<%=application.getContextPath()%>/resources/res2/img/banner.jpg?ver=0.2);background transform: translate3d(0px, 0px, 0px);"></div>
                    <div class="c-navigation-header_overlay"></div>
                </div>

                <div class="c-navigation-header-content">
                    <h1 class="c-navigation-header-content_title js-header-title js-scroll is-show" data-position="top" data-speed="2" style="transform: translate3d(0px, 0px, 0px);">
                        <span class="c-navigation-header-content_title_inner" style="margin-top:1em;background:rgba(35,165,255,0.5)">Growcheck</span>
                    </h1>
                    <!--<p class="c-white" style="font-size:48px;margin:25px 0 10px;line-height:1.3">The most advanced<br>weight &amp; height<br>measuring device</p>-->
                    <p class="c-white m-opacity" style="font-size:1.1em;margin:1.5em 0;font-weight:300">그로첵은 IoT 기반의 세로형 체중계&amp;키재기입니다.<br>편리함과 즐거움을 동시에 느낄 수 있습니다! 다양한 성능을 체험해 보세요.</p>
                </div>
                <div class="go-kickstart">
                    <span>9월 25일</span><img src="<%=application.getContextPath()%>/resources/res2/img/logo-kickStarter.png" alt="kickStarter"><span>출시</span>
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
                                <div class="c-card-bio_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/main1.jpg);"></div>
                                <div class="c-card-bio_overlay"></div>
                            </div>
                            <div class="c-card-bio_content">
                                <p class="c-card-bio_content_text"></p>
                            </div>
                            <div class="c-card-bio_infos">
                                <p class="c-card-bio_infos_surtitle"></p>
                                <h3 class="c-card-bio_infos_name">색다른 관점</h3>
                                <p class="c-card-bio_infos_type">최초의 세로형 체중계</p>
                                <div class="c-card-bio_infos_view">
                                    <div class="c-card-bio_infos_view_line"></div>
                                    <p class="c-card-bio_infos_view_label" data-letters="Read more">Read more</p>
                                </div>
                            </div>
                    </section>

                    <section class="c-card-bio">
                            <div class="c-card-bio_overflow">
                                <div class="c-card-bio_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/main2.jpg);"></div>
                                <div class="c-card-bio_overlay"></div>
                            </div>
                            <div class="c-card-bio_content">
                                <p class="c-card-bio_content_text"></p>
                            </div>
                            <div class="c-card-bio_infos">
                                <p class="c-card-bio_infos_surtitle"></p>
                                <h3 class="c-card-bio_infos_name">올인원</h3>
                                <p class="c-card-bio_infos_type">키와 몸무게를 동시에 측정할 수 있습니다</p>
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
                    <a class="c-card-news_link" href="app.jsp#app01">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/feature1.jpg);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">01</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">개인 관리</h3>
                            <div class="c-card-news_infos_readmore">
                                <div class="c-card-news_infos_readmore_line"></div>
                                <p class="c-card-news_infos_readmore_label" data-letters="Read More">
                                    더보기</p>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
            <div class="o-g33_mobile js-scroll is-show" data-speed="1" data-position="middle" >
                <section class="c-card-news ">
                    <a class="c-card-news_link" href="app.jsp#app03">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/feature2.jpg);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">02</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">아이 관리</h3>
                            <div class="c-card-news_infos_readmore">
                                <div class="c-card-news_infos_readmore_line"></div>
                                <p class="c-card-news_infos_readmore_label" data-letters="Read More">
                                    더보기</p>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
            <div class="o-g33_mobile js-scroll is-show" data-speed="1" data-position="middle" >
                <section class="c-card-news ">
                    <a class="c-card-news_link" href="app.jsp#app05">
                        <div class="c-card-news_overflow">
                            <div class="c-card-news_background o-background" style="background-image:url(<%=application.getContextPath()%>/resources/res2/img/feature3.jpg);"></div>
                            <div class="c-card-news_overlay"></div>
                        </div>
                        <div class="c-card-news_infos">
                            <div class="c-card-news_infos_head">
                                <span class="c-card-news_infos_date">03</span>
                                <span class="c-card-news_infos_category"></span>
                            </div>
                            <h3 class="c-card-news_infos_title">팔로우하기</h3>
                            <div class="c-card-news_infos_readmore">
                                <div class="c-card-news_infos_readmore_line"></div>
                                <p class="c-card-news_infos_readmore_label" data-letters="Read More">
                                    더보기</p>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
        </div>

        <div class="c-home_calltoaction js-scroll js-anim is-show">
            <section class="c-card-calltoaction js-scroll is-show">
                <div class="c-card-calltoaction_overflow">
                    <div class="c-card-calltoaction_background o-background js-scroll is-show" data-speed="0.5" style="background-image: url(<%=application.getContextPath()%>/resources/res2/img/open.jpg?ver=0.2); "></div>
                    <div class="c-card-calltoaction_overlay"></div>
                </div>
                <div class="c-card-calltoaction_content">
                    <h3 class="c-card-calltoaction_title">구매하기</h3>
                    <p class="c-card-calltoaction_text">그로첵으로 똑똑한 건강 관리</p>
                </div>
            </section>
        </div>
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