<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<title>Growcheck - Contact Us</title>
	<link rel="canonical" href="http://www.i-growcheck.com/contact.jsp">
	<link rel="alternate" hreflang="x-default" href="http://www.i-growcheck.com/contact.jsp"/>
	<link rel="alternate" hreflang="en-us" href="http://www.i-growcheck.com/contact.jsp" />
	<link rel="alternate" hreflang="ko-kr" href="http://www.i-growcheck.com/kr/contact.jsp" />
	<meta property="og:title" content="Growcheck - Contact Us">
	<meta property="og:url" content="http://www.i-growcheck.com/contact.jsp">
	<meta name="twitter:title" content="Growcheck - Contact Us">
	<meta name="twitter:url" content="http://www.i-growcheck.com/contact.jsp">
	<jsp:include page="include/head.jsp" flush="true"></jsp:include>
</head>
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
                    
            <div></div>            
            <div></div>

            <div class="o-grid-wrap">
           
<main class="o-main">

        <section class="c-home">
            <div class="row contact">
	            <div class="row">
	                <div class="col-6 m-col-12 bg-blue">
	                    <h3 class="fz60 thin">CONTACT</h3>
	                    <p class="fz18 ic01">3-310, 20, Pangyo-ro 289beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
	                    <p class="fz18 ic02">+82 70-8624-4536</p>
	                    <p class="fz18 ic03">+82 50-4194-4532</p>
	                    <a class="btn_info" href="mailto:seek-knowledge@knowledge-seek.com">info@knowledge-seek.com</a>
	                </div>
	                
	                <div class="col-6 m-col-12 qna">
		                <form action="<c:url value="/QaWeb/write.do"/>" name="adForm" method="post">
		            		<input type="hidden" name="state" value="답변대기">
			                <input type="text" name="name"  placeholder="NAME">
			                <input type="text" name="email"  placeholder="E-MAIL">
			                <input type="text" name="tel" onkeydown='return onlyNumber(event,"en")' onkeyup='removeChar(event)'  placeholder="PHONE NUMBER">
			                <textarea name="contents" placeholder="MESSAGES"></textarea>
			                <!-- <label for="upload">FILE UPLOAD</label><input type="file" id="upload"> -->
			                <input type="submit" name="submit" onclick="ecilck('en')" class="btn" value="SEND"/>
		            	</form>
	                </div>
                </div>
                
                <div class="col-12">
                  <div id="map" class="box-map" style="width:100%;height:752px;"></div>
                </div> 
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
